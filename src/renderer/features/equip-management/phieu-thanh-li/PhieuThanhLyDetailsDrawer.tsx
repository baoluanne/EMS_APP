import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PaymentsIcon from '@mui/icons-material/Payments';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { format } from 'date-fns';

interface PhieuThanhLyDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export const PhieuThanhLyDetailsDrawer = ({
  open,
  onClose,
  data,
}: PhieuThanhLyDetailsDrawerProps) => {
  if (!data) return null;

  const nguoiLap =
    `${data.nguoiLapPhieu?.hoDem || ''} ${data.nguoiLapPhieu?.ten || ''}`.trim() || 'N/A';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
      amount || 0,
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 450 }, bgcolor: '#f4f6f8' } }}
    >
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'error.main',
          color: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, display: 'flex' }}>
            <DescriptionIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} lineHeight={1.2} sx={{ fontSize: '1.1rem' }}>
              Chi tiết phiếu thanh lý
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, letterSpacing: 0.5 }}>
              Số QĐ: {data.soQuyetDinh || 'N/A'}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2.5, overflowY: 'auto' }}>
        <Stack spacing={2.5}>
          <Box
            sx={{
              bgcolor: 'white',
              p: 2.5,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(145, 158, 171, 0.08)',
            }}
          >
            <Typography
              variant="subtitle2"
              color="error.main"
              fontWeight={700}
              sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2 }}
            >
              Thông tin quyết định
            </Typography>

            <Stack spacing={2}>
              <Box display="flex" alignItems="flex-start" gap={1.5}>
                <PersonOutlineIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                    Người lập phiếu
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="text.primary">
                    {nguoiLap}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <DateRangeIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                        Ngày thanh lý
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {data.ngayThanhLy
                          ? format(new Date(data.ngayThanhLy), 'dd/MM/yyyy')
                          : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <PaymentsIcon sx={{ color: 'success.main', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                        Tổng thu hồi
                      </Typography>
                      <Typography variant="body2" fontWeight={700} color="success.main">
                        {formatCurrency(data.tongTienThuHoi)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {data.lyDo && (
                <Box
                  sx={{
                    mt: 1,
                    p: 1.5,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px dashed #cbd5e1',
                  }}
                >
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <NoteAltOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box flex={1}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                        Lý do thanh lý:
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {data.lyDo}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Stack>
          </Box>

          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(145, 158, 171, 0.08)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ p: 2.5, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
              <Typography
                variant="subtitle2"
                color="error.main"
                fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Danh sách thiết bị ({data.chiTietThanhLys?.length || 0})
              </Typography>
            </Box>

            <List disablePadding>
              {data.chiTietThanhLys?.map((ct: any, index: number) => {
                return (
                  <Box key={ct.id}>
                    <ListItem sx={{ py: 2, px: 2.5, display: 'flex', alignItems: 'flex-start' }}>
                      <ListItemAvatar sx={{ minWidth: 48 }}>
                        <Avatar
                          sx={{ bgcolor: '#fef2f2', color: '#dc2626', width: 36, height: 36 }}
                        >
                          <DeleteSweepIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        disableTypography
                        primary={
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            mb={0.5}
                          >
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              color="text.primary"
                              sx={{ pr: 1 }}
                            >
                              {ct.thietBi?.tenThietBi || 'N/A'}
                            </Typography>
                            <Typography
                              variant="caption"
                              fontWeight={600}
                              color="text.secondary"
                              sx={{ bgcolor: '#f1f5f9', px: 1, py: 0.2, borderRadius: 1 }}
                            >
                              {ct.thietBi?.maThietBi || 'N/A'}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Stack spacing={0.5} mt={1}>
                            <Typography variant="caption" color="text.secondary">
                              Giá thanh lý:{' '}
                              <Box component="span" fontWeight={600} color="success.main">
                                {formatCurrency(ct.giaBan)}
                              </Box>
                            </Typography>
                            {ct.ghiChu && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontStyle: 'italic' }}
                              >
                                Ghi chú: {ct.ghiChu}
                              </Typography>
                            )}
                          </Stack>
                        }
                      />
                    </ListItem>
                    {index < (data.chiTietThanhLys?.length || 0) - 1 && (
                      <Divider variant="inset" component="li" sx={{ ml: 8.5 }} />
                    )}
                  </Box>
                );
              })}
            </List>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};
