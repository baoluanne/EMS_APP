import { Close } from '@mui/icons-material';
import {
  Breakpoint,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Dialog } from '@renderer/components/dialog/Dialog';
import { TITLE_MODE } from '@renderer/shared/enums';

interface Props {
  onClose?: () => void;
  onSave?: () => void;
  title?: string;
  children?: React.ReactNode;
  fullScreenMode?: boolean;
  maxWidth?: Breakpoint;
  titleMode?: TITLE_MODE;
  saveTitle?: string;
  cancelTitle?: string;
  isRefetching?: boolean;
}

export const FormDetailsModal = ({
  onClose,
  onSave,
  title,
  children,
  fullScreenMode = false,
  maxWidth = 'md',
  titleMode = TITLE_MODE.BASIC,
  saveTitle = 'Lưu',
  cancelTitle = 'Hủy',
  isRefetching = false,
}: Props) => {
  const coloredTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: 'primary.light',
    color: 'primary.contrastText',
    pb: 1,
    position: 'relative',
    cursor: 'move',
  };

  const basicTitleStyle = {
    cursor: 'move',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    pb: 1,
  };

  return (
    <Dialog
      open={true}
      maxWidth={fullScreenMode ? false : maxWidth}
      fullWidth
      slotProps={{
        paper: {
          sx: fullScreenMode
            ? {
                width: '100%',
                height: 'calc(100% - 42px)',
                margin: 0,
                borderRadius: 4,
                pointerEvents: 'auto',
              }
            : { borderRadius: 4, pointerEvents: 'auto' },
        },
      }}
    >
      <DialogTitle sx={titleMode === TITLE_MODE.COLORED ? coloredTitleStyle : basicTitleStyle}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:
              titleMode === TITLE_MODE.COLORED ? 'grey.100' : (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '24px 32px !important',
          fontSize: '12px',
        }}
      >
        {children}
      </DialogContent>

      {onSave && onClose && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>{cancelTitle}</Button>
          <Button onClick={onSave} variant="contained" disabled={isRefetching}>
            {saveTitle}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
