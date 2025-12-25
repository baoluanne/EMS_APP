import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const capNhatNgayHetHanNopHocPhiLopHocPhanColumns: GridColDef[] = [
  {
    field: 'index',
    headerName: '*',
    width: 50,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  {
    field: 'maLopHocPhan',
    headerName: 'Mã lớp học phần',
    flex: 1,
    minWidth: 150,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'maHocPhan',
    headerName: 'Mã học phần',
    flex: 1,
    minWidth: 130,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenHocPhan',
    headerName: 'Tên học phần',
    flex: 1.5,
    minWidth: 200,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'lopDuKien',
    headerName: 'Lớp dự kiến',
    flex: 1,
    minWidth: 140,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    flex: 1,
    minWidth: 140,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'siSoQuyDinh',
    headerName: 'Sĩ số quy định',
    flex: 1,
    minWidth: 140,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ngayHetHanNopHP1',
    headerName: 'Ngày hết hạn nộp HP 1',
    flex: 1,
    minWidth: 180,
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value: Date | string) => {
      if (!value) return '';
      const date = typeof value === 'string' ? new Date(value) : value;
      return date ? format(date, 'dd/MM/yyyy') : '';
    },
  },
  {
    field: 'ngayHetHanNopHP2',
    headerName: 'Ngày hết hạn nộp HP 2',
    flex: 1,
    minWidth: 180,
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value: Date | string) => {
      if (!value) return '';
      const date = typeof value === 'string' ? new Date(value) : value;
      return date ? format(date, 'dd/MM/yyyy') : '';
    },
  },
  {
    field: 'coSo',
    headerName: 'Cơ sở',
    flex: 1,
    minWidth: 150,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'khoaChuQuan',
    headerName: 'Khoa chủ quản',
    flex: 1,
    minWidth: 160,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
];

