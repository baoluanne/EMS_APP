import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { TRANG_THAI_HO_SO_MAP } from '@renderer/shared/constants';

export const danhSachHoSoSVColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maHoSo',
    headerName: 'Mã hồ sơ',
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.hoSoSV?.maHoSo ?? '',
  },
  {
    field: 'tenHoSo',
    headerName: 'Tên hồ sơ',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.hoSoSV?.tenHoSo ?? '',
  },
  {
    field: 'trangThai',
    headerName: 'Đã nhận',
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const valueString = row.trangThai?.toString();
      return TRANG_THAI_HO_SO_MAP[valueString] || '';
    },
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    align: 'center',
    headerAlign: 'center',
  },
]);
