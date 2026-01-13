import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

export const taiSanKtxColumns: GridColDef[] = [
  {
    field: 'maTaiSan',
    headerName: 'Mã tài sản',
    width: 120,
  },
  {
    field: 'tenTaiSan',
    headerName: 'Tên tài sản',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'maPhong',
    headerName: 'Phòng',
    width: 120,
    valueGetter: (_, row) => row.maPhong || 'Chưa gán',
  },
  {
    field: 'tinhTrang',
    headerName: 'Tình trạng',
    width: 150,
    renderCell: (params) => {
      const status = params.value;
      let color: 'success' | 'warning' | 'error' | 'default' = 'default';
      let label = status;

      switch (status) {
        case 'Tot':
          color = 'success';
          label = 'Tốt';
          break;
        case 'BinhThuong':
          color = 'default';
          label = 'Bình thường';
          break;
        case 'CanSuaChua':
          color = 'warning';
          label = 'Cần sửa chữa';
          break;
        case 'Hong':
          color = 'error';
          label = 'Hỏng';
          break;
      }
      return <Chip label={label} color={color} size="small" variant="outlined" />;
    },
  },
  {
    field: 'giaTri',
    headerName: 'Giá trị (VNĐ)',
    width: 150,
    align: 'right',
    valueFormatter: (value) => (value ? new Intl.NumberFormat('vi-VN').format(value) : '0'),
  },
];
