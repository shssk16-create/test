/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { registry } from '../schema/registry';

export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
  CMS_STATE: DurableObjectNamespace;
}

const app = new Hono<{ Bindings: Env }>();

// Allow CORS for all API routes
app.use('/api/*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

// 1. Auth Middleware Stub
// Restricts all write/modify API routes without authentication
app.use('/api/*', async (c, next) => {
  const method = c.req.method;
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method) && !c.req.path.endsWith('/media/download')) {
    const authHeader = c.req.header('Authorization');
    // Note: Verify against the mock_admin_token secret.
    if (!authHeader || authHeader !== 'Bearer mock_admin_token') {
      return c.json({ data: null, meta: null, error: 'Unauthorized: Session token missing or invalid' }, 401);
    }
  }
  await next();
});

// Helper: Convert content model schema definition to Zod Schema
function generateZodSchema(fields: any[]) {
  const shape: Record<string, any> = {};
  for (const field of fields) {
    let validator: any = z.any();
    if (['text', 'richtext', 'image', 'select', 'date'].includes(field.type)) {
      validator = z.string();
    } else if (field.type === 'boolean') {
      validator = z.boolean();
    } else if (field.type === 'relation') {
      validator = z.string();
    } else if (['repeater', 'block-builder'].includes(field.type)) {
      validator = z.array(z.any());
    }

    if (!field.required) {
      validator = validator.optional().nullable();
    }
    shape[field.name] = validator;
  }
  return z.object(shape);
}

// Helper: Invalidate KV lists cache
async function invalidateCache(kv: KVNamespace, type: string) {
  try {
    const keys = await kv.list({ prefix: `list:${type}:` });
    for (const k of keys.keys) {
      await kv.delete(k.name);
    }
  } catch (err) {
    console.error('Failed to invalidate KV cache:', err);
  }
}

