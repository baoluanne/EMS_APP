import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabNavigatorStore } from '../stores';

export const useRenderTabContent = () => {
  const { activeTab } = useTabNavigatorStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('ems_username');
    if (activeTab && storedUser) {
      navigate(activeTab.path);
    }
  }, [activeTab]);
};
