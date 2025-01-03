export const getEnvValue = (key: keyof ImportMetaEnv): string => {
  return import.meta.env[key] || "";
};

export const isDevMode = (): boolean => {
  return import.meta.env.DEV;
};

export const isProdMode = (): boolean => {
  return import.meta.env.PROD;
};

export const isMockEnabled = (): boolean => {
  return import.meta.env.VITE_ENABLE_MOCK === "true";
};

export const getApiBaseUrl = (): string => {
  return getEnvValue("VITE_API_BASE_URL");
};
