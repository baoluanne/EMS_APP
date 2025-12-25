import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const danhMucLoaiHinhDaoTaoColumns: GridColDef[] = generateTableConfigs([
  { field: 'maLoaiDaoTao', headerName: 'Mã loại đào tạo', minWidth: 120, flex: 1, sortable: true },
  {
    field: 'tenLoaiDaoTao',
    headerName: 'Tên loại đào tạo',
    minWidth: 200,
    flex: 1,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  { field: 'tenTiengAnh', headerName: 'Tên tiếng Anh', minWidth: 150, flex: 1, sortable: true },
  {
    field: 'noiDung',
    headerName: 'Nội dung',
    minWidth: 150,
    flex: 1,
    sortable: true,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  { field: 'ghiChu', headerName: 'Ghi chú', minWidth: 150, flex: 1, sortable: true },
  {
    field: 'soThuTu',
    headerName: 'STT',
    width: 100,
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
  {
    field: 'hienThiGhiChu',
    headerName: 'Hiển Thị',
    width: 120,
    type: 'boolean',
    align: 'center' as const,
    headerAlign: 'center' as const,
  },
]);
