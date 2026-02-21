import React from 'react';

const RETRY_KEY = 'lazy-retry-done';

export const lazyWithRetry = (importer) =>
  React.lazy(async () => {
    try {
      return await importer();
    } catch (error) {
      const isChunkLoadFailure =
        error?.name === 'ChunkLoadError' ||
        /Failed to fetch dynamically imported module/i.test(error?.message || '');

      if (isChunkLoadFailure && !sessionStorage.getItem(RETRY_KEY)) {
        sessionStorage.setItem(RETRY_KEY, '1');
        window.location.reload();
      }

      throw error;
    }
  });
