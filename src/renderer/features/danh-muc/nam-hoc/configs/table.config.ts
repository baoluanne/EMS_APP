import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { format } from 'date-fns';

export const namHocColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'namHocValue',
    headerName: 'Năm Học',
    flex: 1,
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nienHoc',
    headerName: 'Niên Học',
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
  {
    field: 'tuNgay',
    headerName: 'Từ Ngày',
    width: 150,
    type: 'string',
    valueGetter: (value: Date) => format(value, 'dd/MM/yyyy'),
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'denNgay',
    headerName: 'Đến Ngày',
    width: 150,
    type: 'string',
    valueGetter: (value: Date) => format(value, 'dd/MM/yyyy'),
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenTiengAnh',
    headerName: 'Tên Tiếng Anh',
    flex: 1,
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
]);
