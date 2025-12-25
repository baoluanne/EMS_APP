import { Box, Paper } from '@mui/material';
import { FolderMenu } from '@renderer/components/folder-menu/FolderMenu';
import { appRoutes } from '@renderer/routes';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const handleMenuClick = (item) => {
    if (item.disabled) {
      return;
    }
    navigate(item.fullPath);
  };
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
        <FolderMenu
          menuItems={appRoutes.filter((r) => r.path !== 'dashboard')}
          onMenuClick={handleMenuClick}
        />
      </Box>
    </Paper>
  );
}
