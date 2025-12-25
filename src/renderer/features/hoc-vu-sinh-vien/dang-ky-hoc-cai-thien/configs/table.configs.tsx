import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const columnsLopHocPhanDaDangKy: GridColDef[] = generateTableConfigs([
  {
    field: 'maHP',
    headerName: 'Mã HP',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.maHP ?? row?.lopHocPhan?.maHocPhan,
  },
  {
    field: 'maLHP',
    headerName: 'Mã LHP',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.maLHP ?? row?.lopHocPhan?.maLopHocPhan,
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    flex: 1,
    minWidth: 250,
    headerAlign: 'center',
    valueGetter: (_, row) => row?.tenMonHoc ?? row?.lopHocPhan?.tenLopHocPhan,
  },
  {
    field: 'soTinChi',
    headerName: 'Số tín chỉ',
    width: 130,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.soTinChi ?? row?.lopHocPhan?.soTinChi,
  },
  {
    field: 'trangThaiLHP',
    headerName: 'Trạng thái LHP',
    width: 160,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayDangKy',
    headerName: 'Ngày đăng ký',
    width: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row.ngayDangKy ?? row.createdAt,
  },
  {
    field: 'hocPhi',
    headerName: 'Học phí',
    width: 140,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      if (!row.hocPhi) return '';
      return Number(row.hocPhi).toLocaleString('vi-VN') + ' đ';
    },
  },
]);

export const columnsSchedule: GridColDef[] = [
  {
    field: 'index',
    headerName: '*',
    width: 60,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nhom',
    headerName: 'Nhóm',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'thu',
    headerName: 'Thứ',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'phong',
    headerName: 'Phòng',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tietHoc',
    headerName: 'Tiết học',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayBatDau',
    headerName: 'Ngày bắt đầu',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayKetThuc',
    headerName: 'Ngày kết thúc',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
];
