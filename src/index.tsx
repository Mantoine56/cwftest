// import './process.env';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles.css';

// Initialize environment variables
if (typeof window !== 'undefined') {
  const defaultEnv: ProcessEnv = {
    NODE_ENV: 'development' as NodeEnv,
    PUBLIC_URL: '',
  };

  // Ensure _env_ exists with proper typing
  window._env_ = window._env_ || defaultEnv;

  // Create a minimal process object
  const minimalProcess: MinimalProcess = {
    env: {
      ...window._env_,
      NODE_ENV: window._env_.NODE_ENV as NodeEnv
    }
  };

  // Assign the minimal process object
  (window as any).process = minimalProcess;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
