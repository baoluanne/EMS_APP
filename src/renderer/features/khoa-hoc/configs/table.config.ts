import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const khoaHocColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'tenKhoaHoc',
    headerName: 'Tên Khóa Học',
    flex: 1,
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nam',
    headerName: 'Năm',
    width: 120,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'cachViet',
    headerName: 'Cách Viết',
    flex: 1,
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi Chú',
    flex: 1,
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'isVisible',
    headerName: 'Hiển Thị',
    width: 120,
    type: 'boolean',
    align: 'center',
    headerAlign: 'center',
  },
]);
