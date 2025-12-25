import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const danhMucNoiDungColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'loaiNoiDung',
    headerName: 'Loại nội dung',
    flex: 2,
    minWidth: 300,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'noiDung',
    headerName: 'Nội dung',
    flex: 2,
    minWidth: 300,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'isVisible',
    headerName: 'Hiển thị',
    flex: 0.5,
    minWidth: 50,
    align: 'center',
    headerAlign: 'center',
    type: 'boolean',
  },
]);
