import { Edit, Search } from '@mui/icons-material';
import { Box, Button, Divider } from '@mui/material';
import { ActionsToolbarProps, ExportExcel, ImportExcel } from '@renderer/components/toolbars';

interface CapNhatTrangThaiSinhVienToolbarProps extends ActionsToolbarProps {
  onSearch?: () => void;
}

export const CapNhatTrangThaiSinhVienToolbar = ({
  selectedRowIds,
  onSearch,
  onEdit,
  onExport,
  onImport,
}: CapNhatTrangThaiSinhVienToolbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        p: 1,
      }}
    >
      {!!onSearch && (
        <Button variant="text" size="small" startIcon={<Search />} onClick={() => onSearch?.()}>
          Tìm kiếm nâng cao
        </Button>
      )}

      {onSearch && (onExport || onImport || onEdit) && (
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      )}
      {!!onExport && <ExportExcel onClickExport={onExport} />}
      {!!onEdit && (
        <Button
          size="small"
          startIcon={<Edit />}
          sx={{ color: '#FFB900' }}
          disabled={!selectedRowIds?.ids.size}
          onClick={onEdit}
        >
          Cập nhật trạng thái sinh viên
        </Button>
      )}
      {!!onImport && <ImportExcel {...onImport} />}
    </Box>
  );
};
