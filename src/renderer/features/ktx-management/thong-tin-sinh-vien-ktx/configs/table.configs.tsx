import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
//import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const thongTinSvKtxColumns: GridColDef[] = [
  { field: 'maSinhVien', headerName: 'Mã SV', minWidth: 110, align: 'center', sortable: true },
  { field: 'hoTen', headerName: 'Họ tên', minWidth: 180, flex: 1, sortable: true },
  { field: 'lop', headerName: 'Lớp', minWidth: 100 },
  { field: 'chuyenNganh', headerName: 'Chuyên ngành', minWidth: 150 },
  { field: 'tenToaNha', headerName: 'Tòa nhà', minWidth: 100 },
  { field: 'maPhong', headerName: 'Phòng', minWidth: 90, align: 'center' },
  { field: 'maGiuong', headerName: 'Giường', minWidth: 90, align: 'center' },
  {
    field: 'trangThaiGiuong',
    headerName: 'Trạng thái',
    minWidth: 110,
    align: 'center',
    renderCell: (params) => {
      const status = params.value;
      const color = status === 'CoSV' ? 'success' : 'warning';
      return (
        <Typography variant="body2" fontWeight={600} color={`${color}.main`}>
          {status === 'CoSV' ? 'Đang ở' : 'Trống'}
        </Typography>
      );
    },
  },
  {
    field: 'ngayVaoO',
    headerName: 'Ngày vào ở',
    minWidth: 120,
    align: 'center',
    renderCell: (params) =>
      params.value ? new Date(params.value).toLocaleDateString('vi-VN') : '-',
  },
  {
    field: 'ngayHetHan',
    headerName: 'Hết hạn',
    minWidth: 120,
    align: 'center',
    renderCell: (params) => {
      if (!params.value) return '-';
      const isExpired = new Date(params.value) < new Date();
      return (
        <Typography color={isExpired ? 'error' : 'text.primary'} variant="body2">
          {new Date(params.value).toLocaleDateString('vi-VN')}
        </Typography>
      );
    },
  },
];
