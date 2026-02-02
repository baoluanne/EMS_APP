import { GridColDef } from '@mui/x-data-grid';
import { Stack, Box, Typography, LinearProgress, Chip, IconButton, Tooltip } from '@mui/material';
import { MeetingRoom, BedOutlined } from '@mui/icons-material';

export const getPhongColumns = (onViewBeds: (phong: any) => void): GridColDef[] => [
  {
    field: 'maPhong',
    headerName: 'Phòng',
    width: 250,
    minWidth: 120,
    renderCell: (p) => (
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <MeetingRoom fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography variant="body2" fontWeight={600}>
          Phòng {p.value}
        </Typography>
      </Stack>
    ),
  },
  { field: 'loaiPhong', headerName: 'Loại phòng', width: 120, minWidth: 100 },
  {
    field: 'capacity',
    headerName: 'Đang ở/Sức chưa',
    width: 400,
    minWidth: 180,
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
              sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9' }}
            />
          </Box>
          <Typography variant="caption" fontWeight={600}>
            {occupied} / {total}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 200,
    minWidth: 100,
    renderCell: (p) => {
      const occupied =
        p.row.giuongs?.filter((g: any) => !g.isDeleted && g.trangThai === 1).length || 0;
      const isFull = occupied >= p.row.soLuongGiuong;
      return (
        <Chip
          label={isFull ? 'ĐẦY' : 'TRỐNG'}
          size="small"
          sx={{
            fontWeight: 600,
            borderRadius: 1,
            bgcolor: isFull ? '#fee2e2' : '#dcfce7',
            color: isFull ? '#dc2626' : '#16a34a',
          }}
        />
      );
    },
  },
  {
    field: 'actions',
    headerName: 'Danh sách giường',
    width: 100,
    minWidth: 100,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
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
