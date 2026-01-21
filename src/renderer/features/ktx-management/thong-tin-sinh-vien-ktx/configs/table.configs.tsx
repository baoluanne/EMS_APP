import { Typography, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const thongTinSvKtxColumns: GridColDef[] = [
  {
    field: 'maSinhVien',
    headerName: 'Mã SV',
    width: 120,
    valueGetter: (_, row) => row.sinhVien?.maSinhVien,
  },
  {
    field: 'hoTen',
    headerName: 'Họ tên',
    flex: 1,
    valueGetter: (_, row) =>
      row.sinhVien?.fullName || `${row.sinhVien?.hoDem} ${row.sinhVien?.ten}`,
  },
  {
    field: 'maPhong',
    headerName: 'Phòng',
    width: 100,
    valueGetter: (_, row) => row.phongKtx?.maPhong,
  },
  {
    field: 'maGiuong',
    headerName: 'Giường',
    width: 100,
    valueGetter: (_, row) => row.giuongKtx?.maGiuong,
  },
  {
    field: 'ngayBatDau',
    headerName: 'Ngày vào ở',
    width: 130,
    renderCell: (params) => (params.value ? format(new Date(params.value), 'dd/MM/yyyy') : '-'),
  },
  {
    field: 'ngayRoiKtx',
    headerName: 'Hạn cư trú',
    width: 130,
    renderCell: (params) => {
      if (!params.value) return '-';
      const isExpired = new Date(params.value) < new Date();
      return (
        <Typography
          color={isExpired ? 'error.main' : 'text.primary'}
          variant="body2"
          fontWeight={isExpired ? 700 : 400}
        >
          {format(new Date(params.value), 'dd/MM/yyyy')}
        </Typography>
      );
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value === 0 || params.value === 'DangO' ? 'Đang ở' : 'Đã rời'}
        color={params.value === 0 || params.value === 'DangO' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];
