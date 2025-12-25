import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const columnsDanhSachSinhVienChuaDangKy: GridColDef[] = generateTableConfigs([
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'ten',
    headerName: 'Tên',
    width: 150,
    headerAlign: 'center',
  },
  {
    field: 'nhom',
    headerName: 'Nhóm',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayNhapHoc',
    headerName: 'Ngày nhập học',
    width: 160,
    align: 'center',
    headerAlign: 'center',
  },
]);

export const columnsDanhSachSinhVienDaDangKy: GridColDef[] = generateTableConfigs([
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'ten',
    headerName: 'Tên',
    width: 150,
    headerAlign: 'center',
  },
  {
    field: 'lopHoc',
    headerName: 'Lớp học',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nhom',
    headerName: 'Nhóm',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nhomTH',
    headerName: 'Nhóm TH',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayNhapHoc',
    headerName: 'Ngày nhập học',
    width: 160,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 150,
    align: 'center',
    headerAlign: 'center',
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
