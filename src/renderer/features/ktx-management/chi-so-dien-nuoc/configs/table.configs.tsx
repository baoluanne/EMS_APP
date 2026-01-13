import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

export const columns: GridColDef[] = [
  {
    field: 'thangNam', // Khớp chính xác với key trong JSON của bạn
    headerName: 'Tháng/Năm',
    width: 140,
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'tenToaNha', headerName: 'Tòa nhà', minWidth: 160, flex: 1 },
  { field: 'maPhong', headerName: 'Mã phòng', width: 110, align: 'center' },
  { field: 'dienCu', headerName: 'Điện cũ', width: 100, align: 'center' },
  { field: 'dienMoi', headerName: 'Điện mới', width: 100, align: 'center' },
  {
    field: 'tieuThuDien',
    headerName: 'Tiêu thụ điện',
    width: 130,
    align: 'center',
    renderCell: (params) => <strong>{params.value} kWh</strong>,
  },
  { field: 'nuocCu', headerName: 'Nước cũ', width: 100, align: 'center' },
  { field: 'nuocMoi', headerName: 'Nước mới', width: 100, align: 'center' },
  {
    field: 'tieuThuNuoc',
    headerName: 'Tiêu thụ nước',
    width: 130,
    align: 'center',
    renderCell: (params) => <strong>{params.value} m³</strong>,
  },
  {
    field: 'daChot',
    headerName: 'Trạng thái',
    width: 120,
    align: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Đã chốt' : 'Chưa chốt'}
        color={params.value ? 'success' : 'warning'}
        size="small"
      />
    ),
  },
];
