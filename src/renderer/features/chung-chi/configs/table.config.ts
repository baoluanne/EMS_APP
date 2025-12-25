import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { ChungChi } from '@renderer/shared/types';

export const chungChiColumns: GridColDef<ChungChi>[] = generateTableConfigs([
  { field: 'tenLoaiChungChi', headerName: 'Chứng chỉ', flex: 1, minWidth: 150 },
  {
    field: 'loaiChungChi',
    headerName: 'Loại chứng chỉ',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => params.value.tenLoaiChungChi,
  },
  { field: 'kyHieu', headerName: 'Ký hiệu', flex: 1, minWidth: 100 },
  { field: 'giaTri', headerName: 'Giá trị', flex: 1, minWidth: 140, type: 'number' },
  { field: 'hocPhi', headerName: 'Học phí', flex: 1, minWidth: 140, type: 'number' },
  { field: 'lePhiThi', headerName: 'Lệ phí thi', flex: 1, minWidth: 150, type: 'number' },
  { field: 'thoiHan', headerName: 'Thời hạn', flex: 1, minWidth: 140, type: 'number' },
  { field: 'diemQuyDinh', headerName: 'Điểm quy định', flex: 1, minWidth: 140 },
  { field: 'ghiChu', headerName: 'Ghi chú', flex: 1, minWidth: 200 },
]);
