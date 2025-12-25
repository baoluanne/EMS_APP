import { GridColDef } from '@mui/x-data-grid';

export const lopHocColumns: GridColDef[] = [
  {
    field: 'index',
    headerName: '*',
    width: 50,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  {
    field: 'maLop',
    headerName: 'Mã Lớp Học',
    type: 'string',
    minWidth: 120,
    flex: 1,
    sortable: true,
  },
  {
    field: 'tenLop',
    headerName: 'Tên Lớp Học',
    type: 'string',
    minWidth: 120,
    flex: 1,
    sortable: true,
  },
];
