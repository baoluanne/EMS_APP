import {
  Box,
  Drawer,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Chip,
  Link,
  Paper,
} from '@mui/material';
import { Close, Hotel } from '@mui/icons-material';
import { DataGridTable } from '@renderer/components/Table';
import { GridColDef } from '@mui/x-data-grid';

interface Props {
  phong: any;
  onClose: () => void;
  onStudentClick: (student: any) => void;
}

export const BedListDrawer = ({ phong, onClose, onStudentClick }: Props) => {
  const bedColumns: GridColDef[] = [
    { field: 'maGiuong', headerName: 'Giường', width: 120, renderCell: (p) => <b>{p.value}</b> },
    {
      field: 'trangThai',
      headerName: 'Trạng thái',
      width: 130,
      renderCell: (p) => (
        <Chip
          size="small"
          label={p.value === 1 ? 'Đã ở' : 'Trống'}
          color={p.value === 1 ? 'error' : 'success'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'sinhVien',
      headerName: 'Sinh viên đang ở',
      flex: 1,
      renderCell: (p) => {
        const sv = p.row.sinhVien;
        if (!sv)
          return (
            <Typography variant="caption" color="text.disabled">
              <em>(Giường trống)</em>
            </Typography>
          );
        return (
          <Link
            component="button"
            variant="body2"
            onClick={() => onStudentClick(p.row)}
            sx={{ fontWeight: 600, textDecoration: 'none' }}
          >
            {sv.fullName || `${sv.hoDem} ${sv.ten}`}
          </Link>
        );
      },
    },
    {
      field: 'maSinhVien',
      headerName: 'MSSV',
      width: 120,
      valueGetter: (_, row) => row.sinhVien?.maSinhVien || '',
    },
  ];

  return (
    <Drawer anchor="right" open={!!phong} onClose={onClose}>
      <Box sx={{ width: 750, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#fff',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Hotel />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={900}>
                Phòng {phong?.maPhong}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sơ đồ và tình trạng giường chi tiết
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2, flexGrow: 1, bgcolor: '#f8fafc' }}>
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <DataGridTable
              columns={bedColumns}
              rows={phong?.giuongs || []}
              getRowId={(row) => row.id}
              hideFooterPagination
            />
          </Paper>
        </Box>
      </Box>
    </Drawer>
  );
};
