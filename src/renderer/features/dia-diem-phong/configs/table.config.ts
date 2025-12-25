import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { CoSoTaoDao, DiaDiemPhong } from '@renderer/shared/types';

export const diaDiemPhongColumns: GridColDef<DiaDiemPhong>[] = generateTableConfigs([
  { field: 'maDDPhong', headerName: 'Mã nhóm ĐĐ phòng', flex: 1, minWidth: 150 },
  { field: 'tenNhomDDPhong', headerName: 'Tên nhóm địa điểm phòng', flex: 1, minWidth: 200 },
  { field: 'diaChi', headerName: 'Địa chỉ', flex: 1, minWidth: 80 },
  {
    field: 'coSoDaoTao',
    headerName: 'Cơ sở',
    flex: 1,
    minWidth: 80,
    valueGetter: (value: CoSoTaoDao) => value.tenCoSo,
  },
  { field: 'diaDiem', headerName: 'Địa điểm', flex: 1, minWidth: 80 },
  { field: 'banKinh', headerName: 'Bán kính (km)', flex: 1, minWidth: 80 },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 1, minWidth: 80 },
]);
