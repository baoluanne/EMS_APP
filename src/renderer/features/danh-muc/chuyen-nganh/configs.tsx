import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { ChuyenNganhDaoTao } from './validations';
import { NganhHoc } from '@renderer/shared/types';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const ChuyenNganhColumns: GridColDef<ChuyenNganhDaoTao>[] = generateTableConfigs([
  {
    field: 'maChuyenNganh',
    headerName: 'Mã chuyên ngành',
    flex: 2,
    minWidth: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'tenChuyenNganh',
    headerName: 'Tên chuyên ngành',
    minWidth: 200,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    flex: 2,
  },
  {
    field: 'nganhHoc',
    headerName: 'Ngành',
    minWidth: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    flex: 2,
    valueGetter: (value: NganhHoc) => value?.tenNganhHoc || '',
  },
  {
    field: 'stt',
    headerName: 'STT',
    minWidth: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    type: 'number',
    flex: 0.5,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    flex: 2,
  },
  {
    field: 'tenVietTat',
    headerName: 'Tên viết tắt',
    minWidth: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    flex: 2,
  },
  {
    field: 'tenTiengAnh',
    headerName: 'Tên tiếng anh',
    minWidth: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    flex: 2,
  },
  {
    field: 'isVisible',
    headerName: 'Hiển Thị',
    width: 120,
    type: 'boolean',
    minWidth: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    flex: 0.5,
  },
]);
