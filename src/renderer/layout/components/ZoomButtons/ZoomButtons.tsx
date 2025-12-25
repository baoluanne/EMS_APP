import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useZoomControlStore } from '@renderer/layout/components/ZoomButtons/store';

export const ZoomButtons = () => {
  const { setZoomLevel, zoomLevel } = useZoomControlStore();

  useEffect(() => {
    // @ts-ignore
    const currentZoom = window.zoomControls.getZoom();
    setZoomLevel(Math.round(currentZoom * 100));
  }, []);

  const handleZoom = (delta: number) => {
    const newZoom = Math.min(200, Math.max(10, zoomLevel + delta));
    setZoomLevel(newZoom);
    // @ts-ignore
    window.zoomControls.setZoom(newZoom / 100);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        px: 1,
        height: 34,
        backgroundColor: '#f5f5f5',
      }}
    >
      <IconButton
        size="small"
        onClick={() => handleZoom(-10)}
        sx={{ color: '#0078d4', p: 0.5 }}
        title="Thu nhỏ"
      >
        <ZoomOut fontSize="small" />
      </IconButton>
      <Typography fontSize={14} fontWeight={500} sx={{ minWidth: 40 }}>
        {zoomLevel}%
      </Typography>
      <IconButton
        size="small"
        onClick={() => handleZoom(10)}
        sx={{ color: '#0078d4', p: 0.5 }}
        title="Phóng to"
      >
        <ZoomIn fontSize="small" />
      </IconButton>
    </Box>
  );
};
