import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { GIOI_TINH_MAP } from '@renderer/shared/constants';

export const timKiemSVColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    flex: 1,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    flex: 1.2,
    minWidth: 150,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'ten',
    headerName: 'Tên',
    flex: 0.8,
    minWidth: 100,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'gioiTinh',
    headerName: 'Giới tính',
    flex: 0.7,
    minWidth: 100,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => {
      const valueString = row.gioiTinh?.toString();
      return GIOI_TINH_MAP[valueString] || '';
    },
  },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    flex: 1,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) =>
      row?.ngaySinh ? new Date(row.ngaySinh).toLocaleDateString('vi-VN') : '',
  },
  {
    field: 'maLop',
    headerName: 'Mã lớp',
    flex: 1,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.lopHoc?.maLop ?? '',
  },
  {
    field: 'tenLop',
    headerName: 'Tên lớp',
    flex: 1.2,
    minWidth: 150,
    align: 'left',
    headerAlign: 'center',
    valueGetter: (_, row: any) => row?.lopHoc?.tenLop ?? row.tenLop ?? '',
  },
  {
    field: 'diaChi',
    headerName: 'Địa chỉ',
    flex: 1.5,
    minWidth: 200,
    align: 'left',
    headerAlign: 'center',
  },
]);
