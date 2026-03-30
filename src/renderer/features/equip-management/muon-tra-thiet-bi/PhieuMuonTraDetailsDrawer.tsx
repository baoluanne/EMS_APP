import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  Grid as Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { format } from 'date-fns';

interface PhieuMuonTraDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export const PhieuMuonTraDetailsDrawer = ({
  open,
  onClose,
  data,
}: PhieuMuonTraDetailsDrawerProps) => {
  if (!data) return null;

  const getNguoiMuon = () => {
    if (data.loaiDoiTuong === 1) {
      return `${data.sinhVien?.hoDem || ''} ${data.sinhVien?.ten || ''}`.trim() || 'N/A';
    }
    if (data.loaiDoiTuong === 2) {
      return `${data.giangVien?.hoDem || ''} ${data.giangVien?.ten || ''}`.trim() || 'N/A';
    }
    return 'N/A';
  };

  const getTrangThaiChip = () => {
    const statusMap: Record<number, { label: string; color: 'warning' | 'success' | 'error' }> = {
      0: { label: 'Đang mượn', color: 'warning' },
      1: { label: 'Đã trả', color: 'success' },
      2: { label: 'Quá hạn', color: 'error' },
    };
    const status = statusMap[data?.trangThai as number] || { label: 'N/A', color: 'default' };
    return (
      <Chip
        label={status.label}
        color={status.color as any}
        size="small"
        sx={{ fontWeight: 600, px: 1 }}
      />
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 450 }, bgcolor: '#f4f6f8' } }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          color: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, display: 'flex' }}>
            <AssignmentIndIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} lineHeight={1.2} sx={{ fontSize: '1.1rem' }}>
              Chi tiết phiếu mượn
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, letterSpacing: 0.5 }}>
              Mã phiếu: {data.maPhieu || 'N/A'}
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

      {/* BODY */}
      <Box sx={{ p: 2.5, overflowY: 'auto' }}>
        <Stack spacing={2.5}>
          {/* CARD: THÔNG TIN NGƯỜI MƯỢN */}
          <Box
            sx={{
              bgcolor: 'white',
              p: 2.5,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(145, 158, 171, 0.08)',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography
                variant="subtitle2"
                color="primary.main"
                fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Thông tin người mượn
              </Typography>
              {getTrangThaiChip()}
            </Box>

            <Stack spacing={2}>
              <Box display="flex" alignItems="flex-start" gap={1.5}>
                <PersonOutlineIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                    Người mượn
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" fontWeight={700} color="text.primary">
                      {getNguoiMuon()}
                    </Typography>
                    <Chip
                      label={data.loaiDoiTuong === 1 ? 'Sinh viên' : 'Giảng viên'}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        bgcolor: '#e2e8f0',
                        color: '#475569',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <DateRangeIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                        Ngày mượn
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {data.ngayMuon ? format(new Date(data.ngayMuon), 'dd/MM/yyyy') : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <DateRangeIcon
                      sx={{
                        color: data.trangThai === 2 ? 'error.main' : 'text.secondary',
                        fontSize: 20,
                        mt: 0.2,
                      }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                        Hẹn trả
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={data.trangThai === 2 ? 'error.main' : 'text.primary'}
                      >
                        {data.ngayTraDuKien
                          ? format(new Date(data.ngayTraDuKien), 'dd/MM/yyyy')
                          : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {(data.lyDoMuon || data.ghiChu) && (
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
                      {data.lyDoMuon && (
                        <Box mb={data.ghiChu ? 1 : 0}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            mb={0.2}
                          >
                            Lý do mượn:
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            {data.lyDoMuon}
                          </Typography>
                        </Box>
                      )}
                      {data.ghiChu && (
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            mb={0.2}
                          >
                            Ghi chú:
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            {data.ghiChu}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Stack>
          </Box>

          {/* CARD: DANH SÁCH THIẾT BỊ */}
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
                color="primary.main"
                fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Thiết bị mượn ({data.chiTietPhieuMuons?.length || 0})
              </Typography>
            </Box>

            <List disablePadding>
              {data.chiTietPhieuMuons?.map((ct: any, index: number) => {
                const isReturned = ct.isDaTra;
                const returnStatusColor =
                  ct.tinhTrangKhiTra === 'Bình thường' ? 'success' : 'error';

                return (
                  <Box key={ct.id}>
                    <ListItem sx={{ py: 2, px: 2.5, display: 'flex', alignItems: 'flex-start' }}>
                      <ListItemAvatar sx={{ minWidth: 48 }}>
                        <Avatar
                          sx={{
                            bgcolor: isReturned ? '#f0fdf4' : '#eff6ff',
                            color: isReturned ? '#16a34a' : '#2563eb',
                            width: 36,
                            height: 36,
                          }}
                        >
                          <LaptopMacIcon fontSize="small" />
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
                          <Stack spacing={1} mt={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ minWidth: 60 }}
                              >
                                Lúc mượn:
                              </Typography>
                              <Chip
                                label={ct.tinhTrangKhiMuon || 'Bình thường'}
                                size="small"
                                variant="outlined"
                                sx={{
                                  height: 20,
                                  fontSize: '0.7rem',
                                  color: 'text.secondary',
                                  borderColor: 'divider',
                                }}
                              />
                            </Box>

                            {isReturned && (
                              <Box display="flex" alignItems="center" gap={1}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ minWidth: 60 }}
                                >
                                  Lúc trả:
                                </Typography>
                                <Chip
                                  icon={
                                    ct.tinhTrangKhiTra === 'Bình thường' ? (
                                      <CheckCircleIcon />
                                    ) : (
                                      <ErrorOutlineIcon />
                                    )
                                  }
                                  label={ct.tinhTrangKhiTra || 'Bình thường'}
                                  size="small"
                                  color={returnStatusColor}
                                  sx={{
                                    height: 22,
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    '& .MuiChip-icon': { fontSize: 14 },
                                  }}
                                />
                              </Box>
                            )}
                          </Stack>
                        }
                      />
                    </ListItem>
                    {index < (data.chiTietPhieuMuons?.length || 0) - 1 && (
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
