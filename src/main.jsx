import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initPerformanceMonitoring } from './utils/performanceMonitor.js';
import { SocialPopoverProvider } from './context/SocialPopoverContext';

// Initialize performance monitoring
initPerformanceMonitoring();

const app = (
  <React.StrictMode>
    <SocialPopoverProvider>
      <App />
    </SocialPopoverProvider>
  </React.StrictMode>
);

// The homepage arrives pre-rendered (scripts/prerender.mjs); every other route gets the empty shell.
const root = document.getElementById('root');
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
