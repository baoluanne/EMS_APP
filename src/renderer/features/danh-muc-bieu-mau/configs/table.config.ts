import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { LoaiFileOptions } from '@renderer/shared/types';

export const danhMucBieuMauColumns: GridColDef[] = generateTableConfigs([
  { field: 'maBieuMau', headerName: 'Mã biểu mẫu', flex: 1, minWidth: 150 },
  { field: 'tenBieuMau', headerName: 'Tên biểu mẫu', flex: 2, minWidth: 200 },
  {
    field: 'khoaQuanLy',
    headerName: 'Khoa quản lý',
    flex: 2,
    minWidth: 150,
    valueGetter: (value: { tenKhoa: string }) => value?.tenKhoa || '',
  },
  {
    field: 'loaiFile',
    headerName: 'Loại file',
    flex: 1,
    minWidth: 150,
    valueGetter: (value) => {
      const option = LoaiFileOptions.find((opt) => opt.value === value);
      return option ? option.label : value;
    },
  },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 2, minWidth: 150 },
]);
