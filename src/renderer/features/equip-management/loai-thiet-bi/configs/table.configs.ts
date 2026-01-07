import { GridColDef } from '@mui/x-data-grid';

export const loaiThietBiColumns: GridColDef[] = [
  {
    field: 'maLoai',
    headerName: 'Mã loại thiết bị',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'tenLoai',
    headerName: 'Tên loại thiết bị',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'moTa',
    headerName: 'Mô tả',
    minWidth: 250,
    flex: 1,
  },
  //   {
  //     field: 'soLuong',
  //     headerName: 'Số lượng thiết bị',
  //     width: 150,
  //     align: 'center',
  //     headerAlign: 'center',
  //   },
];
