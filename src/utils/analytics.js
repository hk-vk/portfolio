let clientPromise;
let pendingEvents = [];
let idleHandle;

const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

const initialize = () => {
  idleHandle = undefined;
  if (!apiKey || clientPromise) return clientPromise;

  clientPromise = import('posthog-js')
    .then(({ default: client }) => {
      if (!client.__loaded) {
        client.init(apiKey, {
          api_host: apiHost,
          defaults: '2026-01-30',
        });
      }

      pendingEvents.forEach(({ event, properties }) => client.capture(event, properties));
      pendingEvents = [];
      return client;
    })
    .catch(() => {
      clientPromise = undefined;
      pendingEvents = [];
      return null;
    });

  return clientPromise;
};

const scheduleInitialization = () => {
  if (idleHandle !== undefined || !apiKey) return;

  // Keep analytics out of the first interaction window, even on an idle desktop.
  idleHandle = window.setTimeout(initialize, 2000);
};

const capture = (event, properties) => {
  if (!apiKey) return;

  pendingEvents.push({ event, properties });
  scheduleInitialization();
};

// Keep the existing call shape while keeping analytics off the critical path.
export const posthog = { capture };
