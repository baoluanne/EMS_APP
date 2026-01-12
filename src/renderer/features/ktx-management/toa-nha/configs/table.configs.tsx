import { GridColDef } from '@mui/x-data-grid';

export const toaNhaColumns: GridColDef[] = [
  {
    field: 'tenToaNha',
    headerName: 'Tên tòa nhà',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'loaiToaNha',
    headerName: 'Loại tòa nhà',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'soPhong',
    headerName: 'Số lượng phòng',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value) => value || 0,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 200,
    flex: 1,
  },
];
