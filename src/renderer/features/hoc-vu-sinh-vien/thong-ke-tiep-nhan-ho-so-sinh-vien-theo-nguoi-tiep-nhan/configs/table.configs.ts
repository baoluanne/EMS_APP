import type { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const danhSachNguoiTiepNhanColumns = generateTableConfigs([
  {
    field: 'maNhanSu',
    headerName: 'Mã nhân sự',
    minWidth: 160,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    minWidth: 180,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'ten',
    headerName: 'Tên',
    minWidth: 120,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'tongSinhVien',
    headerName: 'Tổng sinh viên',
    minWidth: 160,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row.tongSinhVien ?? 0,
  },
]) as GridColDef[];

export const danhSachSinhVienColumns = generateTableConfigs([
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    minWidth: 140,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    minWidth: 160,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'ten',
    headerName: 'Tên',
    minWidth: 120,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'gioiTinh',
    headerName: 'Giới tính',
    minWidth: 110,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row.gioiTinh ?? '',
  },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    minWidth: 140,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row.ngaySinh || '',
  },
  {
    field: 'lopHoc',
    headerName: 'Lớp học',
    minWidth: 160,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row.lopHoc?.tenLopHoc || row.lopHoc || '',
  },
]) as GridColDef[];
