import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { LoaiViPhamConst, LoaiViPhamNoiQuy } from '../validation';

export const viPhamTongHopColumns: GridColDef[] = [
  {
    field: 'maSinhVien',
    headerName: 'Mã SV',
    width: 150,
    flex: 1,
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
    field: 'phong',
    headerName: 'Phòng',
    width: 100,
    flex: 1,
    valueGetter: (_, row) => row.phongKtx?.maPhong,
  },
  {
    field: 'giuongKtx',
    headerName: 'Giường',
    width: 100,
    flex: 1,
    valueGetter: (_, row) => {
      const maGiuongFull = row.giuongKtx?.maGiuong;
      if (!maGiuongFull) return '---';
      const parts = maGiuongFull.split('-');
      return parts[parts.length - 1];
    },
  },
  {
    field: 'soDienThoai',
    headerName: 'Số điện thoại',
    width: 100,
    flex: 1,
    valueGetter: (_, row) => row.sinhVien?.soDienThoai,
  },
  {
    field: 'thoiGianLuuTru',
    headerName: 'Thời gian cư trú',
    width: 100,
    flex: 1,
    valueGetter: (_, row) => row.thoiGianLuuTru,
  },
  {
    field: 'tongDiemViPham',
    headerName: 'Tổng điểm trừ',
    width: 100,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const val = (params.value as number) || 0;
      return (
        <span
          style={{
            color: val >= 50 ? '#d32f2f' : 'inherit',
            fontWeight: val >= 50 ? 700 : 400,
          }}
        >
          {val}
        </span>
      );
    },
  },
];

export const lichSuViPhamColumns: GridColDef[] = [
  { field: 'maBienBan', headerName: 'Mã BB', width: 120 },
  {
    field: 'ngayViPham',
    headerName: 'Ngày vi phạm',
    width: 110,
    valueFormatter: (value) => (value ? format(new Date(value as string), 'dd/MM/yyyy') : ''),
  },
  {
    field: 'loaiViPham',
    headerName: 'Loại vi phạm',
    flex: 1,
    valueGetter: (value) => {
      const type = value as LoaiViPhamNoiQuy;
      return LoaiViPhamConst[type]?.label || 'Không xác định';
    },
  },
  {
    field: 'diemTru',
    headerName: 'Điểm trừ',
    width: 80,
    align: 'center',
    renderCell: (params) => (
      <span style={{ color: 'red', fontWeight: 'bold' }}>-{params.value}</span>
    ),
  },
];
