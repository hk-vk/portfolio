import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { trackEvent } from './analytics.js';

afterEach(() => {
  delete globalThis.window;
});

test('does nothing outside the browser', () => {
  assert.doesNotThrow(() => trackEvent('page_viewed', { path: '/' }));
});

test('does nothing when the tracking script is unavailable', () => {
  globalThis.window = {};
  assert.doesNotThrow(() => trackEvent('theme_toggled', { to_theme: 'light' }));
});

test('forwards event names and properties to InsightFlare with the client context', () => {
  const properties = { project_id: '01', source: 'projects_card' };
  const client = {
    track(event, receivedProperties) {
      assert.equal(this, client);
      assert.equal(event, 'project_link_clicked');
      assert.equal(receivedProperties, properties);
      client.called = true;
    },
  };
  globalThis.window = { insightflare: client };
  trackEvent('project_link_clicked', properties);
  assert.equal(client.called, true);
});

test('tracking failures do not break user actions', () => {
  globalThis.window = { insightflare: { track() { throw new Error('blocked'); } } };
  assert.doesNotThrow(() => trackEvent('navbar_link_clicked', { link_path: '/blog' }));
});

test('rejected tracking requests are handled', async () => {
  globalThis.window = { insightflare: { track() { return Promise.reject(new Error('offline')); } } };
  trackEvent('navbar_link_clicked', { link_path: '/blog' });
  await new Promise((resolve) => setImmediate(resolve));
});
