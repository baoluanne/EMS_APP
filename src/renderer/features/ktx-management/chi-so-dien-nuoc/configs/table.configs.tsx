import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

const statusChip = (daChot: boolean) => (
  <Chip
    label={daChot ? 'Đã chốt' : 'Chưa chốt'}
    color={daChot ? 'success' : 'warning'}
    size="small"
  />
);

export const columns: GridColDef[] = [
  {
    field: 'thangNam',
    headerName: 'Tháng/Năm',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'tenToaNha', headerName: 'Tòa nhà', minWidth: 160, flex: 1 },
  { field: 'maPhong', headerName: 'Mã phòng', minWidth: 120, align: 'center' },
  { field: 'dienCu', headerName: 'Điện cũ', width: 110, align: 'center' },
  { field: 'dienMoi', headerName: 'Điện mới', width: 110, align: 'center' },
  {
    field: 'tieuThuDien',
    headerName: 'Tiêu thụ điện (kWh)',
    width: 160,
    align: 'center',
    type: 'number',
  },
  { field: 'nuocCu', headerName: 'Nước cũ', width: 110, align: 'center' },
  { field: 'nuocMoi', headerName: 'Nước mới', width: 110, align: 'center' },
  {
    field: 'tieuThuNuoc',
    headerName: 'Tiêu thụ nước (m³)',
    width: 160,
    align: 'center',
    type: 'number',
  },
  {
    field: 'daChot',
    headerName: 'Trạng thái',
    width: 130,
    align: 'center',
    renderCell: (params) => statusChip(params.value),
  },
];
