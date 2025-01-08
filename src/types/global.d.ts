declare global {
  interface Window {
    _env_?: {
      NODE_ENV: string;
      PUBLIC_URL: string;
      [key: string]: string;
    };
  }
}

export {}; 