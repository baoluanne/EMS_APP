import { Box, Button, SxProps } from '@mui/material';
import {
  IconCopy,
  IconDownload,
  IconPencil,
  IconPlus,
  IconPrinter,
  IconTrash,
} from '@tabler/icons-react';
import { FC } from 'react';

export interface BasicToolbarActionsProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onExport?: () => void;
  sx?: SxProps;
}

export const BasicToolbarActions: FC<BasicToolbarActionsProps> = ({
  onAdd = () => {},
  onEdit = () => {},
  onCopy = () => {},
  onDelete = () => {},
  onPrint = () => {},
  onExport = () => {},
  sx,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gap={1}
      borderTop="1px solid #0000001F"
      borderBottom="1px solid #0000001F"
      py={1}
      sx={sx}
    >
      <Button color="inherit" startIcon={<IconPlus size={20} />} onClick={onAdd}>
        Thêm mới
      </Button>
      <Button color="inherit" startIcon={<IconCopy size={20} />} onClick={onCopy}>
        Sao chép
      </Button>
      <Button color="inherit" startIcon={<IconPencil size={20} />} onClick={onEdit}>
        Sửa
      </Button>
      <Button color="inherit" startIcon={<IconTrash size={20} />} onClick={onDelete}>
        Xóa
      </Button>

      <Box flexGrow={1} />

      <Button
        variant="contained"
        sx={{ backgroundColor: '#0000001F', color: '#000000' }}
        startIcon={<IconPrinter size={20} />}
        onClick={onPrint}
        size="small"
      >
        In
      </Button>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#E9EAF5', color: '#25359D' }}
        startIcon={<IconDownload size={20} color="#25359D" />}
        onClick={onExport}
        size="small"
      >
        Xuất Excel
      </Button>
    </Box>
  );
};
