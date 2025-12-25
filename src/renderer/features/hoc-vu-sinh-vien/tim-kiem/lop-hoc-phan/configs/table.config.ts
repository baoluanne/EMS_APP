import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { TRANG_THAI_LHP_MAP } from '@renderer/shared/constants';

export const timKiemLHPColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maLopHocPhan',
    headerName: 'Mã lớp học phần',
    flex: 1,
    minWidth: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.maLopHocPhan ?? '',
  },
  {
    field: 'maHocPhan',
    headerName: 'Mã học phần',
    flex: 1.5,
    minWidth: 220,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.maHocPhan ?? '',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    flex: 1.5,
    minWidth: 220,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.monHoc?.tenMonHoc ?? '',
  },
  {
    field: 'tenLop',
    headerName: 'Lớp dự kiến',
    flex: 1,
    minWidth: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      return row.lopDuKiens ? row.lopDuKiens?.map((x: any) => x?.lopDuKien?.tenLop).join(', ') : '';
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái LHP',
    flex: 1,
    minWidth: 160,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => TRANG_THAI_LHP_MAP[row?.trangThai?.toString()] ?? '',
  },
  {
    field: 'tenKhoa',
    headerName: 'Khoa chủ quản',
    flex: 1.2,
    minWidth: 180,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.khoaChuQuan?.tenKhoa ?? '',
  },
  {
    field: 'tenCoSo',
    headerName: 'Cơ sở',
    flex: 1.2,
    minWidth: 180,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.coSo?.tenCoSo ?? '',
  },
]);
