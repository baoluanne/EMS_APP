import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { ThietLapQuyCheTinChi } from '@renderer/shared/types';

export const thongTinChungColumns: GridColDef<ThietLapQuyCheTinChi>[] = generateTableConfigs([
  {
    field: 'diemThuongKy',
    headerName: 'Điểm Thường Kỳ',
    flex: 1,
    minWidth: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'tenQuyChe',
    headerName: 'Tên Quy Chế',
    flex: 1,
    minWidth: 180,
    editable: true,
    sortable: true,
  },
  {
    field: 'bieuThuc',
    headerName: 'Biểu Thức',
    flex: 1,
    minWidth: 150,
    editable: true,
    sortable: true,
  },
  {
    field: 'tenQuyUocDiem',
    headerName: 'Tên Quy Ước Điểm',
    flex: 1,
    minWidth: 150,
    editable: true,
    sortable: true,
  },
]);
export const xetLenLopHocBongColumns: GridColDef<ThietLapQuyCheTinChi>[] = generateTableConfigs([
  {
    field: 'namThu',
    headerName: 'Năm thứ',
    flex: 1,
    minWidth: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'tcTichLuyTu',
    headerName: 'TC tích lũy từ',
    flex: 1,
    minWidth: 180,
    editable: true,
    sortable: true,
  },
  {
    field: 'tcTichLuyDen',
    headerName: 'TC tích lũy đến',
    flex: 1,
    minWidth: 150,
    editable: true,
    sortable: true,
  },
  {
    field: 'diemTBCTichLuy',
    headerName: 'Điểm TBC tích lũy',
    flex: 1,
    minWidth: 150,
    editable: true,
    sortable: true,
  },
]);
