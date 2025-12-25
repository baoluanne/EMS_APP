import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { Chip } from '@mui/material';

const statusChip = (daChot: boolean) => (
  <Chip
    label={daChot ? 'Đã chốt' : 'Chưa chốt'}
    color={daChot ? 'success' : 'warning'}
    size="small"
  />
);

export const chiSoDienNuocColumns = generateTableConfigs([
  { field: 'tenToaNha', headerName: 'Tòa nhà', minWidth: 160, flex: 1 },
  { field: 'maPhong', headerName: 'Mã phòng', minWidth: 120, align: 'center' },
  {
    field: 'thang',
    headerName: 'Tháng',
    width: 90,
    align: 'center',
    valueFormatter: (v) => `Tháng ${v}`,
  },
  { field: 'nam', headerName: 'Năm', width: 90, align: 'center' },
  { field: 'dienCu', headerName: 'Điện cũ', width: 110, align: 'center' },
  { field: 'dienMoi', headerName: 'Điện mới', width: 110, align: 'center' },
  {
    field: 'tieuThuDien',
    headerName: 'Tiêu thụ điện (kWh)',
    width: 160,
    align: 'center',
    type: 'number',
  },
  { field: 'nuocCu', headerName: 'Nước cũ', width: 110, align: 'center' },
  { field: 'nuocMoi', headerName: 'Nước mới', width: 110, align: 'center' },
  {
    field: 'tieuThuNuoc',
    headerName: 'Tiêu thụ nước (m³)',
    width: 160,
    align: 'center',
    type: 'number',
  },
  {
    field: 'daChot',
    headerName: 'Trạng thái',
    width: 130,
    align: 'center',
    renderCell: (params) => statusChip(params.value),
  },
]) as GridColDef[];

export { chiSoDienNuocColumns as columns };
