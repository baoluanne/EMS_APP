import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const quanLyQuyUocCachTinhDiemMonHocColumns = generateTableConfigs([
  {
    field: 'maMonHoc',
    headerName: 'Mã môn học',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row: any) => row.monHoc?.maMonHoc || '',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    minWidth: 150,
    flex: 1,
    sortable: true,
    valueGetter: (_, row: any) => row.monHoc?.tenMonHoc || '',
  },
  { field: 'dvhT_TC', headerName: 'ĐVHT/STC', minWidth: 120, flex: 1, sortable: true },
]);
