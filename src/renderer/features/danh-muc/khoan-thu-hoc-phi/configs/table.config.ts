import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const danhMucKhoanThuHocPhiColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maKhoanThu',
    headerName: 'Mã Khoản Thu',
    minWidth: 160,
    flex: 1,
    type: 'string',
  },
  {
    field: 'tenKhoanThu',
    headerName: 'Tên Khoản Thu',
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
    field: 'capSoHoaDonDienTu',
    headerName: 'Cấp Số HĐ Điện Tử',
    width: 180,
    type: 'boolean',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi Chú',
    minWidth: 220,
    flex: 1,
    type: 'string',
  },
]);
