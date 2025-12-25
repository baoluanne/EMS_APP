import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export type ConfirmModalType = 'info' | 'warning' | 'error';

export interface ConfirmModalProps {
  open: boolean;
  title: string;
  type?: ConfirmModalType;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string; // default: "Yes"
  cancelText?: string; // default: "No"
  children?: React.ReactNode; // optional description/content
  disableBackdropClose?: boolean; // if true, disable closing via backdrop/Escape
}

const typeIconMap: Record<ConfirmModalType, React.ReactNode> = {
  info: <InfoOutlinedIcon color="info" fontSize="medium" />,
  warning: <WarningAmberOutlinedIcon color="warning" fontSize="medium" />,
  error: <ErrorOutlineOutlinedIcon color="error" fontSize="medium" />,
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  type = 'info',
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'No',
  children,
  disableBackdropClose = false,
}) => {
  const handleClose = (_event: unknown, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClose && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
      return;
    }
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-modal-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="confirm-modal-title">
        <Stack direction="row" spacing={1} alignItems="center">
          {typeIconMap[type]}
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Stack>
      </DialogTitle>

      {children && (
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </DialogContent>
      )}

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color={type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'primary'}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;