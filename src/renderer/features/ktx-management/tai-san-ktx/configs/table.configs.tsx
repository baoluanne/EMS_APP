import { GridColDef } from '@mui/x-data-grid';
//import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { Chip } from '@mui/material';

const getTinhTrangColor = (tinhTrang: string) => {
  switch (tinhTrang) {
    case 'Tot':
      return 'success';
    case 'BinhThuong':
      return 'info';
    case 'CanSuaChua':
      return 'warning';
    case 'Hong':
      return 'error';
    default:
      return 'default';
  }
};

const getTinhTrangLabel = (tinhTrang: string) => {
  switch (tinhTrang) {
    case 'Tot':
      return 'Tốt';
    case 'BinhThuong':
      return 'Bình thường';
    case 'CanSuaChua':
      return 'Cần sửa chữa';
    case 'Hong':
      return 'Hỏng';
    default:
      return tinhTrang;
  }
};

export const taiSanKtxColumns: GridColDef[] = [
  {
    field: 'maTaiSan',
    headerName: 'Mã tài sản',
    minWidth: 120,
    flex: 0.8,
  },
  {
    field: 'tenTaiSan',
    headerName: 'Tên tài sản',
    minWidth: 200,
    flex: 1.5,
  },
  {
    field: 'maPhong',
    headerName: 'Phòng',
    minWidth: 120,
    flex: 0.8,
    valueGetter: (value: any, row: any) => {
      return row.maPhong || 'Chưa gán';
    },
  },
  {
    field: 'tenToaNha',
    headerName: 'Tòa nhà',
    minWidth: 120,
    flex: 0.8,
    valueGetter: (value: any, row: any) => {
      return row.tenToaNha || '-';
    },
  },
  {
    field: 'tinhTrang',
    headerName: 'Tình trạng',
    minWidth: 130,
    flex: 0.8,
    renderCell: (params) => (
      <Chip
        label={getTinhTrangLabel(params.value)}
        color={getTinhTrangColor(params.value) as any}
        size="small"
      />
    ),
  },
  {
    field: 'giaTri',
    headerName: 'Giá trị (VNĐ)',
    minWidth: 130,
    flex: 0.8,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (value) => {
      if (value == null) return '';
      return new Intl.NumberFormat('vi-VN').format(value);
    },
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 150,
    flex: 1,
  },
];