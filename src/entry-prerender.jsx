import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { SocialPopoverProvider } from './context/SocialPopoverContext';

// Renders a page to HTML at build time (scripts/prerender.mjs). Must match the client's first render
// in main.jsx, so anything that reads the browser has to wait for an effect.
export const render = (location) => new Promise((resolve, reject) => {
  let html = '';
  const stream = renderToPipeableStream(
    <SocialPopoverProvider>
      <App Router={StaticRouter} routerProps={{ location }} helmetContext={{}} />
    </SocialPopoverProvider>,
    {
      onAllReady() {
        const sink = new PassThrough();
        sink.on('data', (chunk) => { html += chunk; });
        sink.on('end', () => resolve(html));
        stream.pipe(sink);
      },
      onShellError: reject,
      onError: reject,
    },
  );
});
