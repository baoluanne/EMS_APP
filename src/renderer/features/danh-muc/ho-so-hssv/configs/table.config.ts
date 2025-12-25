import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const danhMucHoSoHssvColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maHoSo',
    headerName: 'Mã hồ sơ',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenHoSo',
    headerName: 'Tên hồ sơ',
    flex: 2,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'stt',
    headerName: 'Số thứ tự',
    flex: 1,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',
    type: 'number',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    flex: 1.5,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
]);