// 2. Generate REST CRUD endpoints dynamically from Schema Registry
Object.entries(registry).forEach(([schemaKey, schemaVal]) => {
  const schema = schemaVal as any;
  const type = schema.slug; // e.g. "posts"
  if (type === 'media') return;
  const zodSchema = generateZodSchema(schema.fields);

  // List (GET /api/[type])
  app.get(`/api/${type}`, async (c) => {
    const query = c.req.query();
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const offset = (page - 1) * limit;
    const search = query.search || '';
    const sortBy = query.sortBy || 'created_at';
    const sortOrder = query.sortOrder || 'DESC';
    const owner = query.owner || 'salmeen';

    // Check Cache Layer (KV)
    const cacheKey = `list:${type}:${page}:${limit}:${search}:${sortBy}:${sortOrder}:${owner}`;
    const cached = await c.env.KV.get(cacheKey);
    if (cached) {
      return c.json(JSON.parse(cached));
    }

    let sql = `SELECT * FROM ${type} WHERE is_deleted = 0 AND owner = ?`;
    const params: any[] = [owner];

    if (search) {
      const textFields = schema.fields
        .filter((f: any) => ['text', 'richtext'].includes(f.type))
        .map((f: any) => f.name);
      if (textFields.length > 0) {
        const searchConditions = textFields.map((name: string) => `${name} LIKE ?`).join(' OR ');
        sql += ` AND (${searchConditions})`;
        textFields.forEach(() => params.push(`%${search}%`));
      }
    }

    // Sort check
    const validSortFields = ['created_at', 'updated_at', ...schema.fields.map((f: any) => f.name)];
    const finalSortBy = validSortFields.includes(sortBy) ? sortBy : 'created_at';
    const finalSortOrder = ['ASC', 'DESC'].includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';
    sql += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;

    // Pagination
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    // Count
    let countSql = `SELECT COUNT(*) as total FROM ${type} WHERE is_deleted = 0 AND owner = ?`;
    const countParams: any[] = [owner];
    if (search) {
      const textFields = schema.fields
        .filter((f: any) => ['text', 'richtext'].includes(f.type))
        .map((f: any) => f.name);
      if (textFields.length > 0) {
        const searchConditions = textFields.map((name: string) => `${name} LIKE ?`).join(' OR ');
        countSql += ` AND (${searchConditions})`;
        textFields.forEach(() => countParams.push(`%${search}%`));
      }
    }

    try {
      const countRes = await c.env.DB.prepare(countSql).bind(...countParams).first<{ total: number }>();
      const total = countRes?.total || 0;
      const items = await c.env.DB.prepare(sql).bind(...params).all();

      const response = {
        data: items.results,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        },
        error: null
      };

      // Set Cache Layer (KV) TTL: 60s
      await c.env.KV.put(cacheKey, JSON.stringify(response), { expirationTtl: 60 });
      return c.json(response);
    } catch (e: any) {
      return c.json({ data: null, meta: null, error: e.message }, 500);
    }
  });

  // Single Item (GET /api/[type]/:id)
  app.get(`/api/${type}/:id`, async (c) => {
    const id = c.req.param('id');
    try {
      const item = await c.env.DB.prepare(`SELECT * FROM ${type} WHERE id = ? AND is_deleted = 0`).bind(id).first();
      if (!item) {
        return c.json({ data: null, meta: null, error: 'Item not found' }, 404);
      }
      return c.json({ data: item, meta: null, error: null });
    } catch (e: any) {
      return c.json({ data: null, meta: null, error: e.message }, 500);
    }
  });

  // Create (POST /api/[type])
  app.post(`/api/${type}`, async (c) => {
    try {
      const body = await c.req.json();
      const parseResult = zodSchema.safeParse(body);
      if (!parseResult.success) {
        return c.json({ data: null, meta: null, error: parseResult.error.format() }, 400);
      }

      const id = crypto.randomUUID();
      const insertData = parseResult.data as Record<string, any>;
      const owner = body.owner || 'salmeen';
      const keys = ['id', 'owner', ...Object.keys(insertData)];
      const placeholders = keys.map(() => '?').join(', ');

      const values = [id, owner];
      for (const k of Object.keys(insertData)) {
        let val = insertData[k];
        if (typeof val === 'boolean') {
          val = val ? 1 : 0;
        } else if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        values.push(val === undefined ? null : val);
      }

      const sql = `INSERT INTO ${type} (${keys.join(', ')}) VALUES (${placeholders})`;
      await c.env.DB.prepare(sql).bind(...values).run();

      await invalidateCache(c.env.KV, type);

      const created = await c.env.DB.prepare(`SELECT * FROM ${type} WHERE id = ?`).bind(id).first();
      return c.json({ data: created, meta: null, error: null }, 201);
    } catch (e: any) {
      return c.json({ data: null, meta: null, error: e.message }, 500);
    }
  });

  // Update (PATCH /api/[type]/:id)
  app.patch(`/api/${type}/:id`, async (c) => {
    const id = c.req.param('id');
    try {
      const exists = await c.env.DB.prepare(`SELECT id FROM ${type} WHERE id = ? AND is_deleted = 0`).bind(id).first();
      if (!exists) {
        return c.json({ data: null, meta: null, error: 'Item not found' }, 404);
      }

      const body = await c.req.json();
      const partialZodSchema = zodSchema.partial();
      const parseResult = partialZodSchema.safeParse(body);
      if (!parseResult.success) {
        return c.json({ data: null, meta: null, error: parseResult.error.format() }, 400);
      }

      const updateData = parseResult.data as Record<string, any>;
      const setClauses = ['updated_at = CURRENT_TIMESTAMP'];
      const values: any[] = [];

      for (const [k, val] of Object.entries(updateData)) {
        setClauses.push(`${k} = ?`);
        let formattedVal = val;
        if (typeof val === 'boolean') {
          formattedVal = val ? 1 : 0;
        } else if (typeof val === 'object' && val !== null) {
          formattedVal = JSON.stringify(val);
        }
        values.push(formattedVal === undefined ? null : formattedVal);
      }

      values.push(id);

      const sql = `UPDATE ${type} SET ${setClauses.join(', ')} WHERE id = ? AND is_deleted = 0`;
      await c.env.DB.prepare(sql).bind(...values).run();

      await invalidateCache(c.env.KV, type);

      const updated = await c.env.DB.prepare(`SELECT * FROM ${type} WHERE id = ?`).bind(id).first();
      return c.json({ data: updated, meta: null, error: null });
    } catch (e: any) {
      return c.json({ data: null, meta: null, error: e.message }, 500);
    }
  });

  // Soft Delete (DELETE /api/[type]/:id)
  app.delete(`/api/${type}/:id`, async (c) => {
    const id = c.req.param('id');
    try {
      await c.env.DB.prepare(`UPDATE ${type} SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND is_deleted = 0`).bind(id).run();
      await invalidateCache(c.env.KV, type);
      return c.json({ data: { id, success: true }, meta: null, error: null });
    } catch (e: any) {
      return c.json({ data: null, meta: null, error: e.message }, 500);
    }
  });
});

