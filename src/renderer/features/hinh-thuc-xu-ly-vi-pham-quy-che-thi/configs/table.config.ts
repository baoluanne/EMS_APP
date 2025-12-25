import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { MucDoViPham } from '@renderer/shared/types';

export const HinhThucXuLyViPhamViCheThiColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maHinhThucXL',
    headerName: 'Mã xử lý quy chế thi',
    minWidth: 170,
    flex: 1,
    align: 'center',
  },
  {
    field: 'tenHinhThucXL',
    headerName: 'Tên xử lý quy chế thi',
    minWidth: 200,
    flex: 2,
  },
  {
    field: 'phanTramDiemTru',
    headerName: 'Phần trăm điểm trừ (%)',
    minWidth: 150,
    flex: 1,
    align: 'center',
  },
  {
    field: 'mucDo',
    headerName: 'Mức độ',
    minWidth: 150,
    flex: 1,
    align: 'center',
    headerAlign: 'center' as GridAlignment,
    valueGetter: (value: MucDoViPham) => value.tenMucDoViPham,
  },
  {
    field: 'diemTruRL',
    headerName: 'Điểm trừ (RL)',
    minWidth: 150,
    flex: 1,
    align: 'center',
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 180,
    flex: 1,
    align: 'center',
    headerAlign: 'center' as GridAlignment,
  },
]);
