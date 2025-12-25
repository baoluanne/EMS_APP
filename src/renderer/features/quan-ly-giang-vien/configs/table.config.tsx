import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { GiangVien, HocVi, LoaiGiangVien, ToBoMon } from '@renderer/shared/types';
import { renderEditCellSelection } from '@renderer/shared/utils';

// Example dropdown options
const loaiGVOptions = ['Cơ hữu', 'Thỉnh giảng'];
const toBoMonOptions = ['Công nghệ thông tin', 'Toán ứng dụng', 'Vật lý kỹ thuật'];
const phuongTienOptions = ['Xe máy', 'Ô tô', 'Xe đạp', 'Khác'];

export const giangVienTableColumns: GridColDef<GiangVien>[] = generateTableConfigs([
  { field: 'maGiangVien', headerName: 'Mã giảng viên', width: 90, editable: false },
  { field: 'hoDem', headerName: 'Họ đệm', width: 150, editable: false },
  { field: 'ten', headerName: 'Tên GV', width: 100, editable: false },
  { field: 'tenVietTat', headerName: 'Tên VT', width: 90, editable: false },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    type: 'date',
    width: 90,
    editable: false,
    valueGetter: (value: string) => new Date(value),
  },
  { field: 'soDienThoai', headerName: 'SĐT', width: 100, editable: false },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 200, editable: false },
  { field: 'diaChi', headerName: 'Địa chỉ', flex: 1, minWidth: 200, editable: false },
  {
    field: 'phuongTien',
    headerName: 'Phương tiện',
    width: 130,
    editable: false,
    renderEditCell: renderEditCellSelection(phuongTienOptions),
  },
  {
    field: 'loaiGiangVien',
    headerName: 'Loại GV',
    width: 120,
    editable: false,
    valueGetter: (value: LoaiGiangVien) => value.tenLoaiGiangVien,
    renderEditCell: renderEditCellSelection(loaiGVOptions),
  },
  {
    field: 'hocVi',
    headerName: 'Học vị',
    width: 120,
    editable: false,
    valueGetter: (value: HocVi) => value?.tenHocVi,
  },
  {
    field: 'toBoMon',
    headerName: 'Tổ bộ môn',
    width: 160,
    editable: false,
    valueGetter: (value: ToBoMon) => value?.tenToBoMon,
    renderEditCell: renderEditCellSelection(toBoMonOptions),
  },
  {
    field: 'isChamDutHopDong',
    headerName: 'Chấm dứt hợp đồng',
    width: 90,
    editable: false,
    type: 'boolean',
  },
  {
    field: 'isCoiThi',
    headerName: 'Coi thi',
    width: 90,
    editable: false,
    type: 'boolean',
  },
  {
    field: 'isVisible',
    headerName: 'Hiển thị',
    width: 90,
    editable: false,
    type: 'boolean',
  },
]);

export const importGiangVienColumns: GridColDef<GiangVien>[] = [
  { field: 'maGiangVien', headerName: 'Mã giảng viên', width: 100 },
  { field: 'hoDem', headerName: 'Họ đệm', width: 100 },
  { field: 'ten', headerName: 'Tên GV', width: 100 },
  {
    field: 'tenLoaiGiangVien',
    headerName: 'Loại GV',
    width: 100,
  },
  {
    field: 'tenKhoa',
    headerName: 'Khoa',
    width: 100,
  },
];
