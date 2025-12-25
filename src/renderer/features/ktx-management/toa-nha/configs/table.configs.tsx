import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const toaNhaColumns: GridColDef[] = generateTableConfigs([
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
  },
]);
