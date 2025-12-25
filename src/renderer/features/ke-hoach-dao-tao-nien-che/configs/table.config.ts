import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const keHoachDaoTaoNienCheColumns = generateTableConfigs([
  {
    field: 'khoaHoc',
    headerName: 'Khóa học',
    minWidth: 120,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row.chiTietChuongTrinhKhung_NienChe?.chuongTrinhKhungNienChe?.khoaHoc?.tenKhoaHoc || '',
  },
  {
    field: 'bacDaoTao',
    headerName: 'Bậc đào tạo',
    minWidth: 140,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row.chiTietChuongTrinhKhung_NienChe?.chuongTrinhKhungNienChe?.bacDaoTao?.tenBacDaoTao || '',
  },
  {
    field: 'loaiDaoTao',
    headerName: 'Loại đào tạo',
    minWidth: 140,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row.chiTietChuongTrinhKhung_NienChe?.chuongTrinhKhungNienChe?.loaiDaoTao?.tenLoaiDaoTao || '',
  },
  {
    field: 'nganh',
    headerName: 'Ngành',
    minWidth: 160,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row.chiTietChuongTrinhKhung_NienChe?.chuongTrinhKhungNienChe?.nganhHoc?.tenNganhHoc || '',
  },
  {
    field: 'hocKy',
    headerName: 'Học kỳ',
    minWidth: 100,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row.chiTietChuongTrinhKhung_NienChe?.hocKy || '',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 150,
    flex: 1,
    sortable: true,
  },
]);

export const danhSachNganhHocColumns = generateTableConfigs([
  {
    field: 'coSo',
    headerName: 'Cơ sở',
    minWidth: 120,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.coSoDaoTao?.tenCoSo,
  },
  {
    field: 'khoaHoc',
    headerName: 'Khóa học',
    minWidth: 120,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.khoaHoc?.tenKhoaHoc,
  },
  {
    field: 'bacDaoTao',
    headerName: 'Bậc đào tạo',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.bacDaoTao?.tenBacDaoTao,
  },
  {
    field: 'loaiDaoTao',
    headerName: 'Loại đào tạo',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.loaiDaoTao?.tenLoaiDaoTao,
  },
  {
    field: 'nganh',
    headerName: 'Ngành',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.nganhHoc?.tenNganhHoc,
  },
  { field: 'hocKy', headerName: 'Học kỳ', minWidth: 120, flex: 1, sortable: true },
]);

export const taoKeHoachDaoTaoColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'coSo',
    headerName: 'Cơ sở',
    minWidth: 120,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.coSoDaoTao?.tenCoSo,
  },
  {
    field: 'khoaHoc',
    headerName: 'Khóa học',
    minWidth: 120,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.khoaHoc?.tenKhoaHoc,
  },
  {
    field: 'bacDaoTao',
    headerName: 'Bậc đào tạo',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.bacDaoTao?.tenBacDaoTao,
  },
  {
    field: 'loaiDaoTao',
    headerName: 'Loại đào tạo',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.loaiDaoTao?.tenLoaiDaoTao,
  },
  {
    field: 'nganh',
    headerName: 'Ngành',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row) => row.chuongTrinhKhungNienChe?.nganhHoc?.tenNganhHoc,
  },
  { field: 'hocKy', headerName: 'Học kỳ', minWidth: 120, flex: 1, sortable: true },
]);
