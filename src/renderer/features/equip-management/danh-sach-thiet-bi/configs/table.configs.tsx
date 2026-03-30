import { GridColDef } from '@mui/x-data-grid';
import { Typography, Chip, Box } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { getTrangThaiThietBiLabel, TrangThaiThietBiEnum } from '../../enums';
import { format } from 'date-fns';

export const getDanhSachThietBiColumns = (): GridColDef[] => [
  {
    field: 'maQrCode',
    headerName: 'Mã QR',
    width: 80,
    align: 'center',
    headerAlign: 'center',
    renderCell: (p) => {
      const qrValue = p.row.maQrCode || p.row.maThietBi;
      if (!qrValue) return null;
      return (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        >
          <QRCodeSVG value={qrValue} size={40} />
        </Box>
      );
    },
  },
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
    flex: 1,
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
      const label = getTrangThaiThietBiLabel(p.value);
      const isOk =
        p.value === TrangThaiThietBiEnum.TrongKho ||
        p.value === TrangThaiThietBiEnum.DangSuDung;
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
