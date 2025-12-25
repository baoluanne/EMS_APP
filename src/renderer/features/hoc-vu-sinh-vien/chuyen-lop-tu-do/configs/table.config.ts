import { GridColDef } from '@mui/x-data-grid';

export const columnsHocPhanCu: GridColDef[] = [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  {
    field: 'maHocPhan',
    headerName: 'Mã học phần',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopHocPhan?.maHocPhan;
    },
  },
  {
    field: 'maLopHP',
    headerName: 'Mã lớp HP',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopHocPhan?.maLopHocPhan;
    },
  },
  {
    field: 'tenHocPhan',
    headerName: 'Tên học phần',
    flex: 1,
    minWidth: 250,
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopHocPhan?.tenLopHocPhan;
    },
  },
  { field: 'stc', headerName: 'STC', width: 100, align: 'center', headerAlign: 'center' },
  { field: 'diem', headerName: 'Điểm', width: 100, align: 'center', headerAlign: 'center' },
  { field: 'dat', headerName: 'Đạt', width: 100, align: 'center', headerAlign: 'center' },
  { field: 'huy', headerName: 'Hủy', width: 100, align: 'center', headerAlign: 'center' },
];

export const columnsHocPhanMoi: GridColDef[] = [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  {
    field: 'maHocPhan',
    headerName: 'Mã học phần',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.maHocPhan;
    },
  },
  {
    field: 'maLopHP',
    headerName: 'Mã lớp HP',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopHocPhan?.maLopHocPhan;
    },
  },
  {
    field: 'tenHocPhan',
    headerName: 'Tên học phần',
    flex: 1,
    minWidth: 250,
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.tenHocPhan;
    },
  },
  {
    field: 'lopDuKien',
    headerName: 'Lớp dự kiến',
    width: 180,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => {
      return row.lopDuKien;
    },
  },
  { field: 'soTinChi', headerName: 'STC', width: 80, align: 'center', headerAlign: 'center' },
  { field: 'mucNop', headerName: 'Mức nộp', width: 120, align: 'center', headerAlign: 'center' },
];

export const columnsKeHoachThuCu: GridColDef[] = [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  { field: 'dot', headerName: 'Đợt', width: 100, align: 'center', headerAlign: 'center' },
  { field: 'hocKy', headerName: 'Học kỳ', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'noiDung', headerName: 'Nội dung', flex: 1, minWidth: 250, headerAlign: 'center' },
  { field: 'daNop', headerName: 'Đã nộp', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'soTien', headerName: 'Số tiền', width: 120, align: 'center', headerAlign: 'center' },
];

export const columnsKeHoachThuMoi: GridColDef[] = [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  { field: 'dot', headerName: 'Đợt', width: 100, align: 'center', headerAlign: 'center' },
  { field: 'hocKy', headerName: 'Học kỳ', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'noiDung', headerName: 'Nội dung', flex: 1, minWidth: 250, headerAlign: 'center' },
  { field: 'soTien', headerName: 'Số tiền', width: 120, align: 'center', headerAlign: 'center' },
];

export const columnsKeHoachThuChungCu: GridColDef[] = [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  { field: 'namHoc', headerName: 'Năm học', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'noiDung', headerName: 'Nội dung', flex: 1, minWidth: 250, headerAlign: 'center' },
  { field: 'soTien', headerName: 'Số tiền', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'batBuoc', headerName: 'Bắt buộc', width: 120, align: 'center', headerAlign: 'center' },
  {
    field: 'khongTruyCuu',
    headerName: 'Không truy cứu công nợ',
    width: 220,
    align: 'center',
    headerAlign: 'center',
  },
];

export const columnsKeHoachThuChungMoi: GridColDef[] = [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  { field: 'namHoc', headerName: 'Năm học', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'noiDung', headerName: 'Nội dung', flex: 1, minWidth: 250, headerAlign: 'center' },
  { field: 'soTien', headerName: 'Số tiền', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'batBuoc', headerName: 'Bắt buộc', width: 120, align: 'center', headerAlign: 'center' },
];
