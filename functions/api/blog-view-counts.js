const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Cache-Control': 'public, max-age=120',
    },
  });

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestGet(context) {
  const host = context.env.POSTHOG_API_HOST || 'https://us.posthog.com';
  const projectId = context.env.POSTHOG_PROJECT_ID;
  const apiKey = context.env.POSTHOG_PERSONAL_API_KEY;

  if (!projectId || !apiKey) {
    return json({ ok: false, counts: {}, error: 'Missing PostHog API configuration' }, 500);
  }

  const query = {
    query: {
      kind: 'HogQLQuery',
      query: `
        SELECT
          properties.post_slug AS post_slug,
          count() AS views
        FROM events
        WHERE event = 'blog_post_viewed'
          AND properties.post_slug IS NOT NULL
        GROUP BY post_slug
      `,
    },
  };

  try {
    const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return json({ ok: false, counts: {}, error: errorText || 'PostHog query failed' }, 502);
    }

    const data = await response.json();
    const results = data?.results || [];
    const counts = {};

    for (const row of results) {
      const slug = row?.post_slug;
      const views = Number(row?.views || 0);
      if (slug) counts[slug] = views;
    }

    return json({ ok: true, counts });
  } catch (error) {
    return json({ ok: false, counts: {}, error: error?.message || 'Unknown error' }, 500);
  }
}
