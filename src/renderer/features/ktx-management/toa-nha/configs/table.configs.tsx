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
];
