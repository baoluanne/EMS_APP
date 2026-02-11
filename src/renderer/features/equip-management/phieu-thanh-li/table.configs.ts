import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export interface PhieuThanhLyRow {
  id: string;
  soQuyetDinh: string;
  ngayThanhLy: string;
  lyDo: string;
  tongTienThuHoi: number;
  nguoiLapPhieu?: { hoDem?: string; ten?: string };
  chiTietThanhLys: Array<{
    thietBi?: { maThietBi: string; tenThietBi: string };
    giaBan: number;
  }>;
}

export const phieuThanhLyColumns: GridColDef<PhieuThanhLyRow>[] = [
  {
    field: 'soQuyetDinh',
    headerName: 'Số QĐ',
    width: 150,
  },
  {
    field: 'ngayThanhLy',
    headerName: 'Ngày thanh lý',
    width: 120,
    valueFormatter: (value) => value && format(new Date(value), 'dd/MM/yyyy'),
  },
  {
    field: 'danhSachThietBi',
    headerName: 'Thiết bị thanh lý',
    minWidth: 250,
    flex: 1.5,
    valueGetter: (_, row) => {
      if (!row.chiTietThanhLys || row.chiTietThanhLys.length === 0) return 'N/A';
      return row.chiTietThanhLys
        .map((ct) => `${ct.thietBi?.maThietBi} (${ct.thietBi?.tenThietBi})`)
        .join(', ');
    },
  },
  {
    field: 'tongTienThuHoi',
    headerName: 'Tổng thu hồi',
    width: 150,
    type: 'number',
    valueFormatter: (value) =>
      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0),
  },
  {
    field: 'nguoiLapPhieu',
    headerName: 'Người lập',
    width: 180,
    valueGetter: (_, row) => {
      return `${row.nguoiLapPhieu?.hoDem || ''} ${row.nguoiLapPhieu?.ten || ''}`.trim();
    },
  },
  {
    field: 'lyDo',
    headerName: 'Lý do',
    minWidth: 200,
    flex: 1,
  },
];
