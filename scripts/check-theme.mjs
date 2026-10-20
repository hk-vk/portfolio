import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { themeToggle } from '../src/utils/themeToggle.js';

const boot = readFileSync('index.html', 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
for (const saved of [null, 'light', 'dark', 'invalid']) {
  const values = new Map(saved === null ? [] : [['theme', saved]]);
  const classes = new Set();
  globalThis.localStorage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  globalThis.document = { documentElement: {
    style: {},
    classList: {
      add: key => classes.add(key),
      remove: key => classes.delete(key),
      toggle: (key, enabled) => enabled ? classes.add(key) : classes.delete(key),
    },
  } };
  globalThis.window = { document, matchMedia: () => ({ matches: false }) };
  runInNewContext(boot, { document, localStorage, window });
  const initial = saved === 'light' ? 'light' : 'dark';
  assert.equal(classes.has('dark'), initial === 'dark', 'Pre-paint default follows device instead of dark');
  const api = themeToggle();
  api.initializeTheme();
  assert.equal(document.documentElement.style.colorScheme, initial);
  assert.equal(localStorage.getItem('theme'), saved, 'Initialization must not persist an automatic preference');
  const toggled = initial === 'dark' ? 'light' : 'dark';
  assert.equal(api.toggleTheme(), toggled);
  assert.equal(localStorage.getItem('theme'), toggled);
  assert.equal(document.documentElement.style.colorScheme, toggled);
  assert.equal(api.toggleTheme(), initial);
}
console.log('Theme checks passed: dark default on light devices, saved choices, no automatic persistence, and toggling.');
