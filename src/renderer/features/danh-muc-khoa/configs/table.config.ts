import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const columns: GridColDef[] = generateTableConfigs([
  {
    field: 'maKhoa',
    headerName: 'Mã Khoa',
    width: 150,
    type: 'string',
  },
  {
    field: 'tenKhoa',
    headerName: 'Tên Khoa',
    flex: 1,
    minWidth: 200,
    type: 'string',
  },
]);
