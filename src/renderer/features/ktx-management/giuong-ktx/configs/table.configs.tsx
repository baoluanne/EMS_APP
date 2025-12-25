import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const giuongKtxColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maGiuong',
    headerName: 'Mã giường',
    minWidth: 120,
    align: 'center',
    sortable: true,
  },
  {
    field: 'maPhong',
    headerName: 'Mã phòng',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'tenToaNha',
    headerName: 'Tòa nhà',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'tenSinhVien',
    headerName: 'Sinh viên',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => params.value || '-',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 130,
    flex: 1,
  },
]);
