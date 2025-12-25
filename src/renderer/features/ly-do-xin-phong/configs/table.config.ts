import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { LyDoXinPhong } from '@renderer/shared/types';

export const lyDoXinPhongColumns: GridColDef<LyDoXinPhong>[] = generateTableConfigs([
  { field: 'maLoaiXinPhong', headerName: 'Mã loại xin phòng', flex: 1, minWidth: 150 },
  { field: 'tenLoaiXinPhong', headerName: 'Tên loại xin phòng', flex: 1, minWidth: 200 },
  { field: 'soThuTu', headerName: 'Số thứ tự', flex: 1, minWidth: 80 },
]);
