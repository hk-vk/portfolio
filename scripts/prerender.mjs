// Runs after `vite build`: writes the homepage's HTML into dist/index.html so it paints before the
// JavaScript arrives, and keeps the empty page as dist/shell.html for every other route
// (functions/_middleware.js).
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const serverBuild = new URL('../dist-prerender/', import.meta.url);
const mount = '<div id="root"></div>';

const shell = readFileSync(new URL('index.html', dist), 'utf8');
if (!shell.includes(mount)) throw new Error(`dist/index.html has no ${mount}`);

const { render } = await import(new URL('entry-prerender.js', serverBuild).href);
const html = await render('/');

if (!html.includes('HARIKRISHNAN')) throw new Error('The pre-rendered homepage is missing the hero');
if (/<script/i.test(html)) throw new Error('The pre-rendered homepage contains a script');

writeFileSync(new URL('shell.html', dist), shell);
writeFileSync(new URL('index.html', dist), shell.replace(mount, `<div id="root">${html}</div>`));
rmSync(serverBuild, { recursive: true, force: true });
console.log(`Pre-rendered / (${Math.round(html.length / 1024)} KB)`);
