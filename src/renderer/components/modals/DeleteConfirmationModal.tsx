import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Dialog } from '@renderer/components/dialog/Dialog';

interface Props {
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteConfirmationModal = ({ onClose, onDelete }: Props) => {
  return (
    <Dialog open={true} disablePortal>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: 12 }}>
          Bạn có chắc chắn muốn xóa các dòng đã chọn?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};
