import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

const getTrangThaiColor = (value: string) => {
  switch (value) {
    case 'MoiGui':
      return 'warning';
    case 'DangXuLy':
      return 'info';
    case 'DaXong':
      return 'success';
    case 'Huy':
      return 'error';
    default:
      return 'default';
  }
};

const getTrangThaiLabel = (value: string) => {
  switch (value) {
    case 'MoiGui':
      return 'Mới gửi';
    case 'DangXuLy':
      return 'Đang xử lý';
    case 'DaXong':
      return 'Hoàn thành';
    case 'Huy':
      return 'Từ chối';
    default:
      return value;
  }
};

export const yeuCauSuaChuaColumns: GridColDef[] = [
  { field: 'tieuDe', headerName: 'Tiêu đề', minWidth: 220, flex: 1.5 },
  { field: 'hoTenSinhVien', headerName: 'Sinh viên', minWidth: 160, flex: 1 },
  { field: 'maPhong', headerName: 'Phòng', minWidth: 110, flex: 0.7 },
  { field: 'tenToaNha', headerName: 'Tòa nhà', minWidth: 130, flex: 0.9 },
  {
    field: 'tenTaiSan',
    headerName: 'Tài sản',
    minWidth: 160,
    flex: 1,
    valueGetter: (_, row) => row.tenTaiSan || 'Không có',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 140,
    flex: 0.9,
    renderCell: (params) => (
      <Chip
        label={getTrangThaiLabel(params.value)}
        color={getTrangThaiColor(params.value)}
        size="small"
      />
    ),
  },
  {
    field: 'ngayXuLy',
    headerName: 'Ngày xử lý',
    minWidth: 140,
    flex: 0.9,
    renderCell: (params) =>
      params.value ? new Date(params.value).toLocaleDateString('vi-VN') : '-',
  },
  { field: 'ghiChuXuLy', headerName: 'Ghi chú xử lý', minWidth: 180, flex: 1.2 },
];
