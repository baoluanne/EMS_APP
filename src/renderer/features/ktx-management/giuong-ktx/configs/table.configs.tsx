import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

const getTrangThaiInfo = (value?: number) => {
  switch (value) {
    case 0:
      return { color: 'success' as const, label: 'Trống' };
    case 1:
      return { color: 'warning' as const, label: 'Đã có người' };
    case 2:
      return { color: 'error' as const, label: 'Bảo trì' };
    default:
      return { color: 'default' as const, label: 'Không xác định' };
  }
};

export const giuongKtxColumns: GridColDef[] = [
  {
    field: 'maGiuong',
    headerName: 'Mã giường',
    width: 120,
    flex: 0.8,
  },
  {
    field: 'phongKtxId',
    headerName: 'Phòng',
    width: 100,
    flex: 0.7,
    valueGetter: (_, row: any) => row.phong?.maPhong || '',
  },
  {
    field: 'tenSinhVien',
    headerName: 'Sinh viên',
    flex: 1.5,
    minWidth: 200,
    valueGetter: (_, row: any) => row.sinhVien?.tenSinhVien || '',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 130,
    flex: 0.9,
    renderCell: (params) => {
      const info = getTrangThaiInfo(params.value);
      return <Chip label={info.label} color={info.color} size="small" variant="outlined" />;
    },
  },
];

export default giuongKtxColumns;
