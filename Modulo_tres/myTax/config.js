export const ENVIRONMENT = __DEV__ ? 'development' : 'production';

const ENV_CONFIG = {
  development: {
    apiBaseUrl: 'http://192.168.0.9:3000',
  },
  production: {
    apiBaseUrl: 'https://tu-dominio.com',
  },
};

export const getApiBaseUrl = () => {
  const env = ENVIRONMENT === 'production' ? 'production' : 'development';
  return ENV_CONFIG[env].apiBaseUrl;
};

export default {
  environment: ENVIRONMENT,
  apiBaseUrl: getApiBaseUrl(),
};
