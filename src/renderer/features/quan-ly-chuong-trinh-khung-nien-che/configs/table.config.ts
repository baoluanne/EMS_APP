import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import {
  BacDaoTao,
  ChuongTrinhKhungNienChe,
  CoSoTaoDao,
  KhoaHoc,
  LoaiDaoTao,
  NganhHoc,
} from '@renderer/shared/types';

export const quanLyChuongTrinhKhungNienCheColumns: GridColDef<ChuongTrinhKhungNienChe>[] =
  generateTableConfigs([
    {
      field: 'coSoDaoTao',
      headerName: 'Cơ sở',
      minWidth: 120,
      flex: 1,
      sortable: true,
      valueGetter: (coSoDaoTao: CoSoTaoDao) => coSoDaoTao?.tenCoSo || '',
    },
    {
      field: 'bacDaoTao',
      headerName: 'Bậc đào tạo',
      minWidth: 120,
      flex: 1,
      sortable: true,
      valueGetter: (bacDaoTao: BacDaoTao) => bacDaoTao?.tenBacDaoTao || '',
    },
    {
      field: 'loaiDaoTao',
      headerName: 'Loại đào tạo',
      minWidth: 120,
      flex: 1,
      sortable: true,
      valueGetter: (loaiDaoTao: LoaiDaoTao) => loaiDaoTao?.tenLoaiDaoTao || '',
    },
    {
      field: 'khoaHoc',
      headerName: 'Khóa học',
      minWidth: 150,
      flex: 1,
      sortable: true,
      valueGetter: (khoaHoc: KhoaHoc) => khoaHoc?.tenKhoaHoc || '',
    },
    {
      field: 'nganhHoc',
      headerName: 'Ngành',
      minWidth: 120,
      flex: 1,
      sortable: true,
      valueGetter: (nganhHoc: NganhHoc) => nganhHoc?.tenNganhHoc || '',
    },
    {
      field: 'isBlock',
      headerName: 'Đã khóa',
      minWidth: 150,
      flex: 1,
      sortable: true,
      type: 'boolean',
    },
    {
      field: 'ghiChuTiengAnh',
      headerName: 'Ghi chú tiếng Anh',
      minWidth: 150,
      flex: 1,
      sortable: true,
    },
    {
      field: 'ghiChu',
      headerName: 'Ghi chú',
      minWidth: 150,
      flex: 1,
      sortable: true,
    },
  ]);
