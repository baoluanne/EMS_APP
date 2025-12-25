import { Button, Stack, Typography } from '@mui/material';
import { SystemUpdateAlt } from '@mui/icons-material';

interface UpdateToastProps {
  version: string;
  onUpdate: () => void;
  onCancel: () => void;
}

export const UpdateToast: React.FC<UpdateToastProps> = ({ version, onUpdate, onCancel }) => {
  return (
    <Stack
      spacing={1.5}
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <SystemUpdateAlt color="info" sx={{ flexShrink: 0, fontSize: 24 }} />
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Phiên bản mới có sẵn
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          wordBreak: 'break-word',
          overflow: 'hidden',
          lineHeight: 1.4,
        }}
      >
        Phiên bản {version} đã sẵn sàng. Bạn có muốn cập nhật ngay không?
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        sx={{
          mt: 0.5,
        }}
      >
        <Button
          size="small"
          onClick={onCancel}
          color="inherit"
          sx={{ minWidth: 'auto', px: 2 }}
        >
          Để sau
        </Button>
        <Button
          size="small"
          onClick={onUpdate}
          variant="contained"
          color="primary"
          sx={{ minWidth: 'auto', px: 2 }}
        >
          Cập nhật
        </Button>
      </Stack>
    </Stack>
  );
};
