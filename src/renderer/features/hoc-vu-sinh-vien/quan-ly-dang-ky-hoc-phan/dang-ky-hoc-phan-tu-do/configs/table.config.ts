import { GridColDef } from '@mui/x-data-grid';

export const dsHocPhanDangMoColumns: GridColDef[] = [
  {
    field: 'index',
    headerName: '*',
    width: 50,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  {
    field: 'maHp',
    headerName: 'Mã học phần',
    width: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'maLHP',
    headerName: 'Mã LHP',
    flex: 1,
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    flex: 1,
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'lopDuKien',
    headerName: 'Lớp dự kiến',
    flex: 1,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'STC',
    headerName: 'STC',
    flex: 1,
    minWidth: 100,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
];

export const dsHocPhanDaDangKyTableColumns: GridColDef[] = [
  ...dsHocPhanDangMoColumns,
  {
    field: 'dot',
    headerName: 'Đợt',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
];
