import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OLD_BLOG_DIR = 'c:/Users/The Struggler/Downloads/SALMEEN/blog/data/blog';
const API_URL = 'http://localhost:8787/api/posts';
const AUTH_TOKEN = 'Bearer mock_admin_token';

// Simple frontmatter + body parser
function parseMDX(content: string) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {} as Record<string, any>, body: content };
  }
  
  const fmText = match[1];
  const body = match[2].trim();
  const frontmatter: Record<string, any> = {};

  const lines = fmText.split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.substring(0, colonIdx).trim();
    let valStr = line.substring(colonIdx + 1).trim();

    // Clean quotes
    if (valStr.startsWith("'") && valStr.endsWith("'")) {
      valStr = valStr.substring(1, valStr.length - 1);
    } else if (valStr.startsWith('"') && valStr.endsWith('"')) {
      valStr = valStr.substring(1, valStr.length - 1);
    }

    let val: any = valStr;
    if (valStr === 'true') {
      val = true;
    } else if (valStr === 'false') {
      val = false;
    } else if (valStr.startsWith('[') && valStr.endsWith(']')) {
      try {
        // Clean single quotes inside array JSON representation
        const jsonStr = valStr.replace(/'/g, '"');
        val = JSON.parse(jsonStr);
      } catch (e) {
        val = valStr.substring(1, valStr.length - 1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }
    frontmatter[key] = val;
  }
  return { frontmatter, body };
}

async function main() {
  console.log(`📂 Scanning old blog directory: ${OLD_BLOG_DIR}`);
  if (!fs.existsSync(OLD_BLOG_DIR)) {
    console.error(`❌ Old blog directory not found: ${OLD_BLOG_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(OLD_BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  console.log(` Found ${files.length} MDX/MD files. Starting import...`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const filePath = path.join(OLD_BLOG_DIR, file);
    const slug = file.replace(/\.mdx?$/, '');
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const { frontmatter, body } = parseMDX(content);
      
      const title = frontmatter.title || slug;
      const summary = frontmatter.summary || `Blog post imported from ${file}`;
      const publishedAt = frontmatter.date || new Date().toISOString().split('T')[0];
      const status = frontmatter.draft === true ? 'draft' : 'published';
      const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];

      const payload = {
        title,
        slug,
        summary,
        body,
        cover_image: frontmatter.images && Array.isArray(frontmatter.images) && frontmatter.images.length > 0 ? frontmatter.images[0] : '',
        published_at: publishedAt,
        status,
        tags
      };

      console.log(`📤 Importing "${title}" (${slug})...`);

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AUTH_TOKEN
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json() as any;

      if (res.status === 201 || res.status === 200) {
        console.log(`✅ Successfully imported: ${slug}`);
        successCount++;
      } else {
        console.error(`❌ Failed to import ${slug}:`, data.error);
        failCount++;
      }
    } catch (err: any) {
      console.error(`❌ Exception importing ${slug}:`, err.message);
      failCount++;
    }
  }

  console.log(`\n🎉 Import Complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

main().catch(err => {
  console.error('Fatal error during import:', err);
});
