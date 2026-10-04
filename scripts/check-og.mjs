// Run: node scripts/check-og.mjs
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { onRequest } from '../functions/_middleware.js';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const og = '/social/hero-silver-og-v1.jpg';
const twitter = '/social/hero-silver-x-v1.jpg';
const meta = (html, key) => {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]);
  const matches = tags.filter(tag => tag.includes(`property="${key}"`) || tag.includes(`name="${key}"`));
  assert.equal(matches.length, 1, `Expected one ${key}`);
  return matches[0].match(/content="([^"]*)"/)[1];
};

// These two fixtures are baseline/progressive JPEGs, not a general image parser.
const dimensions = (path) => {
  const bytes = readFileSync(`public${path}`);
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'Expected JPEG');
  for (let offset = 2; offset < bytes.length;) {
    assert.equal(bytes[offset], 0xff);
    const marker = bytes[offset + 1];
    if (marker === 0xc0 || marker === 0xc2) return [bytes.readUInt16BE(offset + 7), bytes.readUInt16BE(offset + 5)];
    offset += bytes.readUInt16BE(offset + 2) + 2;
  }
  throw Error('JPEG dimensions missing');
};
assert.deepEqual(dimensions(og), [1200, 630]);
assert.deepEqual(dimensions(twitter), [1200, 675]);
for (const path of [og, twitter]) assert.ok(readFileSync(`public${path}`).length < 200_000, 'Image is too large');

const index = readFileSync('index.html', 'utf8');
assert.equal(meta(index, 'og:image'), `https://hari.works${og}`);
assert.equal(meta(index, 'twitter:image'), `https://hari.works${twitter}`);
assert.equal(meta(index, 'og:image:width'), '1200');
assert.equal(meta(index, 'og:image:height'), '630');
for (const tag of index.matchAll(/<meta\b[^>]*(?:property="og:|name="twitter:)[^>]*>/g)) {
  assert.ok(tag[0].includes('data-rh="true"'), 'React Helmet must replace static metadata');
}

const seo = readFileSync('src/components/SEOHead.jsx', 'utf8');
assert.ok(seo.includes(og) && seo.includes(twitter), 'Client and static image URLs disagree');
const invoke = (path, ua, method = 'GET') => onRequest({
  request: new Request(`https://hari.works${path}`, { method, headers: { 'user-agent': ua } }),
  next: () => new Response('passed through', { status: 202 }),
});
for (const ua of ['Twitterbot', 'facebookexternalhit', 'LinkedInBot', 'Slackbot', 'WhatsApp', 'TelegramBot', 'Discordbot']) {
  for (const path of ['/', '/projects', '/blog', '/blog/example', '/archive', '/archive/2025/example']) {
    const response = await invoke(path, ua);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('vary'), 'User-Agent');
    assert.equal(meta(html, 'og:image'), `https://hari.works${og}`);
    assert.equal(meta(html, 'twitter:image'), `https://hari.works${twitter}`);
    assert.equal(meta(html, 'og:image:height'), '630');
    assert.equal(meta(html, 'og:type'), path.startsWith('/blog/') ? 'article' : 'website');
  }
  for (const path of [og, twitter, '/assets/app.js', '/api/blog-view-counts', '/missing']) {
    assert.equal((await invoke(path, ua)).status, 202, 'Crawler request intercepted an asset/API/unknown route');
  }
}
assert.equal((await invoke('/', 'Mozilla/5.0')).status, 202);
assert.equal((await invoke('/', 'Twitterbot', 'POST')).status, 202);
assert.equal(await (await invoke('/', 'Twitterbot', 'HEAD')).text(), '');
const queryHtml = await (await invoke('/?q=%22%3E%3Cscript%3E', 'Twitterbot')).text();
assert.equal(meta(queryHtml, 'og:url'), 'https://hari.works/');
assert.ok(!queryHtml.includes('<script>'));
for (const obsolete of ['src/utils/generateOGImage.js', 'scripts/generateOGImages.html', 'functions/api/og.js', 'src/pages/OGPreview.jsx']) {
  assert.equal(existsSync(obsolete), false, `Obsolete generator remains: ${obsolete}`);
}
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', ssr: { noExternal: ['react-helmet-async'] } });
try {
  const { default: SEOHead } = await server.ssrLoadModule('/src/components/SEOHead.jsx');
  const { HelmetProvider } = await server.ssrLoadModule('react-helmet-async');
  for (const image of [undefined, 'https://example.com/article.png']) {
    const context = {};
    renderToString(React.createElement(HelmetProvider, { context }, React.createElement(SEOHead, { image })));
    const html = context.helmet.meta.toString();
    assert.equal(meta(html, 'og:image'), image || `https://hari.works${og}`);
    assert.equal(meta(html, 'twitter:image'), image || `https://hari.works${twitter}`);
    if (image) {
      assert.ok(!html.includes('property="og:image:width"'), 'Unknown image dimensions must not be invented');
      assert.ok(!html.includes('property="og:image:type"'), 'Unknown image MIME must not be invented');
    }
  }
} finally { await server.close(); }
console.log('OG checks passed: image dimensions/size, static and React metadata, custom images, crawler routes, asset passthrough, canonical URLs, and cleanup.');
