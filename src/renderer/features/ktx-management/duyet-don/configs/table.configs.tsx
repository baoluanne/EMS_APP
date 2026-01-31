import { GridColDef } from '@mui/x-data-grid';
import { Chip, IconButton, Tooltip, Stack, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { format } from 'date-fns';

export const duyetDonColumns = (
  onApprove: (id: string) => void,
  onView: (row: any) => void,
): GridColDef[] => [
  {
    field: 'maDon',
    headerName: 'Mã đơn',
    width: 120,
    renderCell: (p) => (
      <Typography
        variant="body2"
        fontWeight={700}
        color="primary.main"
        sx={{ cursor: 'pointer' }}
        onClick={() => onView(p.row)}
      >
        {p.row.maDon}
      </Typography>
    ),
  },
  {
    field: 'idSinhVien',
    headerName: 'Họ tên sinh viên',
    flex: 1,
    valueGetter: (_, row: any) => row.sinhVien?.fullName || '',
  },
  {
    field: 'loaiDon',
    headerName: 'Loại đơn',
    width: 130,
    renderCell: (params) => {
      const options: any = { 0: 'Đăng ký mới', 1: 'Gia hạn', 2: 'Chuyển phòng', 3: 'Rời KTX' };
      return (
        <Typography variant="body2" fontWeight={600}>
          {options[params.value] || ''}
        </Typography>
      );
    },
  },
  {
    field: 'ngayGuiDon',
    headerName: 'Ngày gửi',
    width: 110,
    valueGetter: (_, row: any) =>
      row.ngayGuiDon ? format(new Date(row.ngayGuiDon), 'dd/MM/yyyy') : '---',
  },
  {
    field: 'ngayBatDauRoi',
    headerName: 'Ngày bắt đầu/Rời',
    width: 140,
    renderCell: (params) => {
      const row = params.row;
      let dateValue = '';

      if (row.loaiDon === 3) {
        dateValue = row.roiKtx?.ngayRoiThucTe;
      } else if ([0, 1, 2].includes(row.loaiDon)) {
        dateValue = row.ngayBatDau;
      }

      return (
        <Typography variant="body2">
          {dateValue ? `${format(new Date(dateValue), 'dd/MM/yyyy')}` : '---'}
        </Typography>
      );
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 120,
    renderCell: (params) => {
      const statusMap: any = {
        0: { label: 'Chờ duyệt', color: 'warning' },
        1: { label: 'Đã duyệt', color: 'success' },
        2: { label: 'Từ chối', color: 'error' },
        3: { label: 'Đã hủy', color: 'default' },
      };
      const opt = statusMap[params.value] || statusMap[0];
      return (
        <Chip
          label={opt.label}
          color={opt.color}
          size="small"
          variant="filled"
          sx={{ fontWeight: 800, fontSize: '0.65rem' }}
        />
      );
    },
  },
  {
    field: 'nguoiTao',
    headerName: 'Người tạo',
    width: 150,
    valueGetter: (_, row: any) => row.nguoiTao?.fullName || '---',
  },
  {
    field: 'ngayTao',
    headerName: 'Ngày tạo',
    width: 150,
    valueGetter: (_, row: any) =>
      row.ngayTao ? format(new Date(row.ngayTao), 'dd/MM/yyyy HH:mm') : '---',
  },
  {
    field: 'nguoiCapNhat',
    headerName: 'Người cập nhật',
    width: 150,
    valueGetter: (_, row: any) => row.nguoiCapNhat?.fullName || '---',
  },
  {
    field: 'ngayCapNhat',
    headerName: 'Ngày cập nhật',
    width: 150,
    valueGetter: (_, row: any) =>
      row.ngayCapNhat ? format(new Date(row.ngayCapNhat), 'dd/MM/yyyy HH:mm') : '---',
  },
  {
    field: 'actions',
    headerName: 'Thao tác',
    width: 100,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Stack direction="row" spacing={0.5}>
        <Tooltip title="Xử lý đơn">
          <IconButton
            color="primary"
            size="small"
            onClick={() => onApprove(params.row.id)}
            disabled={params.row.trangThai !== 0}
          >
            <CheckCircleOutline fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
