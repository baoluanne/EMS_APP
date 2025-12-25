import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { LoaiHanhViViPham } from '@renderer/shared/types';

export const loaiViPhamColumns: GridColDef<LoaiHanhViViPham>[] = generateTableConfigs([
  {
    field: 'stt',
    headerName: 'STT',
    width: 60,
    align: 'center',
    headerAlign: 'center',
    sortable: true,
    filterable: false,
  },
  {
    field: 'maLoaiHanhVi',
    headerName: 'Mã loại hành vi',
    minWidth: 120,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenLoaiHanhVi',
    headerName: 'Tên loại hành vi',
    minWidth: 180,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'diemTruToiDa',
    headerName: 'Điểm trừ tối đa',
    minWidth: 140,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    sortable: true,
    filterable: false,
  },

  {
    field: 'nhomLoaiHanhVi',
    headerName: 'Nhóm loại hành vi',
    minWidth: 150,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row.tenLoaiHanhVi,
  },
  {
    field: 'isDiemTruCaoNhat',
    headerName: 'Điểm trừ cao nhất',
    minWidth: 150,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    type: 'boolean',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 180,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
]);
