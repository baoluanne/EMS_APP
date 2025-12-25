import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { DiaDiemPhong } from '@renderer/shared/types';

export const dayNhaColumns: GridColDef[] = generateTableConfigs([
  { field: 'maDayNha', headerName: 'Dãy nhà', flex: 1, minWidth: 150 },
  { field: 'tenDayNha', headerName: 'Tên dãy nhà', flex: 1, minWidth: 200 },
  {
    field: 'diaDiemPhong',
    headerName: 'Nhóm địa điểm phòng',
    flex: 1,
    minWidth: 200,
    valueGetter: (value: DiaDiemPhong) => value?.tenNhomDDPhong,
  },
  { field: 'soTang', headerName: 'Số tầng', flex: 1, minWidth: 80 },
  { field: 'soPhong', headerName: 'Số phòng', flex: 1, minWidth: 80 },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 1, minWidth: 80 },
]);
