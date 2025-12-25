import { toast } from 'react-toastify';
import { CustomAxiosError } from './axios.types';
import { useAuthStore } from '@renderer/shared/stores';

export const createBearerForToken = (token: string) => `Bearer ${token}`;

export const showErrorToast = (error: CustomAxiosError | string) => {
  if (typeof error === 'string') {
    toast.error(error);
    return;
  }
  // Auto show alert message when error occured
  // The alert message can be disabled by config { notificationDisabled: true }
  if (error.config?.disableAlert || !error.response?.data) {
    return;
  }

  if (typeof error.response.data === 'string') {
    toast.error(error.response.data);
    return;
  }

  if (typeof error.response.data.message === 'string') {
    toast.error(error.response.data.message);
    return;
  }
};

export const resetAuth = () => {
  useAuthStore.$reset();
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
};
