import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const traCuuLichHocLichThiSVColumns: GridColDef[] = [
  {
    field: 'index',
    headerName: '*',
    width: 50,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },

  // --- Lớp học phần / Môn học ---
  {
    field: 'maLopHocPhan',
    headerName: 'Mã lớp học phần',
    minWidth: 160,
    flex: 1.2,
    valueGetter: (_, row) => row?.lopHocPhan?.maLopHocPhan ?? '',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    minWidth: 220,
    flex: 1.6,
    valueGetter: (_, row) => row?.lopHocPhan?.monHoc?.tenMonHoc ?? '',
  },

  // --- Kỳ / Số TC / Lý thuyết ---
  {
    field: 'dotHoc',
    headerName: 'Học kỳ',
    minWidth: 100,
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.lopHocPhan?.hocKy?.tenDot ?? '',
  },
  {
    field: 'soTinChi',
    headerName: 'Số tín chỉ',
    type: 'number',
    minWidth: 110,
    flex: 0.8,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.lopHocPhan?.monHoc?.soTinChi ?? 0,
  },
  {
    field: 'lyThuyet',
    headerName: 'Lý thuyết',
    minWidth: 110,
    flex: 0.8,
    align: 'center',
    headerAlign: 'center',
    type: 'boolean',
    valueGetter: (_, row) =>
      row?.lopHocPhan?.loaiMonLTTH ? row?.lopHocPhan?.loaiMonLTTH === 0 : false,
  },

  // --- Lịch học ---
  {
    field: 'thu',
    headerName: 'Thứ',
    minWidth: 90,
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.thu ?? '',
  },
  {
    field: 'tuTiet',
    headerName: 'Từ tiết',
    type: 'number',
    minWidth: 100,
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.tietBatDau ?? 0,
  },
  {
    field: 'denTiet',
    headerName: 'Đến tiết',
    type: 'number',
    minWidth: 100,
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => (row?.tietBatDau ?? 0) + (row?.soTiet ?? 0) - 1,
  },
  {
    field: 'ngayThi',
    headerName: 'Giờ thi',
    minWidth: 110,
    flex: 0.8,
    align: 'center',
    headerAlign: 'center',
    valueGetter: () => '',
  },
  {
    field: 'nhom',
    headerName: 'Nhóm',
    minWidth: 100,
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.lopHocPhan?.nhom ?? '',
  },

  // --- Thời gian ---
  {
    field: 'ngayBatDau',
    headerName: 'Ngày bắt đầu',
    minWidth: 140,
    flex: 1.0,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      const value = row?.lopHocPhan?.ngayBatDau;
      return value ? format(value, 'dd/MM/yyyy HH:mm:ss') : '';
    },
  },
  {
    field: 'ngayKetThuc',
    headerName: 'Ngày kết thúc',
    minWidth: 140,
    flex: 1.0,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      const value = row?.lopHocPhan?.ngayKetThuc;
      return value ? format(value, 'dd/MM/yyyy HH:mm:ss') : '';
    },
  },

  // --- Giảng viên / Phòng / Loại lịch ---
  {
    field: 'giangVien',
    headerName: 'Giảng viên',
    minWidth: 180,
    flex: 1.3,
    valueGetter: (_, row) => `${row?.giangVien?.hoDem ?? ''} ${row?.giangVien?.ten ?? ''}`,
  },
  {
    field: 'tenPhong',
    headerName: 'Tên phòng',
    minWidth: 130,
    flex: 0.9,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.phongHoc?.tenPhong ?? '',
  },
  {
    field: 'loaiLich',
    headerName: 'Loại lịch',
    minWidth: 130,
    flex: 0.9,
    align: 'center',
    headerAlign: 'center',
    valueGetter: () => 'Lịch học',
  },
];
