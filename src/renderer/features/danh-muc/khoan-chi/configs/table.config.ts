import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const danhMucKhoanChiColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maKhoanChi',
    headerName: 'Mã Khoản Chi',
    minWidth: 160,
    flex: 1,
    type: 'string',
  },
  {
    field: 'tenKhoanChi',
    headerName: 'Tên Khoản Chi',
    minWidth: 220,
    flex: 1,
    type: 'string',
  },
  {
    field: 'stt',
    headerName: 'STT',
    width: 100,
    type: 'number',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi Chú',
    minWidth: 220,
    flex: 1,
    type: 'string',
  },
]);
