import { GridColDef } from '@mui/x-data-grid';

export const nhaCungCapColumns: GridColDef[] = [
  {
    field: 'tenNhaCungCap',
    headerName: 'Tên nhà cung cấp',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'dienThoai',
    headerName: 'Điện thoại',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 180,
    flex: 1,
  },
  {
    field: 'diaChi',
    headerName: 'Địa chỉ',
    minWidth: 250,
    flex: 1,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 200,
    flex: 1,
  },
];
