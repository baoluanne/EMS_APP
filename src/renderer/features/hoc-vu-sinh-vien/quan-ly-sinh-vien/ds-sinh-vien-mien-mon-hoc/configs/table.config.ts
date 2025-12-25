import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { GIOI_TINH_MAP, TRANG_THAI_SV_MAP } from '@renderer/shared/constants';

export const columns: GridColDef[] = generateTableConfigs([
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    flex: 1,
    minWidth: 140,
    valueGetter: (_, row: any) => row.sinhVien?.maSinhVien || '',
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    flex: 1,
    minWidth: 160,
    valueGetter: (_, row: any) => row.sinhVien?.hoDem || '',
  },
  {
    field: 'ten',
    headerName: 'Tên',
    flex: 1,
    minWidth: 120,
    valueGetter: (_, row: any) => row.sinhVien?.ten || '',
  },

  {
    field: 'gioiTinh',
    headerName: 'Giới tính',
    flex: 1,
    minWidth: 110,
    valueGetter: (_, row: any) => {
      const valueString = row.sinhVien?.gioiTinh?.toString();
      return GIOI_TINH_MAP[valueString] || '';
    },
  },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    flex: 1,
    minWidth: 140,
    valueGetter: (_, row: any) =>
      row.sinhVien?.ngaySinh ? new Date(row.sinhVien?.ngaySinh).toLocaleDateString('vi-VN') : '',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái sinh viên',
    flex: 1,
    minWidth: 200,
    valueGetter: (_, row: any) => TRANG_THAI_SV_MAP[row.sinhVien?.trangThai] ?? '',
  },
  {
    field: 'lopHoc',
    headerName: 'Lớp học',
    flex: 1,
    minWidth: 160,
    valueGetter: (_, row: any) => row.sinhVien?.lopHoc?.tenLop || '',
  },

  {
    field: 'maMonHoc',
    headerName: 'Mã môn học',
    flex: 1,
    minWidth: 140,
    valueGetter: (_, row: any) => row?.monHocBacDaoTao?.monHoc?.maMonHoc ?? '',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    flex: 1,
    minWidth: 200,
    valueGetter: (_, row: any) => row?.monHocBacDaoTao?.monHoc?.tenMonHoc ?? '',
  },

  {
    field: 'tenQuyetDinh',
    headerName: 'Tên quyết định',
    flex: 1,
    minWidth: 200,
    valueGetter: (_, row: any) => row.quyetDinh?.tenQuyetDinh || '',
  },
]);

export const danhSachMonHocDuocMienColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maMonHoc',
    headerName: 'Mã môn học',
    flex: 1,
    minWidth: 140,
    valueGetter: (_, row: any) => row?.monHocBacDaoTao?.monHoc?.maMonHoc ?? '',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    flex: 1,
    minWidth: 200,
    valueGetter: (_, row: any) => row?.monHocBacDaoTao?.monHoc?.tenMonHoc ?? '',
  },
  {
    field: 'soTC',
    headerName: 'Số tín chỉ',
    flex: 1,
    minWidth: 200,
    valueGetter: (_, row: any) => row?.monHocBacDaoTao?.monHoc?.soTinChi ?? '',
  },
  {
    field: 'lyThuyet',
    headerName: 'Lý thuyết',
    flex: 1,
    minWidth: 200,
    type: 'boolean',
    valueGetter: (_, row: any) => row?.monHocBacDaoTao?.isLyThuyet,
  },
]);

export const searchSVColumns: GridColDef[] = [
  { field: 'stt', headerName: '*', width: 70 },
  { field: 'maSinhVien', headerName: 'Mã sinh viên', flex: 1, minWidth: 140 },
  { field: 'hoDem', headerName: 'Họ đệm', flex: 1, minWidth: 140 },
  { field: 'ten', headerName: 'Tên', flex: 1, minWidth: 100 },
  { field: 'gioiTinh', headerName: 'Giới tính', flex: 1, minWidth: 100 },
  { field: 'ngaySinh', headerName: 'Ngày sinh', flex: 1, minWidth: 140 },
  { field: 'maLop', headerName: 'Mã lớp', flex: 1, minWidth: 120 },
  { field: 'tenLop', headerName: 'Tên lớp', flex: 1, minWidth: 160 },
  { field: 'diaChi', headerName: 'Địa chỉ', flex: 1, minWidth: 100 },
];

export const importDSMienMonColumns: GridColDef[] = generateTableConfigs([
  { field: 'maSinhVien', headerName: 'Mã sinh viên', flex: 1, minWidth: 140 },
  { field: 'hoDem', headerName: 'Họ đệm', flex: 1, minWidth: 140 },
  { field: 'ten', headerName: 'Tên', flex: 1, minWidth: 100 },
  { field: 'maMonHoc', headerName: 'Mã môn học', flex: 1, minWidth: 100 },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 1, minWidth: 140 },
]);

export const danhSachKetQuaImportMienMonHocColumns: GridColDef[] = [
  { field: 'maSinhVien', headerName: 'Mã sinh viên', flex: 1, minWidth: 140 },
  { field: 'hoDem', headerName: 'Họ đệm', flex: 1, minWidth: 140 },
  { field: 'ten', headerName: 'Tên', flex: 1, minWidth: 100 },
  { field: 'maMonHoc', headerName: 'Mã môn học', flex: 1, minWidth: 100 },
  { field: 'tenMonHoc', headerName: 'Tên môn học', flex: 1, minWidth: 100 },
];
