import { useEffect, useState } from 'react';
import { useAuthStore } from '@renderer/shared/stores';

export const useAppBoot = () => {
  const auth = useAuthStore();
  const [isBooted, setIsBooted] = useState<boolean>(false);

  useEffect(() => {
    const username = localStorage.getItem('ems_username');
    if (username) {
      auth.setUser({ id: username });
    }
    setIsBooted(true);
  }, []);

  return { isBooted };
};
