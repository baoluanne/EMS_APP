import { GridColDef } from '@mui/x-data-grid';
import { GiuongKtxSchema } from '../validation';

export const giuongKtxColumns: GridColDef<GiuongKtxSchema>[] = [
  {
    field: 'maGiuong',
    headerName: 'Mã giường',
    width: 150,
  },
  {
    field: 'maPhong',
    headerName: 'Thuộc phòng',
    width: 150,
    valueGetter: (value: any, row: any) => {
      const rowData = row || value?.row;
      return rowData?.maPhong || '---';
    },
  },
  {
    field: 'tenToaNha',
    headerName: 'Tòa nhà',
    width: 180,
    valueGetter: (value: any, row: any) => {
      const rowData = row || value?.row;
      return rowData?.tenToaNha || '---';
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 150,
    valueFormatter: (value: any) => {
      if (value === 'Trong') return 'Trống';
      if (value === 'CoSV') return 'Đã có người';
      if (value === 'BaoTri') return 'Bảo trì';
      return value;
    },
  },
  {
    field: 'tenSinhVien',
    headerName: 'Sinh viên đang ở',
    width: 200,
    valueGetter: (value: any, row: any) => {
      const rowData = row || value?.row;
      return rowData?.tenSinhVien || '---';
    },
  },
];
