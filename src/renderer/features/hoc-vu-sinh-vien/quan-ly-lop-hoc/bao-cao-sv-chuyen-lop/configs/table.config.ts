import { GridColDef } from '@mui/x-data-grid';
import { ChuyenLop } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop/types';

const getPhanLoaiChuyenLopText = (value: number): string => {
  const enumMap: Record<number, string> = {
    0: 'Chuyển lớp tự do',
    1: 'Chuyển lớp cùng ngành',
  };
  return enumMap[value] || '';
};

export const columns: GridColDef<ChuyenLop>[] = [
  {
    field: 'index',
    headerName: '*',
    width: 50,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },

  // --- Thông tin sinh viên ---
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    minWidth: 120,
    flex: 0.9,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.sinhVien?.maSinhVien || '',
  },
  {
    field: 'hoTenSinhVien',
    headerName: 'Họ tên sinh viên',
    minWidth: 200,
    flex: 1.4,
    valueGetter: (_, row) =>
      `${row?.sinhVien?.hoDem ?? ''} ${row?.sinhVien?.ten ?? ''}`.trim() || '',
  },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    type: 'date',
    minWidth: 120,
    flex: 0.9,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => (row?.sinhVien?.ngaySinh ? new Date(row.sinhVien.ngaySinh) : null),
  },

  // --- Người chuyển / cập nhật ---
  {
    field: 'maNguoiChuyen',
    headerName: 'Mã người chuyển',
    minWidth: 140,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.createdById || '',
  },
  {
    field: 'hoTenNguoiChuyen',
    headerName: 'Họ tên người chuyển',
    minWidth: 200,
    flex: 1.4,
    valueGetter: () => '', // TODO: Map to user name if user object is included
  },
  {
    field: 'ngayChuyen',
    headerName: 'Ngày chuyển',
    type: 'date',
    minWidth: 120,
    flex: 0.9,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => (row?.ngayChuyenLop ? new Date(row.ngayChuyenLop) : null),
  },
  {
    field: 'ngayCapNhat',
    headerName: 'Ngày cập nhật',
    type: 'date',
    minWidth: 130,
    flex: 0.9,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => (row?.modifiedAt ? new Date(row.modifiedAt) : null),
  },
  {
    field: 'nguoiCapNhat',
    headerName: 'Người cập nhật',
    minWidth: 160,
    flex: 1.1,
    valueGetter: (_, row) => row?.modifiedById || '', // TODO: Map to user name if user object is included
  },

  // --- Lớp học cũ ---
  {
    field: 'maLopHocCu',
    headerName: 'Mã lớp học cũ',
    minWidth: 140,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.lopCu?.maLop || '',
  },
  {
    field: 'tenLopHocCu',
    headerName: 'Tên lớp học cũ',
    minWidth: 200,
    flex: 1.3,
    valueGetter: (_, row) => row?.lopCu?.tenLop || '',
  },

  // --- Lớp học mới ---
  {
    field: 'maLopHocMoi',
    headerName: 'Mã lớp học mới',
    minWidth: 140,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row?.lopMoi?.maLop || '',
  },
  {
    field: 'tenLopHocMoi',
    headerName: 'Tên lớp học mới',
    minWidth: 200,
    flex: 1.3,
    valueGetter: (_, row) => row?.lopMoi?.tenLop || '',
  },

  // --- Hệ / Loại hình đào tạo ---
  {
    field: 'heDaoTaoCu',
    headerName: 'Hệ đào tạo cũ',
    minWidth: 150,
    flex: 1.1,
    valueGetter: (_, row) => row?.lopCu?.bacDaoTao?.tenBacDaoTao || '',
  },
  {
    field: 'heDaoTaoMoi',
    headerName: 'Hệ đào tạo mới',
    minWidth: 150,
    flex: 1.1,
    valueGetter: (_, row) => row?.lopMoi?.bacDaoTao?.tenBacDaoTao || '',
  },
  {
    field: 'loaiHinhDaoTaoCu',
    headerName: 'Loại hình đào tạo cũ',
    minWidth: 190,
    flex: 1.3,
    valueGetter: (_, row) => row?.lopCu?.loaiDaoTao?.tenLoaiDaoTao || '',
  },
  {
    field: 'loaiHinhDaoTaoMoi',
    headerName: 'Loại hình đào tạo mới',
    minWidth: 190,
    flex: 1.3,
    valueGetter: (_, row) => row?.lopMoi?.loaiDaoTao?.tenLoaiDaoTao || '',
  },

  // --- Ngành ---
  {
    field: 'nganhCu',
    headerName: 'Ngành cũ',
    minWidth: 140,
    flex: 1.0,
    valueGetter: (_, row) => row?.lopCu?.nganhHoc?.tenNganhHoc || '',
  },
  {
    field: 'nganhMoi',
    headerName: 'Ngành mới',
    minWidth: 140,
    flex: 1.0,
    valueGetter: (_, row) => row?.lopMoi?.nganhHoc?.tenNganhHoc || '',
  },

  // --- Phân loại & ghi chú ---
  {
    field: 'phanLoaiChuyenLop',
    headerName: 'Phân loại chuyển lớp',
    minWidth: 190,
    flex: 1.2,
    valueGetter: (_, row) => getPhanLoaiChuyenLopText(row?.phanLoaiChuyenLop ?? 0),
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 160,
    flex: 1.2,
    valueGetter: (_, row) => row?.ghiChu || '',
  },
];
