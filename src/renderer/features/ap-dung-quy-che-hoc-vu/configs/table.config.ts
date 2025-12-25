import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { ApDungQuyCheHocVu, BacDaoTao, KhoaHoc, LoaiDaoTao } from '@renderer/shared/types';

export const ApDungQuyCheHocVuColumns: GridColDef<ApDungQuyCheHocVu>[] = generateTableConfigs([
  {
    field: 'khoaHoc',
    headerName: 'Khoá học',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    flex: 1,
    valueGetter: (value: KhoaHoc) => value?.tenKhoaHoc || '',
  },
  {
    field: 'bacDaoTao',
    headerName: 'Bậc đào tạo',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    flex: 1,
    valueGetter: (value: BacDaoTao) => value?.tenBacDaoTao || '',
  },
  {
    field: 'loaiDaoTao',
    headerName: 'Loại đào tạo',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    flex: 1,
    valueGetter: (value: LoaiDaoTao) => value?.tenLoaiDaoTao || '',
  },
  {
    field: 'idQuyCheTC',
    headerName: 'Quy chế',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    flex: 1,
    valueGetter: (_, row) =>
      row.quyCheNC?.quyCheHocVu?.tenQuyChe || row.quyCheTC?.quyCheHocVu?.tenQuyChe,
  },
  {
    field: 'choPhepNoMon',
    headerName: 'Cho phép nợ môn',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    width: 180,
    flex: 1,
  },
  {
    field: 'choPhepNoDVHT',
    headerName: 'Cho phép nợ ĐVHT',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    width: 180,
    flex: 1,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
    flex: 1,
  },
]);
