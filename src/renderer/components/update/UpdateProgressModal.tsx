import {
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { Dialog } from '@renderer/components/dialog/Dialog';
import { CloudDownload } from '@mui/icons-material';

interface UpdateProgressModalProps {
  open: boolean;
  progress: number; // 0-100
}

export const UpdateProgressModal: React.FC<UpdateProgressModalProps> = ({ open, progress }) => {
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      // Prevent closing during download
      slotProps={{
        backdrop: {
          style: { pointerEvents: 'none' },
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          pb: 1,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <CloudDownload />
          <span>Đang tải xuống bản cập nhật</span>
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: '32px !important',
        }}
      >
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Vui lòng đợi trong khi ứng dụng đang tải xuống bản cập nhật. Quá trình này có thể mất
          vài phút.
        </Typography>

        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'grey.300',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
              },
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            color="primary"
            sx={{ mt: 2 }}
          >
            {progress}%
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" textAlign="center" fontStyle="italic">
          Ứng dụng sẽ tự động khởi động lại sau khi tải xuống hoàn tất.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
