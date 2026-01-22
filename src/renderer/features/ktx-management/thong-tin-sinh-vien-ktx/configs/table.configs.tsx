import { Link } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const thongTinSvKtxColumns = (onStudentClick: (student: any) => void): GridColDef[] => [
  {
    field: 'maSinhVien',
    headerName: 'Mã SV',
    width: 120,
    valueGetter: (_, row) => row.sinhVien?.maSinhVien,
  },
  {
    field: 'hoTen',
    headerName: 'Họ tên sinh viên',
    flex: 1,
    renderCell: (params) => (
      <Link
        component="button"
        variant="body2"
        onClick={() => onStudentClick(params.row)}
        sx={{ fontWeight: 600, textDecoration: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        {params.row.sinhVien?.fullName ||
          `${params.row.sinhVien?.hoDem} ${params.row.sinhVien?.ten}`}
      </Link>
    ),
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
    field: 'tenDot',
    headerName: 'Học kì',
    width: 130,
    valueGetter: (_, row) => row.hocKy?.tenDot,
  },
  {
    field: 'thoiGianLuuTru',
    headerName: 'Thời gian lưu trú',
    width: 130,
    valueGetter: (_, row) => row.thoiGianLuuTru,
  },
  {
    field: 'ngayBatDau',
    headerName: 'Ngày vào ở',
    width: 130,
    renderCell: (params) => (params.value ? format(new Date(params.value), 'dd/MM/yyyy') : '-'),
  },
];