// 3. Media R2 Uploader (POST /api/media/upload)
app.post('/api/media/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return c.json({ data: null, meta: null, error: 'No file uploaded' }, 400);
    }
    const owner = formData.get('owner') as string || 'salmeen';

    const arrayBuffer = await file.arrayBuffer();
    const content = new Uint8Array(arrayBuffer);

    // Compute immutable hash filename
    const hashBuffer = await crypto.subtle.digest('SHA-256', content);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const contentHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const parts = file.name.split('.');
    const ext = parts.length > 1 ? `.${parts.pop()}` : '';
    const key = `${contentHash}${ext}`;

    // Upload key to R2
    await c.env.R2.put(key, content, {
      httpMetadata: {
        contentType: file.type || 'application/octet-stream',
        cacheControl: 'public, max-age=31536000, immutable'
      }
    });

    const cdnUrl = `/api/media/download?key=${encodeURIComponent(key)}`;

    // Write to D1 database media table
    const id = crypto.randomUUID();
    const mimeType = file.type || 'application/octet-stream';
    const fileSize = String(file.size);

    const existing = await c.env.DB.prepare(
      'SELECT id, is_deleted FROM media WHERE key = ? AND owner = ?'
    ).bind(key, owner).first<{ id: string, is_deleted: number }>();

    if (!existing) {
      await c.env.DB.prepare(
        `INSERT INTO media (id, owner, key, name, size, mime_type, url) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(id, owner, key, file.name, fileSize, mimeType, cdnUrl).run();
    } else if (existing.is_deleted === 1) {
      await c.env.DB.prepare(
        'UPDATE media SET is_deleted = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(existing.id).run();
    }

    return c.json({
      data: {
        key,
        name: file.name,
        url: cdnUrl
      },
      meta: null,
      error: null
    });
  } catch (e: any) {
    return c.json({ data: null, meta: null, error: e.message }, 500);
  }
});

// 4. Public R2 Media Proxy (GET /api/media/download)
app.get('/api/media/download', async (c) => {
  const query = c.req.query();
  const key = query.key;

  if (!key) {
    return c.text('Forbidden: Missing key parameter', 400);
  }

  const object = await c.env.R2.get(key);
  if (!object) {
    return c.text('Not Found', 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(object.body, { headers });
});

// 4.5 Media Library Routes (GET /api/media and DELETE /api/media/:key)
app.get('/api/media', async (c) => {
  const owner = c.req.query('owner') || 'salmeen';
  try {
    // Dynamic backfill check: if the database is empty but R2 has items, seed D1
    const countRes = await c.env.DB.prepare('SELECT COUNT(*) as count FROM media WHERE is_deleted = 0').first<{ count: number }>();
    const count = countRes?.count || 0;

    if (count === 0) {
      const listResult = await c.env.R2.list();
      for (const obj of listResult.objects) {
        const id = crypto.randomUUID();
        const cdnUrl = `/api/media/download?key=${encodeURIComponent(obj.key)}`;
        await c.env.DB.prepare(
          `INSERT OR IGNORE INTO media (id, owner, key, name, size, mime_type, url) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(id, 'salmeen', obj.key, obj.key, String(obj.size), 'application/octet-stream', cdnUrl).run();
      }
    }

    const items = await c.env.DB.prepare(
      'SELECT key, name, size, mime_type, url, created_at as uploaded FROM media WHERE owner = ? AND is_deleted = 0 ORDER BY created_at DESC'
    ).bind(owner).all();

    const results = items.results.map(row => ({
      key: row.key,
      name: row.name,
      size: Number(row.size),
      mime_type: row.mime_type,
      url: row.url,
      uploaded: row.uploaded
    }));

    return c.json({ data: results, error: null });
  } catch (e: any) {
    return c.json({ data: null, error: e.message }, 500);
  }
});

