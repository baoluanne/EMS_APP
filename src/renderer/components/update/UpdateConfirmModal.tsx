import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Dialog } from '@renderer/components/dialog/Dialog';
import { Warning } from '@mui/icons-material';
import { Stack } from '@mui/material';

interface UpdateConfirmModalProps {
  open: boolean;
  version: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const UpdateConfirmModal: React.FC<UpdateConfirmModalProps> = ({
  open,
  version,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          pb: 1,
        }}
      >
        Xác nhận cập nhật
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '24px 32px !important',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Warning color="warning" sx={{ fontSize: 40, mt: 0.5 }} />
          <Stack spacing={1.5}>
            <Typography variant="body1" fontWeight="medium">
              Ứng dụng sẽ đóng để tải xuống và cài đặt phiên bản {version}.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vui lòng đảm bảo đã lưu tất cả công việc trước khi tiếp tục. Ứng dụng sẽ tự động
              khởi động lại sau khi cài đặt hoàn tất.
            </Typography>
            <Typography variant="body2" color="warning.main" fontWeight="medium">
              Bạn có muốn tiếp tục?
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit">
          Hủy
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Tiếp tục
        </Button>
      </DialogActions>
    </Dialog>
  );
};
