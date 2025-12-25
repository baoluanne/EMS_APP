import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { DonViTinhOptions } from '@renderer/shared/enums/donViTinh.enum';
import { formatVND } from '@renderer/shared/utils/format';

export const danhMucKhoanThuNgoaiHocPhiColumns: GridColDef[] = generateTableConfigs([
  { field: 'maKhoanThu', headerName: 'Mã Khoản Thu', minWidth: 160, flex: 1, type: 'string' },
  { field: 'tenKhoanThu', headerName: 'Tên Khoản Thu', minWidth: 220, flex: 1, type: 'string' },
  {
    field: 'loaiKhoanThu',
    headerName: 'Loại Khoản Thu',
    minWidth: 220,
    flex: 1,
    type: 'string',
    valueGetter: (value: any) => value?.tenLoaiKhoanThu,
  },
  {
    field: 'soTien',
    headerName: 'Số Tiền',
    width: 160,
    type: 'number',
    valueGetter: (value) => formatVND(value as number),
  },
  {
    field: 'donViTinh',
    headerName: 'Đơn Vị Tính',
    width: 140,
    type: 'string',
    valueGetter: (value) => (typeof value === 'number' ? DonViTinhOptions[value].label : value),
  },
  {
    field: 'thueVAT',
    headerName: 'Thuế VAT',
    width: 120,
    type: 'number',
    valueGetter: (value) => (typeof value === 'number' ? `${value}%` : ''),
  },
  { field: 'gomThueVAT', headerName: 'Gồm VAT', width: 120, type: 'boolean' },
  { field: 'ghiChu', headerName: 'Ghi Chú', minWidth: 220, flex: 1, type: 'string' },
  { field: 'stt', headerName: 'STT', minWidth: 100, flex: 1, type: 'string' },
]);
