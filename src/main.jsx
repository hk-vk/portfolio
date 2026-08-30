import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './fonts.css'; // Updated to import the fonts CSS file
import './index.css';
import { initPerformanceMonitoring } from './utils/performanceMonitor.js';
import { SocialPopoverProvider } from './context/SocialPopoverContext';

// Initialize performance monitoring
initPerformanceMonitoring();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocialPopoverProvider>
      <App />
    </SocialPopoverProvider>
  </React.StrictMode>,
);
