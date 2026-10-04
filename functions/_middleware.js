// Social crawlers need metadata in the response HTML, before React runs.
const crawler = /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator|WhatsApp|Telegram|Discord|Skype/i;
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const pages = {
  '/': ['Harikrishnan V K | Full-Stack Developer Portfolio', 'Projects, writing, and earlier versions of hari.works. A personal site by full-stack developer Harikrishnan V K.'],
  '/about': ['About | Harikrishnan V K', 'About Harikrishnan V K, a full-stack developer building web apps and developer tools.'],
  '/projects': ['Projects | Harikrishnan V K', 'Web apps, developer tools, and things I built to solve everyday problems.'],
  '/contact': ['Contact | Harikrishnan V K', 'Get in touch with Harikrishnan V K about a project or collaboration.'],
  '/blog': ['Blog | Harikrishnan V K', 'Notes on web development, programming, and the things I build.'],
  '/archive': ['Archive | Harikrishnan V K', 'Browse earlier versions of hari.works.'],
};

export async function onRequest({ request, next }) {
  if (!crawler.test(request.headers.get('user-agent') || '')) return next();
  if (!['GET', 'HEAD'].includes(request.method)) return next();

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '') || '/';
  let page = pages[path];
  let type = 'website';
  if (!page && /^\/blog\/[^/]+$/.test(path)) {
    page = ['Blog post | Harikrishnan V K', 'Notes on web development, programming, and the things I build.'];
    type = 'article';
  }
  if (!page && /^\/archive\/[^/]+\/[^/]+$/.test(path)) page = pages['/archive'];
  // Assets and API requests must reach their own handlers, even for bot UAs.
  if (!page) return next();

  const [title, description] = page.map(escapeHtml);
  const canonical = escapeHtml(new URL(path, url.origin).href);
  const image = escapeHtml(new URL('/social/hero-silver-og-v1.jpg', url.origin).href);
  const twitterImage = escapeHtml(new URL('/social/hero-silver-x-v1.jpg', url.origin).href);
  const secureImage = url.protocol === 'https:' ? `<meta property="og:image:secure_url" content="${image}" />` : '';
  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
${secureImage}
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Homepage preview of hari.works" />
<meta property="og:url" content="${canonical}" />
<meta property="og:type" content="${type}" />
<meta property="og:site_name" content="Harikrishnan V K | Portfolio" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@harikrishnanvk" />
<meta name="twitter:creator" content="@harikrishnanvk" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${twitterImage}" />
<meta name="twitter:image:alt" content="Homepage preview of hari.works" />
</head><body><h1>${title}</h1><p>${description}</p><a href="${canonical}">Visit hari.works</a></body></html>`;

  return new Response(request.method === 'HEAD' ? null : html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300', 'Vary': 'User-Agent' },
  });
}
