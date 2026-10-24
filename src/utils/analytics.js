// Analytics must never interrupt navigation or other user actions.
export const trackEvent = (event, properties) => {
  if (typeof window === 'undefined') return;

  try {
    const result = window.insightflare?.track(event, properties);
    result?.catch?.(() => {});
  } catch {
    // Tracking may be blocked or unavailable.
  }
};
