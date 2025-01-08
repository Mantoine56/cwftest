declare global {
  type NodeEnv = 'development' | 'production' | 'test';

  interface ProcessEnv {
    NODE_ENV: NodeEnv;
    PUBLIC_URL: string;
    [key: string]: string | NodeEnv;
  }

  // Define a minimal Process interface with only what we need
  interface MinimalProcess {
    env: ProcessEnv;
    // Add any other process properties you actually use
  }

  interface Window {
    _env_: ProcessEnv;
    process: MinimalProcess;
  }
}

export {}; 