import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { format } from 'date-fns';
import { CongNoSinhVien } from '../type';

const formatCurrency = (value: number | null | undefined): string => {
  if (!value) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(value);
};

export const columns: GridColDef<CongNoSinhVien>[] = generateTableConfigs([
  {
    field: 'maSinhVien', // Khớp chính xác tên biến trong DTO (camelCase)
    headerName: 'Mã SV',
    width: 120,
  },
  {
    field: 'hoTen',
    headerName: 'Họ tên',
    flex: 1,
    minWidth: 250,
  },
  {
    field: 'tenHocKy',
    headerName: 'Học kỳ',
    width: 200,
  },
  {
    field: 'daThu',
    headerName: 'Đã thu',
    width: 150,
    type: 'number',
    renderCell: (params) => formatCurrency(params.value),
  },
  {
    field: 'tongMienGiam',
    headerName: 'Miễn giảm',
    width: 150,
    type: 'number',
    renderCell: (params) => formatCurrency(params.value),
  },
  {
    field: 'conNo',
    headerName: 'Còn nợ',
    width: 150,
    type: 'number',
    renderCell: (params) => (
      <span style={{ color: params.value > 0 ? 'red' : 'green', fontWeight: 600 }}>
        {formatCurrency(params.value)}
      </span>
    ),
  },
  {
    field: 'hanNop',
    headerName: 'Hạn nộp',
    width: 150,
    valueGetter: (val) => (val ? format(new Date(val), 'dd/MM/yyyy') : ''),
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    flex: 1,
    minWidth: 200,
  },
]);
