import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
//import { Typography } from '@mui/material';

export const viPhamKtxColumns: GridColDef[] = generateTableConfigs([
  { field: 'maSinhVien', headerName: 'Mã SV', minWidth: 100, align: 'center' },
  { field: 'hoTenSinhVien', headerName: 'Họ tên', minWidth: 180, flex: 1 },
  { field: 'maPhong', headerName: 'Phòng', minWidth: 90, align: 'center' },
  { field: 'tenToaNha', headerName: 'Tòa', minWidth: 80, align: 'center' },
  { field: 'noiDungViPham', headerName: 'Nội dung vi phạm', minWidth: 250, flex: 1.5 },
  {
    field: 'diemTru',
    headerName: 'Điểm trừ',
    minWidth: 90,
    align: 'center',
  },
  {
    field: 'ngayViPham',
    headerName: 'Ngày vi phạm',
    minWidth: 120,
    align: 'center',
    renderCell: (params) =>
      params.value ? new Date(params.value).toLocaleDateString('vi-VN') : '-',
  },
  { field: 'hinhThucXuLy', headerName: 'Hình thức xử lý', minWidth: 150 },
]);
