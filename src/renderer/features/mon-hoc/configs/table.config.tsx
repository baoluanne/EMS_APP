import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { Khoa, KhoiKienThuc, MonHoc } from '@renderer/shared/types';
import { renderEditCellSelection } from '@renderer/shared/utils';

const khoaChuQuanOptions = ['Khoa Toán', 'Khoa Vật Lý', 'Khoa Hóa Học'];
const khoiKienThucOptions = [
  'Cơ sở ngành',
  'Chuyên ngành',
  'Toán học',
  'Ngoại ngữ',
  'Khoa học cơ bản',
];

export const monHocTableColumns: GridColDef<MonHoc>[] = generateTableConfigs([
  { field: 'maMonHoc', headerName: 'Mã môn học', sortable: true, width: 120, editable: false },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    sortable: true,
    flex: 1,
    minWidth: 200,
    editable: false,
  },
  {
    field: 'tenTiengAnh',
    headerName: 'Tên tiếng Anh',
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'tenVietTat',
    headerName: 'Tên viết tắt',
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'khoa',
    headerName: 'Khoa chủ quản',
    sortable: true,
    width: 130,
    editable: false,
    valueGetter: (value: Khoa) => value?.tenKhoa,
    renderEditCell: renderEditCellSelection(khoaChuQuanOptions),
  },
  {
    field: 'maTuQuan',
    headerName: 'Mã tự quản',
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'loaiMonHoc',
    headerName: 'Loại môn học',
    sortable: true,
    width: 130,
    editable: false,
    valueGetter: (value: any) => value?.tenLoaiMonHoc,
  },
  {
    field: 'khoiKienThuc',
    headerName: 'Khối kiến thức',
    width: 160,
    sortable: true,
    editable: false,
    valueGetter: (value: KhoiKienThuc) => value?.tenKhoiKienThuc,
    renderEditCell: renderEditCellSelection(khoiKienThucOptions),
  },

  {
    field: 'tinhChatMonHoc',
    headerName: 'Tính chất',
    sortable: true,
    width: 130,
    editable: false,
    valueGetter: (value: any) => value?.tenTinhChatMonHoc,
  },
  {
    field: 'toBoMon',
    headerName: 'Tổ bộ môn',
    sortable: true,
    width: 130,
    editable: false,
    valueGetter: (value: any) => value?.tenToBoMon,
  },
  {
    field: 'loaiTiet',
    headerName: 'Loại tiết',
    sortable: true,
    width: 130,
    editable: false,
    valueGetter: (value: any) => value?.tenLoaiTiet,
  },
  {
    field: 'isKhongTinhTBC',
    headerName: 'Không tính TBC',
    minWidth: 150,
    type: 'boolean',
    sortable: true,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    flex: 1,
    minWidth: 100,
    sortable: true,
    editable: false,
  },
]);

export const importMonHocTableColumns: GridColDef<MonHoc>[] = [
  { field: 'maMonHoc', headerName: 'Mã môn học', width: 100 },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    width: 100,
  },
  {
    field: 'tenLoaiMonHoc',
    headerName: 'Loại môn học',
    width: 100,
  },
  {
    field: 'tenKhoa',
    headerName: 'Khoa',
    width: 100,
  },
];
