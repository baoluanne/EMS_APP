import { GridColDef } from '@mui/x-data-grid';
import { PhieuBaoTri } from './validation';
import { format } from 'date-fns';
import { Chip, Box, Typography } from '@mui/material';

export const phieuBaoTriColumns = (): GridColDef<PhieuBaoTri>[] => [
  {
    field: 'maPhieu',
    headerName: 'Mã phiếu',
    width: 130
  },
  {
    field: 'chiTietThietBis',
    headerName: 'Thiết bị',
    flex: 1,
    minWidth: 220,
    renderCell: (params: any) => {
      // Dùng optional chaining (?.) để đảm bảo an toàn nếu row chưa có data
      const chiTiets: any[] = params?.row?.chiTietThietBis || [];

      if (chiTiets.length === 0) {
        return <Typography variant="body2" color="text.secondary">N/A</Typography>;
      }

      const first = chiTiets[0]?.thietBi;
      const label = first ? `${first.maThietBi} - ${first.tenThietBi}` : 'N/A';

      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" fontWeight={600}>
            {label}
          </Typography>
          {chiTiets.length > 1 && (
            <Chip
              label={`+${chiTiets.length - 1}`}
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }}
            />
          )}
        </Box>
      );
    },
  },
  {
    field: 'ngayBatDau',
    headerName: 'Ngày bắt đầu',
    width: 130,
    valueFormatter: (valueOrParams: any) => {
      // Hỗ trợ cả DataGrid v6 (truyền params) và v7 (truyền value)
      const dateVal = valueOrParams?.value !== undefined ? valueOrParams.value : valueOrParams;
      return dateVal ? format(new Date(dateVal), 'dd/MM/yyyy') : '';
    },
  },
  {
    field: 'ngayKetThuc',
    headerName: 'Ngày kết thúc',
    width: 130,
    valueFormatter: (valueOrParams: any) => {
      // Đã fix lỗi Cannot read properties of null
      const dateVal = valueOrParams?.value !== undefined ? valueOrParams.value : valueOrParams;
      return dateVal ? format(new Date(dateVal), 'dd/MM/yyyy') : '';
    },
  },
  {
    field: 'chiPhi',
    headerName: 'Chi phí',
    width: 130,
    renderCell: (params: any) => {
      const cost = params?.value || 0;
      return (
        <Typography variant="body2" fontWeight={600} color="success.main">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cost)}
        </Typography>
      );
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 140,
    renderCell: (params: any) => {
      const statusVal = params?.value;
      const statusMap: Record<number, { label: string; color: any }> = {
        0: { label: 'Chờ xử lý', color: 'info' },
        1: { label: 'Đang bảo trì', color: 'warning' },
        2: { label: 'Hoàn thành', color: 'success' },
        3: { label: 'Đã hủy', color: 'error' },
      };

      const status = statusVal != null && statusMap[statusVal]
        ? statusMap[statusVal]
        : { label: 'N/A', color: 'default' };

      return <Chip label={status.label} color={status.color} size="small" />;
    },
  },
];