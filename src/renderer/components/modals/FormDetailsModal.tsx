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
  fontFamily?: string;
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
  fontFamily,
}: Props) => {
  const coloredTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
    fontSize: '1.25rem',
    backgroundColor: 'primary.main',
    color: 'white',
    py: 2,
    px: 3,
    position: 'relative',
  };

  const basicTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
    fontSize: '1.25rem',
    backgroundColor: '#4285f4',
    color: '#fff',
    borderBottom: '2px solid #e9ecef',
    py: 2,
    px: 3,
    position: 'relative',
    fontfamily: 'Momo Trust Sans',
  };

  return (
    <Dialog
      open={true}
      onClose={() => {}}
      disableEscapeKeyDown
      maxWidth={fullScreenMode ? false : maxWidth}
      fullWidth
      slotProps={{
        paper: {
          sx: fullScreenMode
            ? {
                width: '100%',
                height: 'calc(100% - 42px)',
                margin: 0,
                borderRadius: 0,
                pointerEvents: 'auto',
              }
            : { borderRadius: 0, pointerEvents: 'auto' },
        },
      }}
    >
      <DialogTitle sx={titleMode === TITLE_MODE.COLORED ? coloredTitleStyle : basicTitleStyle}>
        <span className="">{title}</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            color: titleMode === TITLE_MODE.COLORED ? 'white' : 'text.secondary',
            '&:hover': {
              backgroundColor:
                titleMode === TITLE_MODE.COLORED
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <div className="text-white">
            <Close />
          </div>
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '24px !important',
          backgroundColor: '#ffffff',
          fontFamily: fontFamily || 'inherit',
          '& *': {
            fontFamily: fontFamily ? `${fontFamily} !important` : 'inherit',
          },
        }}
      >
        {children}
      </DialogContent>

      {onSave && onClose && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #e9ecef',
            gap: 1,
          }}
        >
          <Button onClick={onClose} color="inherit">
            {cancelTitle}
          </Button>
          <Button onClick={onSave} variant="contained" disabled={isRefetching}>
            {saveTitle}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
