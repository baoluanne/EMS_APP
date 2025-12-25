const API_ENDPOINT = import.meta.env.VITE_API_URL || 'http://localhost:5031/api';

export const env = {
  API_ENDPOINT,
} as const;
