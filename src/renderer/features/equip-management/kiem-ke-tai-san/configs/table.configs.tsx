import { GridColDef } from '@mui/x-data-grid';
import { KiemKeTaiSan } from '../validation';

export const kiemKeTaiSanTableColumns = (): GridColDef<KiemKeTaiSan>[] => [
  {
    field: 'tenDotKiemKe',
    headerName: 'Tên đợt kiểm kê',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'ngayBatDau',
    headerName: 'Ngày bắt đầu',
    minWidth: 130,
    flex: 1,
    valueGetter: (_, row) => {
      if (!row.ngayBatDau) return '';
      return new Date(row.ngayBatDau).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'ngayKetThuc',
    headerName: 'Ngày kết thúc',
    minWidth: 130,
    flex: 1,
    valueGetter: (_, row) => {
      if (!row.ngayKetThuc) return '';
      return new Date(row.ngayKetThuc).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'daHoanThanh',
    headerName: 'Trạng thái',
    minWidth: 130,
    flex: 1,
    valueGetter: (_, row) => (row.daHoanThanh ? 'Đã hoàn thành' : 'Chưa hoàn thành'),
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 200,
    flex: 1,
  },
];
