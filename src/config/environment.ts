type Environment = {
  NODE_ENV: NodeEnv;
  PUBLIC_URL: string;
};

const getEnvironmentVariable = (key: keyof Environment): string | NodeEnv => {
  // Check for window._env_ first
  if (typeof window !== 'undefined' && window._env_?.[key]) {
    return window._env_[key];
  }
  
  // Fallback values
  const fallback: Environment = {
    NODE_ENV: 'development',
    PUBLIC_URL: ''
  };
  
  return fallback[key];
};

export const environment = {
  NODE_ENV: getEnvironmentVariable('NODE_ENV') as NodeEnv,
  PUBLIC_URL: getEnvironmentVariable('PUBLIC_URL') as string,
};

export default environment; 