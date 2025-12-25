import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const columnsLopHocPhanChuaDangKy: GridColDef[] = generateTableConfigs([
  {
    field: 'maLHP',
    headerName: 'Mã LHP',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'maHP',
    headerName: 'Mã HP',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'lopBanDau',
    headerName: 'Lớp ban đầu',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'lopDuKien',
    headerName: 'Lớp dự kiến',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'soTinChi',
    headerName: 'Số tín chỉ',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'siSoToiDa',
    headerName: 'Sĩ số tối đa',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'siSoDangKy',
    headerName: 'Sĩ số đăng ký',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
]);

export const columnsMonHocChoDangKy: GridColDef[] = generateTableConfigs([
  {
    field: 'index',
    headerName: '*',
    width: 60,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'maHP',
    headerName: 'Mã HP',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    width: 250,
    headerAlign: 'center',
  },
  {
    field: 'soTinChi',
    headerName: 'Số tín chỉ',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'batBuoc',
    headerName: 'Bắt buộc',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'hocPhanYeuCau',
    headerName: 'Học phần yêu cầu',
    width: 200,
    headerAlign: 'center',
  },
]);

export const columnsLopHocPhanDaDangKy: GridColDef[] = generateTableConfigs([
  {
    field: 'maLHP',
    headerName: 'Mã LHP',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'maHP',
    headerName: 'Mã HP',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'soTinChi',
    headerName: 'Số tín chỉ',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'lopBanDau',
    headerName: 'Lớp ban đầu',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'lopDuKien',
    headerName: 'Lớp dự kiến',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayDangKy',
    headerName: 'Ngày đăng ký',
    width: 130,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
]);

export const columnsSchedule: GridColDef[] = generateTableConfigs([
  {
    field: 'thu',
    headerName: 'Thứ',
    width: 80,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tietHoc',
    headerName: 'Tiết học',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'siSoNhom',
    headerName: 'Sĩ số nhóm',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'batDau',
    headerName: 'Bắt đầu',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ketThuc',
    headerName: 'Kết thúc',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'phong',
    headerName: 'Phòng',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'giangVien',
    headerName: 'Giảng viên',
    width: 150,
    headerAlign: 'center',
  },
]);
