import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export interface PhieuMuonTraRow {
  id: string;
  maPhieu: string;
  loaiDoiTuong: number;
  sinhVien?: { maSinhVien?: string; hoDem?: string; ten?: string };
  giangVien?: { maGiangVien?: string; hoDem?: string; ten?: string };
  chiTietPhieuMuons: Array<{
    thietBi?: { maThietBi: string; tenThietBi: string };
  }>;
  ngayMuon: string;
  ngayTraDuKien: string;
  trangThai: number;
  ghiChu: string;
}

export const phieuMuonTraColumns: GridColDef<PhieuMuonTraRow>[] = [
  {
    field: 'maPhieu',
    headerName: 'Mã phiếu',
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'tenNguoiMuon',
    headerName: 'Người mượn',
    minWidth: 180,
    flex: 1,
    valueGetter: (_, row) => {
      if (row.loaiDoiTuong === 0) {
        return `${row.sinhVien?.hoDem || ''} ${row.sinhVien?.ten || ''}`.trim() || 'N/A';
      }
      if (row.loaiDoiTuong === 1) {
        return `${row.giangVien?.hoDem || ''} ${row.giangVien?.ten || ''}`.trim() || 'N/A';
      }
      return 'N/A';
    },
  },
  {
    field: 'danhSachThietBi',
    headerName: 'Thiết bị mượn',
    minWidth: 250,
    flex: 1.5,
    // Lấy danh sách mã và tên thiết bị từ mảng chi tiết
    valueGetter: (_, row) => {
      if (!row.chiTietPhieuMuons || row.chiTietPhieuMuons.length === 0) return 'N/A';

      return row.chiTietPhieuMuons
        .map((ct) => `${ct.thietBi?.maThietBi} (${ct.thietBi?.tenThietBi})`)
        .join(', ');
    },
  },
  {
    field: 'ngayMuon',
    headerName: 'Ngày mượn',
    width: 120,
    valueFormatter: (value) => value && format(new Date(value), 'dd/MM/yyyy'),
  },
  {
    field: 'ngayTraDuKien',
    headerName: 'Hẹn trả',
    width: 120,
    valueFormatter: (value) => value && format(new Date(value), 'dd/MM/yyyy'),
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 120,
    renderCell: (params) => {
      const statusMap = ['Đang mượn', 'Đã trả', 'Quá hạn'];
      return statusMap[params.value as number] || 'N/A';
    },
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 150,
    flex: 1,
  },
];
