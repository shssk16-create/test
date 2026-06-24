async function testEdit() {
  const API_URL = 'http://localhost:8787/api/posts';
  const AUTH_TOKEN = 'Bearer mock_admin_token';

  console.log('🔍 Fetching posts from API...');
  const getRes = await fetch(API_URL);
  const getJson = await getRes.json() as any;

  if (!getJson.data || getJson.data.length === 0) {
    console.error('❌ No posts found in database!');
    process.exit(1);
  }

  const targetPost = getJson.data.find((p: any) => p.slug === 'code-sample');
  if (!targetPost) {
    console.error('❌ Post with slug "code-sample" not found!');
    process.exit(1);
  }

  console.log(`✅ Found post. ID: ${targetPost.id}, Title: "${targetPost.title}"`);

  // Parse repeater and other fields
  let tags = [];
  try {
    tags = typeof targetPost.tags === 'string' ? JSON.parse(targetPost.tags) : targetPost.tags;
  } catch (e) {
    tags = [];
  }

  const payload = {
    title: 'Sample .md file - Verified',
    slug: targetPost.slug,
    summary: targetPost.summary,
    body: targetPost.body,
    cover_image: targetPost.cover_image || '',
    published_at: targetPost.published_at,
    status: targetPost.status,
    tags: Array.isArray(tags) ? tags : []
  };

  console.log(`📤 Sending PATCH request to edit title for ID: ${targetPost.id}...`);
  const patchRes = await fetch(`${API_URL}/${targetPost.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN
    },
    body: JSON.stringify(payload)
  });

  const patchJson = await patchRes.json() as any;
  if (patchRes.status !== 200 || patchJson.error) {
    console.error('❌ Edit request failed:', patchJson.error);
    process.exit(1);
  }

  console.log('✅ Edit response successful!');

  console.log('🔍 Fetching updated post from API to verify...');
  const verifyRes = await fetch(`${API_URL}/${targetPost.id}`);
  const verifyJson = await verifyRes.json() as any;

  if (verifyJson.data && verifyJson.data.title === 'Sample .md file - Verified') {
    console.log(`🎉 VERIFICATION SUCCESS: Title was updated to "${verifyJson.data.title}"!`);
  } else {
    console.error('❌ Verification failed. Title did not update in D1 database!', verifyJson.data);
  }

  // Restore title
  console.log('📤 Restoring original title...');
  payload.title = 'Sample .md file';
  await fetch(`${API_URL}/${targetPost.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN
    },
    body: JSON.stringify(payload)
  });
  console.log('✅ Restored successfully!');
}

testEdit().catch(console.error);
