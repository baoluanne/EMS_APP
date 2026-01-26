import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const viPhamNoiQuyColumns: GridColDef[] = [
  {
    field: 'maBienBan',
    headerName: 'Mã biên bản',
    minWidth: 130,
    flex: 0.8,
  },
  {
    field: 'maSinhVien',
    headerName: 'Mã SV',
    minWidth: 120,
    valueGetter: (_, row) => row.sinhVien?.maSinhVien,
  },
  {
    field: 'hoTen',
    headerName: 'Họ tên sinh viên',
    minWidth: 200,
    flex: 1,
    valueGetter: (_, row) => `${row.sinhVien?.hoDem} ${row.sinhVien?.ten}`,
  },
  {
    field: 'ngayViPham',
    headerName: 'Ngày vi phạm',
    width: 130,
    valueFormatter: (value) => (value ? format(new Date(value), 'dd/MM/yyyy') : ''),
  },
  {
    field: 'noiDungViPham',
    headerName: 'Nội dung vi phạm',
    minWidth: 250,
    flex: 1.5,
  },
  {
    field: 'diemTru',
    headerName: 'Điểm trừ',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
];
