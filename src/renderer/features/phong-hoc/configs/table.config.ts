import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { DiaDiemPhong, PhongHoc } from '@renderer/shared/types';

export const phongHocColumns: GridColDef<PhongHoc>[] = generateTableConfigs([
  { field: 'maPhong', headerName: 'Mã phòng', flex: 1, minWidth: 150 },
  { field: 'tenPhong', headerName: 'Tên phòng', flex: 1, minWidth: 150 },
  {
    field: 'tcMonHoc',
    headerName: 'Tên môn học',
    flex: 1,
    minWidth: 200,
    valueGetter: (value: any) => value?.tenTinhChatMonHoc,
  },
  {
    field: 'loaiPhong',
    headerName: 'Loại phòng',
    flex: 1,
    minWidth: 200,
    valueGetter: (value: any) => value?.tenLoaiPhong,
  },
  {
    field: 'dayNha',
    headerName: 'Dãy nhà',
    flex: 1,
    minWidth: 150,
    valueGetter: (value: any) => value?.tenDayNha,
  },
  {
    field: 'soBan',
    headerName: 'Dãy nhà',
    flex: 1,
    minWidth: 90,
  },
  {
    field: 'soChoNgoi',
    headerName: 'Số chỗ ngồi',
    flex: 1,
    minWidth: 90,
  },
  {
    field: 'soChoThi',
    headerName: 'Số chỗ thi',
    flex: 1,
    minWidth: 90,
  },
  {
    field: 'IsNgungDungMayChieu',
    headerName: 'Ngưng dùng máy chiếu',
    flex: 1,
    minWidth: 90,
    type: 'boolean',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    flex: 1,
    minWidth: 90,
  },
]);

export const danhSachKhoaSuDungColumns: GridColDef<DiaDiemPhong>[] = generateTableConfigs([
  { field: 'maMonHoc', headerName: 'Mã môn học', flex: 1, minWidth: 150 },
  { field: 'tenMonHoc', headerName: 'Tên môn học', flex: 1, minWidth: 200 },
  { field: 'tienQuyHB', headerName: 'Tiền quỹ HB', flex: 1, minWidth: 80 },
]);

export const importPhongHocColumns: GridColDef<PhongHoc>[] = [
  { field: 'maPhong', headerName: 'Mã phòng', flex: 1, minWidth: 100 },
  { field: 'tenPhong', headerName: 'Tên phòng', flex: 1, minWidth: 100 },
  {
    field: 'tenDayNha',
    headerName: 'Dãy nhà',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'tenLoaiPhong',
    headerName: 'Loại phòng',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'tenTinhChatMonHoc',
    headerName: 'Tính chất môn học',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'isNgungDungMayChieu',
    headerName: 'Máy chiếu',
    flex: 1,
    minWidth: 100,
  },
];
