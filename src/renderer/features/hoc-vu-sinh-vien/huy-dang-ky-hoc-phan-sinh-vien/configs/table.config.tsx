import { GridColDef } from '@mui/x-data-grid';

export const columnsDanhSachLopHocPhanDaDangKy: GridColDef[] = [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  {
    field: 'maHocPhan',
    headerName: 'Mã học phần',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopHocPhan?.maHocPhan;
    },
  },
  {
    field: 'maLopHP',
    headerName: 'Mã lớp HP',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopHocPhan?.maLopHocPhan;
    },
  },
  {
    field: 'tenHocPhan',
    headerName: 'Tên học phần',
    flex: 1,
    minWidth: 250,
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopHocPhan?.tenLopHocPhan;
    },
  },
  {
    field: 'lopDuKien',
    headerName: 'Lớp dự kiến',
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'stc', headerName: 'STC', align: 'center', headerAlign: 'center' },
  {
    field: 'trangThaiDangKy',
    headerName: 'Trạng thái ĐK',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'trangThaiLHP',
    headerName: 'Trạng thái lớp HP',
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'nhomTH', headerName: 'Nhóm TH', align: 'center', headerAlign: 'center' },
  {
    field: 'ngayDangKy',
    headerName: 'Ngày đăng ký',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nguoiDangKy',
    headerName: 'Người đăng ký',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nguoiKhoiPhuc',
    headerName: 'Người khôi phục',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayKhoiPhuc',
    headerName: 'Ngày khôi phục',
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'dot', headerName: 'Đợt', align: 'center', headerAlign: 'center' },
  {
    field: 'daDongHP',
    headerName: 'Đã đóng học phí',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'daCoDiem',
    headerName: 'Đã có điểm',
    align: 'center',
    headerAlign: 'center',
  },
];
