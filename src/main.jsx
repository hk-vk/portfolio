import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './fonts.css'; // Updated to import the fonts CSS file
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
