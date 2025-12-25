import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const khoiKienThucColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maKhoiKienThuc',
    headerName: 'Mã khối kiến thức',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenKhoiKienThuc',
    headerName: 'Tên khối kiến thức',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'stt',
    headerName: 'Số thứ tự',
    flex: 1,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
]);
