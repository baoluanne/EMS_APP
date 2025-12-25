import { GridColDef } from '@mui/x-data-grid';
import { ChuongTrinhKhungTinChi } from '@renderer/features/chuong-trinh-khung-tin-chi/validation';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import {
  BacDaoTao,
  ChuyenNganh,
  CoSoTaoDao,
  KhoaHoc,
  LoaiDaoTao,
  NganhHoc,
} from '@renderer/shared/types';

export const quanLyChuongTrinhKhungTinChiColumns: GridColDef<ChuongTrinhKhungTinChi>[] =
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
      minWidth: 150,
      flex: 1,
      sortable: true,
      valueGetter: (bacDaoTao: BacDaoTao) => bacDaoTao?.tenBacDaoTao || '',
    },
    {
      field: 'loaiDaoTao',
      headerName: 'Loại đào tạo',
      minWidth: 150,
      flex: 1,
      sortable: true,
      valueGetter: (loaiDaoTao: LoaiDaoTao) => loaiDaoTao?.tenLoaiDaoTao || '',
    },
    {
      field: 'khoaHoc',
      headerName: 'Khóa học',
      minWidth: 120,
      flex: 1,
      sortable: true,
      valueGetter: (khoaHoc: KhoaHoc) => khoaHoc?.tenKhoaHoc || '',
    },
    {
      field: 'nganhHoc',
      headerName: 'Ngành',
      minWidth: 150,
      flex: 1,
      sortable: true,
      valueGetter: (nganhHoc: NganhHoc) => nganhHoc?.tenNganhHoc || '',
    },
    {
      field: 'chuyenNganh',
      headerName: 'Chuyên ngành',
      minWidth: 150,
      flex: 1,
      sortable: true,
      valueGetter: (chuyenNganh: ChuyenNganh) => chuyenNganh?.tenChuyenNganh || '',
    },
    {
      field: 'isBlock',
      headerName: 'Đã khóa',
      minWidth: 100,
      flex: 1,
      sortable: true,
      type: 'boolean',
    },
    {
      field: 'ghiChu',
      headerName: 'Ghi chú',
      minWidth: 200,
      flex: 1,
      sortable: true,
    },
    {
      field: 'ghiChuTiengAnh',
      headerName: 'Ghi chú (Tiếng Anh)',
      minWidth: 200,
      flex: 1,
      sortable: true,
    },
  ]);
