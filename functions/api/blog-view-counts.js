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

const normalizePostHogHost = (host) => {
  if (!host) return 'https://us.posthog.com';
  const normalized = host.replace(/\/+$/, '');
  if (normalized.includes('us.i.posthog.com')) return 'https://us.posthog.com';
  if (normalized.includes('eu.i.posthog.com')) return 'https://eu.posthog.com';
  return normalized;
};

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestGet(context) {
  const host = normalizePostHogHost(
    context.env.POSTHOG_API_HOST ||
      context.env.POSTHOG_HOST ||
      context.env.VITE_PUBLIC_POSTHOG_HOST,
  );
  const projectId = context.env.POSTHOG_PROJECT_ID;
  const apiKey =
    context.env.POSTHOG_PERSONAL_API_KEY || context.env.POSTHOG_API_KEY;

  if (!projectId || !apiKey) {
    return json({
      ok: true,
      counts: {},
      misconfigured: true,
      error:
        'Missing PostHog server config. Required: POSTHOG_PROJECT_ID + POSTHOG_PERSONAL_API_KEY',
    });
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
      return json({
        ok: true,
        counts: {},
        error: errorText || 'PostHog query failed',
      });
    }

    const data = await response.json();
    const results = data?.results || [];
    const counts = {};

    for (const row of results) {
      const slug =
        (row && typeof row === 'object' && !Array.isArray(row) && row.post_slug) ||
        (Array.isArray(row) ? row[0] : null);
      const views = Number(
        (row && typeof row === 'object' && !Array.isArray(row) && row.views) ||
          (Array.isArray(row) ? row[1] : 0),
      );
      if (slug) counts[slug] = views;
    }

    return json({ ok: true, counts });
  } catch (error) {
    return json({ ok: true, counts: {}, error: error?.message || 'Unknown error' });
  }
}
