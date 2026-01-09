import { GridColDef } from '@mui/x-data-grid';
import { KiemKeTaiSan } from '../validation';

export const kiemKeTaiSanTableColumns: GridColDef<KiemKeTaiSan>[] = [
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
    valueGetter: (_, row: any) => {
      if (!row.ngayBatDau) return '';
      return new Date(row.ngayBatDau).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'ngayKetThuc',
    headerName: 'Ngày kết thúc',
    minWidth: 130,
    flex: 1,
    valueGetter: (_, row: any) => {
      if (!row.ngayKetThuc) return '';
      return new Date(row.ngayKetThuc).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'daHoanThanh',
    headerName: 'Đã hoàn thành',
    minWidth: 130,
    flex: 1,
    valueGetter: (_, row: any) => {
      if (row.daHoanThanh === true) return 'Có';
      if (row.daHoanThanh === false) return 'Không';
      return '';
    },
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 200,
    flex: 1,
  },
];
