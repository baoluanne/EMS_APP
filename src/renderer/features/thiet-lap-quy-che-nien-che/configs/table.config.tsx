import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { ThietLapQuyCheTinChi } from '@renderer/shared/types';

export const thongTinChungColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'dvht',
    headerName: 'ĐVHT',
    flex: 1,
    editable: true,
    sortable: true,
    align: 'center',
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'soLanKiemTraThuongKy',
    headerName: 'Số lần kiểm tra thường kỳ',
    flex: 1,
    minWidth: 200,
    editable: true,
    sortable: true,
    align: 'center',
    headerAlign: 'center' as GridAlignment,
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
