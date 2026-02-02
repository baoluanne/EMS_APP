import { Drawer, Box, Stack, Typography, IconButton, Divider, Chip, Grid } from '@mui/material';
import { Close, BedOutlined, PersonOutline } from '@mui/icons-material';

export const BedListSidebar = ({ phong, onClose }: any) => {
  if (!phong) return null;
  const beds = phong.giuongs?.filter((g: any) => !g.isDeleted) || [];

  return (
    <Drawer anchor="right" open={!!phong} onClose={onClose} PaperProps={{ sx: { width: 550 } }}>
      <Stack height="100%">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2.5}
          bgcolor="#f8fafc"
        >
          <Box>
            <Typography variant="h6" fontWeight={800} color="primary.main">
              Phòng {phong.maPhong}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {phong.loaiPhong} • {beds.length} giường
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto', bgcolor: '#f1f5f9' }}>
          <Grid container spacing={2}>
            {beds.map((bed: any) => (
              <Grid size={12} key={bed.id}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: bed.trangThai === 1 ? '#fde047' : '#e2e8f0',
                    bgcolor: 'white',
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <BedOutlined sx={{ color: bed.trangThai === 1 ? '#f59e0b' : '#10b981' }} />
                      <Typography fontWeight={800}>{bed.maGiuong}</Typography>
                    </Stack>
                    <Chip
                      label={bed.trangThai === 1 ? 'Đang ở' : 'Trống'}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.65rem',
                        bgcolor: bed.trangThai === 1 ? '#fef3c7' : '#dcfce7',
                        color: bed.trangThai === 1 ? '#92400e' : '#166534',
                      }}
                    />
                  </Stack>
                  {bed.sinhVien ? (
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}
                    >
                      <PersonOutline fontSize="small" color="primary" />
                      <Box>
                        <Typography variant="body2" fontWeight={700}>
                          {bed.sinhVien.hoDem} {bed.sinhVien.ten}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          MSSV: {bed.sinhVien.maSinhVien}
                        </Typography>
                      </Box>
                    </Stack>
                  ) : (
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ fontStyle: 'italic', pl: 1 }}
                    >
                      Giường trống
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Drawer>
  );
};
