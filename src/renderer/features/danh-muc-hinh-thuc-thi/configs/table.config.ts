import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const hinhThucThiColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maHinhThucThi',
    headerName: 'Mã hình thức thi',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenHinhThucThi',
    headerName: 'Tên hình thức thi',
    flex: 1.5,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'soGiangVien',
    headerName: 'Số giảng viên',
    type: 'number',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'heSoChamThi',
    headerName: 'Hệ số chấm thi',
    type: 'number',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'stt',
    headerName: 'STT',
    type: 'number',
    flex: 0.5,
    minWidth: 80,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'bieuMauDanhSachDuThi',
    headerName: 'Biểu mẫu danh sách dự thi',
    type: 'number',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value: any) => value?.tenBieuMau,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    flex: 1.5,
    minWidth: 200,
    align: 'left',
    headerAlign: 'center',
  },
]);
