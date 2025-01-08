import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles.css';

// Define a minimal environment setup
const defaultEnv = {
  NODE_ENV: 'development',
  PUBLIC_URL: '',
};

// Ensure we have a minimal environment setup
if (typeof window !== 'undefined') {
  // Create a minimal process object if it doesn't exist
  if (!(window as any).process) {
    (window as any).process = {
      env: {
        NODE_ENV: 'development',
        PUBLIC_URL: '',
      }
    };
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
