import React from 'react';
import ReactDOM from 'react-dom/client';
import { PostHogProvider } from '@posthog/react';
import App from './App.jsx';
import './fonts.css'; // Updated to import the fonts CSS file
import './index.css';
import { initPerformanceMonitoring } from './utils/performanceMonitor.js';
import { SocialPopoverProvider } from './context/SocialPopoverContext';

// Initialize performance monitoring
initPerformanceMonitoring();

const posthogOptions = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
      <SocialPopoverProvider>
        <App />
      </SocialPopoverProvider>
    </PostHogProvider>
  </React.StrictMode>,
);
