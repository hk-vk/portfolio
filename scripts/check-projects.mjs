// Run with the dev server up: node scripts/check-projects.mjs [base URL]
// Requires the locally installed agent-browser CLI; no test dependencies.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const base = process.argv[2] || 'http://localhost:5173';
const session = 'projects-check';
const browser = (...args) => {
  const output = execFileSync('agent-browser', ['--session', session, '--json', ...args], {
    encoding: 'utf8', timeout: 15000, killSignal: 'SIGKILL', env: { ...process.env, AGENT_BROWSER_IDLE_TIMEOUT_MS: '600000' },
  });
  const response = JSON.parse(output);
  assert.equal(response.success, true, response.error);
  return response.data;
};
const evaluate = (code) => browser('eval', code).result;

try {
  for (const width of [320, 390, 768, 1280]) {
    console.log(`Checking ${width}px…`);
    browser('set', 'viewport', String(width), '844');
    browser('open', `${base}/projects`);
    browser('wait', 'button[aria-label="View TXTSKILLS project details"]');
    assert.equal(evaluate('document.documentElement.scrollWidth <= innerWidth'), true, 'Page overflow');
    browser('click', 'button[aria-label="View TXTSKILLS project details"]');
    browser('wait', '--fn', '!!document.querySelector("dialog:modal")');
    assert.equal(evaluate('document.activeElement.getAttribute("aria-label")'), 'Close project details');
    assert.equal(evaluate('document.body.style.overflow'), 'hidden');
    assert.equal(evaluate('document.querySelector("dialog").scrollWidth <= innerWidth'), true, 'Dialog overflow');
    browser('press', 'Shift+Tab');
    // Chromium may visit browser chrome at the boundary, never the inert page.
    if (evaluate('document.activeElement === document.body')) browser('press', 'Shift+Tab');
    assert.match(evaluate('document.activeElement.getAttribute("aria-label")'), /^Next project:/, 'Focus escaped to page');
    browser('press', 'Tab');
    if (evaluate('document.activeElement === document.body')) browser('press', 'Tab');
    assert.equal(evaluate('document.activeElement.getAttribute("aria-label")'), 'Close project details');
    evaluate('document.querySelector("dialog .overflow-y-auto").scrollTop = 300');
    evaluate('document.querySelector("button[aria-label=\\\"Next project: Git Talks\\\"]").focus()');
    browser('press', 'Enter');
    browser('wait', '--text', 'Git Talks');
    assert.equal(evaluate('getComputedStyle(document.querySelector("dialog .overflow-y-auto > div")).opacity'), '1', 'Keyboard navigation animated');
    assert.equal(evaluate('document.querySelector("#project-detail-title").textContent'), 'Git Talks');
    assert.equal(evaluate('document.querySelector("dialog .overflow-y-auto").scrollTop'), 0);
    browser('click', 'button[aria-label="Previous project: TXTSKILLS"]');
    browser('click', 'button[aria-label="Previous project: Cricket Score Widget"]');
    assert.equal(evaluate('document.querySelector("#project-detail-title").textContent'), 'Cricket Score Widget');
    browser('press', 'Escape');
    browser('wait', '--fn', '!document.querySelector("dialog")');
    assert.equal(evaluate('document.body.style.overflow'), '');
    assert.equal(evaluate('document.activeElement.getAttribute("aria-label")'), 'View TXTSKILLS project details');
  }
  browser('set', 'media', 'light', 'reduced-motion');
  evaluate('localStorage.setItem("theme", "light")');
  browser('open', `${base}/projects`);
  browser('click', 'button[aria-label="View TXTSKILLS project details"]');
  browser('wait', '--fn', '!!document.querySelector("dialog:modal")');
  browser('screenshot', '/tmp/projects-light-reduced-motion.png');
  assert.equal(evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches'), true);
  assert.equal(evaluate('getComputedStyle(document.querySelector("dialog").firstElementChild).transform'), 'none');
  evaluate('document.querySelector("dialog img").dispatchEvent(new Event("error"))');
  browser('wait', '--text', 'Preview unavailable');
  browser('click', 'button[aria-label="Close project details"]');
  browser('wait', '--fn', '!document.querySelector("dialog")');
  browser('click', 'button[aria-label="View TXTSKILLS project details"]');
  browser('wait', '--fn', '!!document.querySelector("dialog:modal")');
  evaluate('document.querySelector("dialog").click()');
  browser('wait', '--fn', '!document.querySelector("dialog")');
  console.log('Projects checks passed: responsive layout, focus trap/return, Escape, navigation, scroll reset, image fallback, reduced motion, close button, backdrop.');
} finally {
  try { browser('close'); } catch (error) { console.warn('Browser cleanup failed:', error.message); }
}
