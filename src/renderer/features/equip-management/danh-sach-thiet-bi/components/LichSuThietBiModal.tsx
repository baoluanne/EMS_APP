import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { DataGridTable } from '@renderer/components/Table';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { format } from 'date-fns';
import { GridColDef } from '@mui/x-data-grid';

interface Props {
  deviceId: string | null;
  onClose: () => void;
}

const historyColumns: GridColDef[] = [
  {
    field: 'tenThietBi',
    headerName: 'Tên thiết bị',
    width: 200,
    valueGetter: (_, row: any) => row.thietBi?.tenThietBi || '---',
  },
  {
    field: 'maThietBi',
    headerName: 'Mã thiết bị',
    width: 140,
    valueGetter: (_, row: any) => row.thietBi?.maThietBi || '---',
  },
  {
    field: 'ngayTao',
    headerName: 'Thời gian',
    width: 150,
    align: 'center', // Căn giữa nội dung theo chiều ngang
    headerAlign: 'center', // Căn giữa tiêu đề (header)
    valueFormatter: (value: any) => {
      if (!value) return '---';
      return format(new Date(value as string), 'dd/MM/yyyy HH:mm');
    },
    renderCell: (p) => (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="body2">{p.formattedValue}</Typography>
      </Box>
    ),
  },
  {
    field: 'loaiSuKien',
    headerName: 'Sự kiện',
    width: 200,
    align: 'center', // Căn giữa mảng sự kiện cho đẹp
    headerAlign: 'center', // Căn giữa header
    valueFormatter: (value: any) => {
      const eventMap: Record<number, string> = {
        0: 'Tạo mới',
        1: 'Phân phòng',
        2: 'Điều chuyển',
        3: 'Bảo trì',
        4: 'Mượn/Trả',
        5: 'Kiểm kê',
        6: 'Thanh lý',
      };
      return eventMap[value as number] || 'Khác';
    },
    renderCell: (p) => {
      const colorMap: Record<string, any> = {
        'Tạo mới': 'primary',
        'Phân phòng': 'success',
        'Điều chuyển': 'info',
        'Bảo trì': 'warning',
        'Mượn/Trả': 'secondary',
        'Kiểm kê': 'default',
        'Thanh lý': 'error',
        Khác: 'default',
      };

      return (
        <Chip
          label={p.formattedValue}
          color={colorMap[p.formattedValue] || 'default'}
          sx={{
            fontWeight: 700,
            borderRadius: 1.5, // Bo góc vuông vắn (modern) thay vì bo tròn hoàn toàn
            minWidth: 80, // Ép độ rộng tối thiểu, KHÔNG BAO GIỜ bị cắt chữ thành dấu "..."
            height: 28, // Tăng chiều cao lên 1 chút cho thoáng
            '& .MuiChip-label': {
              display: 'block',
              overflow: 'visible', // Vô hiệu hóa tính năng cắt chữ của MUI
              px: 1.5,
              fontSize: '0.75rem',
            },
          }}
        />
      );
    },
  },
  {
    field: 'tuViTri',
    headerName: 'Từ vị trí',
    width: 180,
  },
  {
    field: 'denViTri',
    headerName: 'Đến vị trí',
    width: 180,
  },
  {
    field: 'noiDung',
    headerName: 'Nội dung chi tiết',
    flex: 1,
    minWidth: 250,
  },
];
export const LichSuThietBiModal = ({ deviceId, onClose }: Props) => {
  const { data, isRefetching } = useCrudPagination<any>({
    entity: 'LichSuThietBi',
    endpoint: `pagination?ThietBiId=${deviceId || ''}`,
    enabled: !!deviceId,
  });

  const rows = data?.result || [];

  const handleExportExcel = () => {
    exportPaginationToExcel({
      entity: 'LichSuThietBi',
      filteredData: rows,
      columns: historyColumns,
      options: { dataOption: 'all', columnOption: 'all' },
      columnVisibilityModel: {},
      fileName: `Lich_su_thiet_bi_${deviceId}`,
    });
  };

  return (
    <Dialog open={!!deviceId} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          bgcolor: '#1976d2',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Lịch sử hoạt động thiết bị
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Xuất Excel">
            <span>
              <IconButton
                onClick={handleExportExcel}
                disabled={rows.length === 0 || isRefetching}
                sx={{
                  color: '#fff',
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                <FileDownloadIcon />
              </IconButton>
            </span>
          </Tooltip>
          <IconButton aria-label="close" onClick={onClose} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ height: 500, p: 0, bgcolor: '#f8fafc' }}>
        {isRefetching ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          >
            <CircularProgress />
          </Box>
        ) : rows.length === 0 ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          >
            <Typography color="text.secondary" fontWeight={500}>
              Chưa có dữ liệu lịch sử
            </Typography>
          </Box>
        ) : (
          <DataGridTable
            columns={historyColumns}
            rows={rows}
            getRowId={(r) => r.id!}
            hideFooter
            disableRowSelectionOnClick
            height="100%"
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: '#fff',
              },
            }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: '#fff' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};