app.delete('/api/media/:key', async (c) => {
  const key = c.req.param('key');
  const owner = c.req.query('owner') || 'salmeen';
  try {
    // Soft delete in D1
    await c.env.DB.prepare(
      'UPDATE media SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE key = ? AND owner = ?'
    ).bind(key, owner).run();

    // Check if any other user still references this file in D1
    const activeRefs = await c.env.DB.prepare(
      'SELECT count(*) as count FROM media WHERE key = ? AND is_deleted = 0'
    ).bind(key).first<{ count: number }>();

    if (!activeRefs || activeRefs.count === 0) {
      // No more active references, safe to remove from R2
      await c.env.R2.delete(key);
    }

    return c.json({ success: true, error: null });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// 5. Durable Object CRUD Routes for Live Draft State and Lock Prevention
app.get('/api/locks/:id', async (c) => {
  const id = c.req.param('id');
  const doId = c.env.CMS_STATE.idFromName(id);
  const stub = c.env.CMS_STATE.get(doId);
  const response = await stub.fetch(`http://do/locks/${id}`);
  return response;
});

app.post('/api/locks/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const doId = c.env.CMS_STATE.idFromName(id);
  const stub = c.env.CMS_STATE.get(doId);
  const response = await stub.fetch(`http://do/locks/${id}`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return response;
});

app.delete('/api/locks/:id', async (c) => {
  const id = c.req.param('id');
  const doId = c.env.CMS_STATE.idFromName(id);
  const stub = c.env.CMS_STATE.get(doId);
  const response = await stub.fetch(`http://do/locks/${id}`, {
    method: 'DELETE'
  });
  return response;
});

app.get('/api/drafts/:id', async (c) => {
  const id = c.req.param('id');
  const doId = c.env.CMS_STATE.idFromName(id);
  const stub = c.env.CMS_STATE.get(doId);
  const response = await stub.fetch(`http://do/draft/${id}`);
  return response;
});

app.post('/api/drafts/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const doId = c.env.CMS_STATE.idFromName(id);
  const stub = c.env.CMS_STATE.get(doId);
  const response = await stub.fetch(`http://do/draft/${id}`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return response;
});

export default app;

// 6. Durable Object Class Definition
export class CmsState implements DurableObject {
  state: DurableObjectState;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith('/locks/')) {
      const id = path.split('/')[2];
      const method = request.method;

      if (method === 'GET') {
        const lock = await this.state.storage.get(`lock:${id}`);
        return new Response(JSON.stringify({ lock }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (method === 'POST') {
        const body = await request.json() as any;
        const user = body.user;
        const currentLock = await this.state.storage.get(`lock:${id}`) as any;
        if (currentLock && currentLock.user !== user && Date.now() - currentLock.timestamp < 60000) {
          return new Response(JSON.stringify({ success: false, message: 'Resource is locked' }), {
            status: 423,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        const lock = { user, timestamp: Date.now() };
        await this.state.storage.put(`lock:${id}`, lock);
        return new Response(JSON.stringify({ success: true, lock }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (method === 'DELETE') {
        await this.state.storage.delete(`lock:${id}`);
        return new Response(JSON.stringify({ success: true }));
      }
    }

    if (path.startsWith('/draft/')) {
      const id = path.split('/')[2];
      const method = request.method;

      if (method === 'GET') {
        const draft = await this.state.storage.get(`draft:${id}`);
        return new Response(JSON.stringify({ draft }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (method === 'POST') {
        const body = await request.json();
        await this.state.storage.put(`draft:${id}`, body);
        return new Response(JSON.stringify({ success: true }));
      }
    }

    return new Response('Not Found', { status: 404 });
  }
}
