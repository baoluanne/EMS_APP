import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { format } from 'date-fns';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v || 0);

const phamViMap: Record<string, string> = {
  TatCa: 'Toàn trường',
  Lop: 'Theo Lớp',
  Nganh: 'Theo Ngành',
  SinhVien: 'Cá nhân',
  DoiTuong: 'Đối tượng CS',
};

export const columns: GridColDef[] = generateTableConfigs([
  {
    field: 'tenChinhSach',
    headerName: 'Tên chính sách',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'namHocHocKy',
    headerName: 'Áp dụng cho kỳ',
    width: 150,
    valueGetter: (_, r) => r.namHocHocKy?.tenDot || 'Tất cả',
  },
  {
    field: 'apDungCho',
    headerName: 'Phạm vi',
    width: 140,
    renderCell: (p) => {
      return <span style={{ fontWeight: 500 }}>{phamViMap[p.value as string] || p.value}</span>;
    },
  },
  {
    field: 'giaTri',
    headerName: 'Giá trị miễn giảm',
    width: 160,
    renderCell: (params) => {
      const row = params.row;
      if (row.loaiChinhSach === 'PhanTram') {
        return (
          <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>{params.value}% Học phí</span>
        );
      }
      return (
        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>{formatCurrency(params.value)}</span>
      );
    },
  },
  {
    field: 'thoiGian',
    headerName: 'Thời gian hiệu lực',
    width: 200,
    valueGetter: (_, r) => {
      const start = r.ngayBatDau ? format(new Date(r.ngayBatDau), 'dd/MM/yyyy') : '...';
      const end = r.ngayKetThuc ? format(new Date(r.ngayKetThuc), 'dd/MM/yyyy') : '...';
      return `${start} - ${end}`;
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 120,
    renderCell: (p) => {
      const isActive = p.row.dangKichHoat !== false;
      return (
        <span
          style={{
            color: isActive ? '#388e3c' : '#d32f2f',
            padding: '2px 8px',
            fontSize: '12px',
          }}
        >
          {isActive ? 'Đang áp dụng' : 'Đã khóa'}
        </span>
      );
    },
  },
]);
