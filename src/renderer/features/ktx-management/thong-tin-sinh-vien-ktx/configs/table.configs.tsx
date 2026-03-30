import { GridColDef } from '@mui/x-data-grid';
import { Chip, Typography, Tooltip } from '@mui/material';
import { Wc } from '@mui/icons-material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const roomColumns: GridColDef[] = [
  {
    field: 'maPhong',
    headerName: 'Phòng',
    flex: 1,
    renderCell: (p: any) => <b>{p.value}</b>,
  },
  {
    field: 'loaiPhong',
    headerName: 'Loại',
    flex: 1,
    renderCell: (p: any) => (
      <Chip size="small" label={p.value} icon={<Wc sx={{ fontSize: 14 }} />} />
    ),
  },
  {
    field: 'soLuongGiuong',
    headerName: 'Tổng giường',
    flex: 1,
    align: 'center' as const,
  },
  {
    field: 'occupied',
    headerName: 'Đang ở',
    flex: 1,
    align: 'center' as const,
    valueGetter: (_: any, row: any) =>
      row.giuongs?.filter((g: any) => g.trangThai === 1).length || 0,
  },
  {
    field: 'available',
    headerName: 'Giường trống',
    flex: 1,
    align: 'center' as const,
    renderCell: (p: any) => {
      const empty =
        (p.row.soLuongGiuong || 0) -
        (p.row.giuongs?.filter((g: any) => g.trangThai === 1).length || 0);
      return (
        <Typography
          variant="body2"
          fontWeight={700}
          color={empty > 0 ? 'success.main' : 'error.main'}
        >
          {empty}
        </Typography>
      );
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    flex: 0.8,
    align: 'center' as const,
    renderCell: (p: any) => (
      <Chip
        size="small"
        label={p.value === 0 ? 'Hoạt động' : 'Không hoạt động'}
        color={p.value === 0 ? 'success' : 'error'}
        variant="outlined"
      />
    ),
  },
  {
    field: 'ngayTao',
    headerName: 'Ngày tạo',
    flex: 1,
    renderCell: (p: any) => {
      if (!p.value) return '---';
      return (
        <Tooltip title={p.value}>
          <Typography variant="caption">
            {format(new Date(p.value), 'dd/MM/yyyy', { locale: vi })}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    field: 'ngayCapNhat',
    headerName: 'Ngày cập nhật',
    flex: 1,
    renderCell: (p: any) => {
      if (!p.value) return '---';
      return (
        <Tooltip title={p.value}>
          <Typography variant="caption">
            {format(new Date(p.value), 'dd/MM/yyyy', { locale: vi })}
          </Typography>
        </Tooltip>
      );
    },
  },
];

export const getStudentResidencyColumns = (): GridColDef[] => [
  {
    field: 'maSinhVien',
    headerName: 'MSSV',
    flex: 1,
    renderCell: (p) => (
      <Typography variant="body2" fontWeight={700} color="primary.main">
        {p.row.sinhVien?.maSinhVien || '---'}
      </Typography>
    ),
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    flex: 1.5,
    valueGetter: (_, row: any) => row.sinhVien?.fullName || '---',
  },
  {
    field: 'maPhong',
    headerName: 'Phòng',
    flex: 1,
    valueGetter: (_, row: any) => row.phongKtx?.maPhong || '---',
  },
  {
    field: 'maGiuong',
    headerName: 'Giường',
    flex: 1,
    valueGetter: (_, row: any) => {
      const g = row.giuongKtx?.maGiuong || '';
      if (!g) return '---';
      const parts = g.split('-');
      return parts[parts.length - 1];
    },
  },
  {
    field: 'soDienThoai',
    headerName: 'SĐT',
    flex: 1,
    valueGetter: (_, row: any) => row.sinhVien?.soDienThoai || '---',
  },
  {
    field: 'ngayVao',
    headerName: 'Ngày vào',
    flex: 1,
    renderCell: (p: any) => {
      if (!p.value) return '---';
      return format(new Date(p.value), 'dd/MM/yyyy');
    },
  },
  {
    field: 'thoiGianLuuTru',
    headerName: 'Thời gian ở',
    flex: 1,
    align: 'center',
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    flex: 1,
    align: 'center',
    renderCell: (p: any) => {
      const isRoiKtx = p.row.trangThai === 1;
      if (isRoiKtx)
        return <Chip label="Rời KTX" color="default" size="small" sx={{ fontWeight: 700 }} />;

      const roiKtxStr = p.row.ngayRoiKtx;
      if (!roiKtxStr) return null;
      const roiKtx = new Date(roiKtxStr);
      const now = new Date();
      const warning = new Date();
      warning.setDate(warning.getDate() + 15);

      if (roiKtx < now)
        return <Chip label="Quá hạn" color="error" size="small" sx={{ fontWeight: 700 }} />;
      if (roiKtx <= warning)
        return <Chip label="Sắp hết hạn" color="warning" size="small" sx={{ fontWeight: 700 }} />;
      return <Chip label="Còn hạn" color="success" size="small" sx={{ fontWeight: 700 }} />;
    },
  },
  {
    field: 'gioiTinh',
    headerName: 'Giới tính',
    flex: 0.8,
    align: 'center',
    renderCell: (p: any) => {
      const gt = p.row.sinhVien?.gioiTinh;
      return (
        <Chip
          size="small"
          label={gt === 0 ? 'Nam' : gt === 1 ? 'Nữ' : '---'}
          color={gt === 0 ? 'primary' : gt === 1 ? 'error' : 'default'}
          variant="outlined"
        />
      );
    },
  },
];
