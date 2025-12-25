import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { LoaiChungChi } from '@renderer/shared/types';

export const loaiChungChiColumns: GridColDef<LoaiChungChi>[] = generateTableConfigs([
  { field: 'maLoaiChungChi', headerName: 'Mã loại chứng chỉ', flex: 1, minWidth: 150 },
  { field: 'tenLoaiChungChi', headerName: 'Tên loại chứng chỉ', flex: 1, minWidth: 200 },
  { field: 'stt', headerName: 'Số thứ tự', flex: 0.5, minWidth: 80 },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 1, minWidth: 200 },
]);
