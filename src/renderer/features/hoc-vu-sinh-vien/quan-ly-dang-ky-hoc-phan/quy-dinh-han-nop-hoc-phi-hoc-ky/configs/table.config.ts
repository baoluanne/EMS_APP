import { GridColDef } from '@mui/x-data-grid';

export const quyDinhHanNopHocPhiHocKyColumns: GridColDef[] = [
  {
    field: 'khoaHoc',
    headerName: 'Khóa học',
    flex: 1,
    minWidth: 150,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'bacDaoTao',
    headerName: 'Bậc đào tạo',
    flex: 1,
    minWidth: 150,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayHetHanHP1',
    headerName: 'Ngày hết hạn HP1',
    flex: 1,
    minWidth: 150,
    type: 'date',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayHetHanHP2',
    headerName: 'Ngày hết hạn HP2',
    flex: 1,
    minWidth: 150,
    type: 'date',
    align: 'center',
    headerAlign: 'center',
  },
];

