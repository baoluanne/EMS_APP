import { GridAlignment } from '@mui/x-data-grid';
import { DataGridTable } from '@renderer/components/Table';

const columns = [
  {
    field: 'maLop',
    headerName: 'Mã lớp',
    minWidth: 80,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'tenLop',
    headerName: 'Tên lớp',
    minWidth: 80,
    flex: 1,
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
];

const mocks = [
  {
    maLop: '00001',
    tenLop: 'Lớp #1',
  },
  {
    maLop: '00002',
    tenLop: 'Lớp #2',
  },
];

export const LopTable = () => {
  return <DataGridTable columns={columns} rows={mocks} getRowId={(row) => row.maLop} />;
};
