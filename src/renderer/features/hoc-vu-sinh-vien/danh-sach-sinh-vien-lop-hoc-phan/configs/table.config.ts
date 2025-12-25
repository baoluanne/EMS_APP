import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { GIOI_TINH_MAP, NGUON_DANG_KY_MAP, TRANG_THAI_DK_MAP, TRANG_THAI_SV_MAP } from '@renderer/shared/constants';

export const danhSachSVLHPColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    width: 180,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.sinhVien?.maSinhVien ?? '',
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    flex: 1,
    minWidth: 220,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.sinhVien?.hoDem ?? '',
  },
  {
    field: 'ten',
    headerName: 'Tên',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.sinhVien?.ten ?? '',
  },
  {
    field: 'gioiTinh',
    headerName: 'Giới tính',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const gt = row?.sinhVien?.gioiTinh;
      return GIOI_TINH_MAP[gt] ?? '';
    },
  },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    flex: 1,
    minWidth: 180,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) =>
      row?.sinhVien?.ngaySinh ? new Date(row.sinhVien.ngaySinh).toLocaleDateString('vi-VN') : '',
  },
  {
    field: 'soDienThoai',
    headerName: 'Điện thoại',
    flex: 1,
    minWidth: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.sinhVien?.soDienThoai ?? '',
  },
  {
    field: 'noiSinh',
    headerName: 'Nơi sinh',
    flex: 1,
    minWidth: 180,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const xa = row?.sinhVien?.noiSinhPhuongXa;
      const huyen = row?.sinhVien?.noiSinhHuyen;
      const tinh = row?.sinhVien?.noiSinhTinh;

      return [xa, huyen, tinh].filter(Boolean).join(', ');
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 220,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.email ?? '',
  },
  {
    field: 'nhom',
    headerName: 'Nhóm',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.sinhVien?.nhom ?? '',
  },
  {
    field: 'trangThaiSinhVien',
    headerName: 'Trạng thái sinh viên',
    flex: 1,
    minWidth: 180,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const value = row?.sinhVien?.trangThai?.toString();
      return TRANG_THAI_SV_MAP[value] ?? '';
    },
  },
  {
    field: 'trangThaiDangKyLHP',
    headerName: 'Trạng thái đăng ký LHP',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const value = row?.trangThaiDangKyLHP?.toString();
      return TRANG_THAI_DK_MAP[value] ?? '';
    },
  },
  {
    field: 'hocPhi',
    headerName: 'Học phí',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => (row?.hocPhi ? 'Đã đóng' : 'Chưa đóng'),
  },
  {
    field: 'maLopHocPhan',
    headerName: 'Mã lớp chữ',
    flex: 1,
    minWidth: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.lopHocPhan?.maLopHocPhan ?? '',
  },
  {
    field: 'ngayDangKy',
    headerName: 'Ngày đăng ký',
    flex: 1,
    minWidth: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) =>
      row?.ngayDangKy ? new Date(row.ngayDangKy).toLocaleDateString('vi-VN') : '',
  },
  {
    field: 'nguonDangKy',
    headerName: 'Nguồn đăng ký',
    flex: 1,
    minWidth: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const value = row?.nguonDangKy?.toString();
      return NGUON_DANG_KY_MAP[value] ?? '';
    },
  },
  {
    field: 'nguoiDangKy',
    headerName: 'Họ tên người đăng ký',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const nd = row?.nguoiDangKy?.fullName;
      return nd ?? '';
    },
  },
]);
