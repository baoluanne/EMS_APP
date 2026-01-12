import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

export const giuongKtxColumns: GridColDef[] = [
  {
    field: 'maGiuong',
    headerName: 'Mã giường',
    width: 130,
  },
  {
    field: 'maPhong',
    headerName: 'Thuộc phòng',
    width: 130,
    valueGetter: (_, row) => row.maPhong || '---',
  },
  {
    field: 'tenToaNha',
    headerName: 'Tòa nhà',
    width: 150,
    valueGetter: (_, row) => row.tenToaNha || '---',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 150,
    renderCell: (params) => {
      const status = params.value;
      let color: 'default' | 'success' | 'warning' | 'error' = 'default';
      let label = status;

      if (status === 'Trong') {
        color = 'success';
        label = 'Trống';
      }
      if (status === 'CoSV') {
        color = 'warning';
        label = 'Đã có người';
      }
      if (status === 'BaoTri') {
        color = 'error';
        label = 'Bảo trì';
      }

      return <Chip label={label} color={color} size="small" variant="outlined" />;
    },
  },
  {
    field: 'tenSinhVien',
    headerName: 'Sinh viên đang ở',
    flex: 1,
    minWidth: 200,
    valueGetter: (_, row) => row.tenSinhVien || '---',
  },
];
