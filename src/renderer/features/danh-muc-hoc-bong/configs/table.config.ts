import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const DanhMucHocBongColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maDanhMuc',
    headerName: 'Mã học bổng',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenDanhMuc',
    headerName: 'Tên học bổng',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'stt',
    headerName: 'Số thứ tự',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
]);
