import type { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const thongKeTiepNhanHoSoSinhVienColumns = [
  {
    field: 'index',
    headerName: '*',
    width: 50,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    minWidth: 130,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.maSinhVien ?? '',
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    minWidth: 160,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.hoDem ?? '',
  },
  {
    field: 'ten',
    headerName: 'Tên',
    minWidth: 120,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.ten ?? '',
  },
  {
    field: 'gioiTinh',
    headerName: 'Giới tính',
    minWidth: 110,
    flex: 0.8,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.gioiTinh ?? '',
  },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    minWidth: 140,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row?.sinhVien?.ngaySinh ? format(row?.sinhVien?.ngaySinh, 'dd/MM/yyyy') : '',
  },
  {
    field: 'maLop',
    headerName: 'Mã lớp',
    minWidth: 180,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.lopHoc?.maLop ?? '',
  },
  {
    field: 'ngayTiepNhan',
    headerName: 'Ngày tiếp nhận',
    minWidth: 140,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row?.ngayTiepNhan ? format(row?.ngayTiepNhan, 'dd/MM/yyyy') : '',
  },
] as GridColDef[];
