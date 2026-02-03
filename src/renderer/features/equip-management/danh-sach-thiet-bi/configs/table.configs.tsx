import { GridColDef } from '@mui/x-data-grid';
import { Typography, Chip } from '@mui/material';
import { getTrangThaiLabel } from '../TrangThaiThietBiEnum';
import { format } from 'date-fns';

export const danhSachThietBiColumns: GridColDef[] = [
  {
    field: 'maThietBi',
    headerName: 'Mã thiết bị',
    width: 130,
    renderCell: (p) => (
      <Typography variant="body2" fontWeight={700} color="primary.main">
        {p.value}
      </Typography>
    ),
  },
  {
    field: 'tenThietBi',
    headerName: 'Tên thiết bị',
    flex: 1, // Cột này sẽ giãn ra chiếm hết chỗ trống thay vì cột cuối
    minWidth: 200,
    renderCell: (p) => (
      <Typography variant="body2" fontWeight={600} noWrap>
        {p.value}
      </Typography>
    ),
  },
  {
    field: 'loaiThietBiId',
    headerName: 'Loại thiết bị',
    width: 150,
    valueGetter: (_, row: any) => row.loaiThietBi?.tenLoai || '',
  },
  {
    field: 'phong',
    headerName: 'Vị trí hiện tại',
    width: 180,
    renderCell: (params: any) => {
      const { phongHoc, phongKtx } = params.row;
      if (phongKtx)
        return <Chip label={`KTX: ${phongKtx.maPhong}`} size="small" variant="outlined" />;
      if (phongHoc)
        return <Chip label={`Phòng: ${phongHoc.tenPhong}`} size="small" variant="outlined" />;
      return (
        <Typography variant="caption" color="text.disabled">
          Chưa phân bổ
        </Typography>
      );
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 130,
    align: 'center',
    headerAlign: 'center',
    renderCell: (p) => {
      const label = getTrangThaiLabel(p.value);
      const isOk = p.value === 0 || p.value === 1;
      return (
        <Chip
          label={label}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.65rem',
            bgcolor: isOk ? '#dcfce7' : '#fee2e2',
            color: isOk ? '#16a34a' : '#dc2626',
          }}
        />
      );
    },
  },
  {
    field: 'ngayMua',
    headerName: 'Ngày mua',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (value) => (value ? format(new Date(value as string), 'dd/MM/yyyy') : '---'),
  },
];
