import { GridColDef } from '@mui/x-data-grid';
import { Stack, Box, Typography, LinearProgress, Chip, IconButton, Tooltip } from '@mui/material';
import { BedOutlined } from '@mui/icons-material';
import { format } from 'date-fns';
export const getPhongColumns = (onViewBeds: (phong: any) => void): GridColDef[] => [
  {
    field: 'maPhong',
    headerName: 'Phòng',
    width: 140,
    renderCell: (p) => (
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography variant="body2" fontWeight={600}>
          {p.value}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'loaiPhong',
    headerName: 'Loại phòng',
    width: 110,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'capacity',
    headerName: 'Đang ở/Sức chứa',
    width: 300,
    renderCell: (p) => {
      const occupied =
        p.row.giuongs?.filter((g: any) => !g.isDeleted && g.trangThai === 1).length || 0;
      const total = p.row.soLuongGiuong || 1;
      const percent = (occupied / total) * 100;
      const color = percent >= 100 ? 'error' : percent >= 75 ? 'warning' : 'success';
      return (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percent}
              color={color as any}
              sx={{ height: 6, borderRadius: 3, bgcolor: '#dcfce7' }}
            />
          </Box>
          <Typography variant="caption" fontWeight={600} sx={{ minWidth: 15 }}>
            {occupied} / {total}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 110,
    align: 'center',
    headerAlign: 'center',
    renderCell: (p) => {
      const occupied =
        p.row.giuongs?.filter((g: any) => !g.isDeleted && g.trangThai === 1).length || 0;
      const isFull = occupied >= p.row.soLuongGiuong;
      return (
        <Chip
          label={isFull ? 'ĐẦY' : 'TRỐNG'}
          size="small"
          sx={{
            fontWeight: 700,
            borderRadius: 1,
            fontSize: '0.7rem',
            bgcolor: isFull ? '#fee2e2' : '#dcfce7',
            color: isFull ? '#dc2626' : '#16a34a',
          }}
        />
      );
    },
  },
  {
    field: 'ngayTao',
    headerName: 'Ngày tạo',
    width: 130,
    align: 'center',
    headerAlign: 'center',
    // Chỉ lấy ngày, bỏ giờ
    valueFormatter: (value) => (value ? format(new Date(value as string), 'dd/MM/yyyy') : '---'),
  },
  {
    field: 'ngayCapNhat',
    headerName: 'Ngày cập nhật',
    width: 130,
    align: 'center',
    headerAlign: 'center',
    // Chỉ lấy ngày, bỏ giờ
    valueFormatter: (value) => (value ? format(new Date(value as string), 'dd/MM/yyyy') : '---'),
  },
  {
    field: 'actions',
    headerName: 'Chi tiết',
    width: 100,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (p) => (
      <Tooltip title="Xem chi tiết giường">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onViewBeds(p.row);
          }}
        >
          <BedOutlined color="primary" fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];
