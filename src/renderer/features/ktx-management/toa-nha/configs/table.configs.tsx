import { GridColDef } from '@mui/x-data-grid';
import { getLoaiToaNhaLabel } from '../LoaiToaNhaEnums';

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
    renderCell: (params) => getLoaiToaNhaLabel(params.value),
  },
  {
    field: 'soTang',
    headerName: 'Số tầng',
    minWidth: 100,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi Chú',
    minWidth: 100,
  },
];
