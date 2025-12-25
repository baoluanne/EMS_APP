import { GridColDef } from '@mui/x-data-grid';

export const importSuccessColumns: GridColDef[] = [
  { field: 'maSinhVien', headerName: 'Mã sinh viên', flex: 1 },
  { field: 'tenSinhVien', headerName: 'Họ tên', flex: 2 },
  { field: 'filePath', headerName: 'Đường dẫn ảnh', flex: 2 },
];

export const importFailColumns: GridColDef[] = [
  { field: 'tenFile', headerName: 'Tên file', flex: 1 },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 2 },
];
