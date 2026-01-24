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
