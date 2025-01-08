interface Window {
  _env_: {
    NODE_ENV: string;
    PUBLIC_URL: string;
    [key: string]: string;
  };
  process: {
    env: {
      NODE_ENV: string;
      PUBLIC_URL: string;
      [key: string]: string;
    };
  };
} 