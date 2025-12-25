// src/renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-sinh-vien-nhan-mien-giam/configs/table.config.tsx
import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { format } from 'date-fns';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v || 0);

export const columns: GridColDef[] = generateTableConfigs([
  {
    field: 'sinhVien',
    headerName: 'Mã SV',
    width: 120,
    valueGetter: (_, r) => r.sinhVien?.maSinhVien || '',
  },
  {
    field: 'hoTen',
    headerName: 'Họ tên',
    flex: 1,
    minWidth: 180,
    valueGetter: (_, r) => `${r.sinhVien?.hoDem || ''} ${r.sinhVien?.ten || ''}`.trim(),
  },
  {
    field: 'hocKy',
    headerName: 'Học kỳ',
    width: 140,
    valueGetter: (_, r) => r.namHocHocKy?.tenDot || '',
  },
  {
    field: 'soTien',
    headerName: 'Số tiền',
    width: 150,
    renderCell: (p) => formatCurrency(p.value as number),
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 130,
    renderCell: (p) => {
      const color = p.value === 'DaDuyet' ? 'green' : p.value === 'TuChoi' ? 'red' : 'orange';
      const label =
        p.value === 'DaDuyet' ? 'Đã duyệt' : p.value === 'TuChoi' ? 'Từ chối' : 'Chờ duyệt';
      return <span style={{ color, fontWeight: 600 }}>{label}</span>;
    },
  },
  {
    field: 'ngayTao',
    headerName: 'Ngày đăng ký',
    width: 140,
    valueGetter: (v) => (v ? format(new Date(v), 'dd/MM/yyyy') : ''),
  },
]);
