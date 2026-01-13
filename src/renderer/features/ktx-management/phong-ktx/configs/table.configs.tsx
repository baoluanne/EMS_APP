import { GridColDef } from '@mui/x-data-grid';

const statusFormatter = (value: string) => {
  const statusMap: Record<string, string> = {
    HOAT_DONG: 'Hoạt động',
    NGUNG_HOAT_DONG: 'Ngừng hoạt động',
  };
  return statusMap[value] || value;
};

const priceFormatter = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const phongKtxColumns: GridColDef[] = [
  {
    field: 'maPhong',
    headerName: 'Mã phòng',
    minWidth: 120,
    align: 'center',
    sortable: true,
  },
  {
    field: 'tenToaNha',
    headerName: 'Tòa nhà',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'soLuongGiuong',
    headerName: 'Số giường',
    minWidth: 120,
    type: 'number',
    align: 'center',
  },
  {
    field: 'soLuongDaO',
    headerName: 'Số giường đã ở',
    minWidth: 140,
    type: 'number',
    align: 'center',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 150,
    valueFormatter: (value) => statusFormatter(value),
  },
  {
    field: 'giaPhong',
    headerName: 'Giá phòng',
    minWidth: 150,
    type: 'number',
    align: 'right',
    valueFormatter: (value) => priceFormatter(value),
  },
];
