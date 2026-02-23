import { Button } from '@mui/material';
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
      if (row.loaiDoiTuong === 1) {
        return `${row.sinhVien?.hoDem || ''} ${row.sinhVien?.ten || ''}`.trim() || 'N/A';
      }
      if (row.loaiDoiTuong === 2) {
        return `${row.giangVien?.hoDem || ''} ${row.giangVien?.ten || ''}`.trim() || 'N/A';
      }
      return 'N/A';
    },
  },
  {
    field: 'danhSachThietBi',
    headerName: 'Thiết bị mượn',
    minWidth: 200,
    flex: 1.5,
    renderCell: (params) => {
      const chiTiet = params.row.chiTietPhieuMuons;
      if (!chiTiet || chiTiet.length === 0) return 'N/A';

      if (chiTiet.length === 1) {
        return `${chiTiet[0].thietBi?.maThietBi || 'N/A'}`;
      }

      return (
        <div style={{ whiteSpace: 'normal', lineHeight: '1.4' }}>
          {chiTiet.slice(0, 2).map((ct, idx) => (
            <div key={idx} style={{ fontSize: '0.75rem' }}>
              {ct.thietBi?.maThietBi || 'N/A'}
            </div>
          ))}
          {chiTiet.length > 2 && (
            <div style={{ fontSize: '0.7rem', color: '#666', fontStyle: 'italic' }}>
              +{chiTiet.length - 2} TB khác
            </div>
          )}
        </div>
      );
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
  {
    field: 'actions',
    headerName: 'Thao tác',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Button
        variant="outlined"
        size="small"
        color="success"
        onClick={(e) => {
          e.stopPropagation();
          (params as any).onReturn(params.row);
        }}
        disabled={params.row.trangThai === 1}
      >
        Trả thiết bị
      </Button>
    ),
  },
];
