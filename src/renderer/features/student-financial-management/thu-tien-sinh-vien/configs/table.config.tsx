import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { format } from 'date-fns';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v || 0);

export const columns: GridColDef[] = generateTableConfigs([
  { field: 'soPhieu', headerName: 'Số phiếu', width: 150 },
  {
    field: 'maSinhVien',
    headerName: 'Mã SV',
    width: 120,
    valueGetter: (value, row) => row.maSinhVien || value || '',
  },
  {
    field: 'hoTen',
    headerName: 'Họ tên',
    flex: 1,
    minWidth: 180,
    valueGetter: (value, row) => row.hoTen || value || '',
  },
  {
    field: 'soTienThu',
    headerName: 'Số tiền',
    width: 150,
    renderCell: (p) => formatCurrency(p.value as number),
  },
  {
    field: 'hinhThucThanhToan',
    headerName: 'Hình thức',
    width: 150,
    valueGetter: (v) => v || 'N/A',
  },
  {
    field: 'ngayThu',
    headerName: 'Ngày thu',
    width: 120,
    valueGetter: (v) => (v ? format(new Date(v), 'dd/MM/yyyy') : ''),
  },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 1 },
]);
