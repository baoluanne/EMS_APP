import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { FolderMenu } from '@renderer/components/folder-menu/FolderMenu';
import { getRouteByPath } from '@renderer/routes';

export const FolderNavigation = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const handleMenuClick = (item) => {
    if (item.disabled) {
      return;
    }
    navigate(item.fullPath);
  };
  useEffect(() => {
    const route = getRouteByPath(location.pathname);
    setItems(route.children || []);
  }, [location.pathname]);
  if (items.length) {
    return (
      <Paper elevation={0} className="h-full w-full" style={{ height: '100%', width: '100%' }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <FolderMenu menuItems={items} onMenuClick={handleMenuClick} />
        </Box>
      </Paper>
    );
  }
  return <Outlet></Outlet>;
};
