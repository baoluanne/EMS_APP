// src/renderer/features/student-financial-management/quan-ly-cong-no/hoan-tien-sinh-vien/configs/table.config.tsx
import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { format } from 'date-fns';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v || 0);

export const columns: GridColDef[] = generateTableConfigs([
  { field: 'soPhieu', headerName: 'Số phiếu', width: 150 },
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
    field: 'soTien',
    headerName: 'Số tiền',
    width: 150,
    renderCell: (p) => formatCurrency(p.value as number),
  },
  { field: 'lyDoChi', headerName: 'Lý do', flex: 1 },
  { field: 'hinhThucChi', headerName: 'Hình thức', width: 150 },
  {
    field: 'ngayChi',
    headerName: 'Ngày chi',
    width: 120,
    valueGetter: (v) => (v ? format(new Date(v), 'dd/MM/yyyy') : ''),
  },
]);
