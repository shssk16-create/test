async function getPosts() {
  const res = await fetch('https://wp.t8ne.space/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
        posts {
          nodes {
            title
            excerpt
          }
        }
        generalSettings {
          title
        }
      }`,
    }),
    next: { revalidate: 10 } 
  });
  const { data } = await res.json();
  return data;
}

export default async function Home() {
  const data = await getPosts();
  return (
    <main style={{ padding: '40px', direction: 'rtl', textAlign: 'right', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0070f3', fontSize: '2.5rem' }}>{data.generalSettings.title}</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>أهلاً بك في موقعك الجديد المتصل بـ AWS و Vercel!</p>
      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {data.posts.nodes.map((post: any) => (
          <div key={post.title} style={{ padding: '20px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        ))}
      </div>
    </main>
  );
}
