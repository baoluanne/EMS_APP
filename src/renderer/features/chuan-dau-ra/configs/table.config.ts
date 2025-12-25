import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const ChuanDauRaColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'coSoDaoTao',
    headerName: 'Cơ sở',
    width: 100,
    valueGetter: (params: any) => params?.tenCoSo,
  },
  {
    field: 'khoaHoc',
    headerName: 'Khóa học',
    width: 100,
    valueGetter: (params: any) => params?.tenKhoaHoc,
  },
  {
    field: 'bacDaoTao',
    headerName: 'Bậc đào tạo',
    width: 120,
    valueGetter: (params: any) => params?.tenBacDaoTao,
  },
  {
    field: 'loaiDaoTao',
    headerName: 'Loại đào tạo',
    width: 150,
    valueGetter: (params: any) => params?.tenLoaiDaoTao,
  },
  {
    field: 'loaiChungChi',
    headerName: 'Loại chứng chỉ',
    width: 180,
    valueGetter: (params: any) => params?.tenLoaiChungChi,
  },
  {
    field: 'chungChi',
    headerName: 'Chứng chỉ',
    width: 180,
    valueGetter: (params: any) => params?.tenLoaiChungChi,
  },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 1, minWidth: 120 },
]);
