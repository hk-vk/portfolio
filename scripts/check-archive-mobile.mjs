// Run with the dev server up: node scripts/check-archive-mobile.mjs [base URL]
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const session = 'archive-mobile-check';
const browser = (...args) => {
  const response = JSON.parse(execFileSync('agent-browser', ['--session', session, '--json', ...args], {
    encoding: 'utf8', timeout: 20000,
    env: { ...process.env, AGENT_BROWSER_IDLE_TIMEOUT_MS: '600000' },
  }));
  assert.equal(response.success, true, response.error);
  return response.data;
};
try {
  browser('set', 'viewport', '390', '844');
  browser('open', `${process.argv[2] || 'http://localhost:5173'}/archive`);
  browser('wait', '[data-archive-slide]');
  const blocked = browser('eval', `(() => {
    const cards = [...document.querySelectorAll('[data-archive-slide] [data-lifeline-interactive]')];
    if (!cards.length) return ['No cards'];
    return cards.flatMap(card => {
      const blocked = [];
      for (let el = card; el; el = el.parentElement) {
        const action = getComputedStyle(el).touchAction;
        if (action !== 'auto' && action !== 'manipulation' && !action.includes('pan-x')) blocked.push(action);
        if (el.matches('[data-lenis-prevent]')) break;
      }
      return blocked;
    });
  })()`).result;
  assert.deepEqual(blocked, [], 'Cards and their carousel must allow horizontal touch panning');
  console.log('Mobile archive: horizontal touch panning allowed over every card.');
} finally {
  browser('close');
}
