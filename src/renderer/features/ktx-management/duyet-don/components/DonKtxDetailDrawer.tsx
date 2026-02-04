import {
  Box,
  Drawer,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Paper,
  Chip,
  Grid,
} from '@mui/material';
import {
  Close,
  Person,
  CalendarToday,
  Description,
  MeetingRoom,
  SwapHoriz,
  MeetingRoomOutlined,
  HistoryEdu,
  Assignment,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { KtxLoaiDon, KtxDonTrangThaiOptions } from '../configs/KtxDonEnum';

interface Props {
  don: any;
  onClose: () => void;
}

export const DonKtxDetailDrawer = ({ don, onClose }: Props) => {
  if (!don) return null;

  const statusInfo =
    KtxDonTrangThaiOptions.find((opt) => opt.value === don.trangThai) || KtxDonTrangThaiOptions[0];

  const DetailItem = ({ icon, label, value, color = 'textPrimary' }: any) => (
    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
      <Box sx={{ color: 'primary.main', mt: 0.2 }}>{icon}</Box>
      <Box>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: 'block', fontWeight: 600, textTransform: 'uppercase' }}
        >
          {label}
        </Typography>
        <Typography variant="body2" color={color} fontWeight={700}>
          {value || '---'}
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <Drawer
      anchor="right"
      open={!!don}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-root': {
          zIndex: 1500,
        },
        '& .MuiPaper-root': {
          zIndex: 1500,
        },
        zIndex: 1500,
      }}
    >
      <Box
        sx={{
          width: 500,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f8fafc',
        }}
      >
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#fff',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Assignment color="primary" />
            <Typography variant="h6" fontWeight={900}>
              CHI TIẾT ĐƠN TỪ
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 4, mb: 3, border: '1px solid #e2e8f0', textAlign: 'center' }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                bgcolor: don.sinhVien?.gioiTinh === 0 ? '#3b82f6' : '#ec4899',
                fontSize: '2rem',
              }}
            >
              {don.sinhVien?.ten?.charAt(0)}
            </Avatar>
            <Typography variant="h6" fontWeight={900}>
              {don.sinhVien?.fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              MSSV: {don.sinhVien?.maSinhVien}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Giới tính: {don.sinhVien?.gioiTinh === 0 ? 'Nam' : 'Nữ'}
            </Typography>
            <Chip
              label={statusInfo.label}
              color={statusInfo.color as any}
              sx={{ fontWeight: 800, mt: 1 }}
            />
          </Paper>

          <Typography
            variant="overline"
            color="primary"
            fontWeight={900}
            sx={{ mb: 2, display: 'block' }}
          >
            Thông tin chung
          </Typography>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, mb: 3, border: '1px solid #e2e8f0' }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <DetailItem
                  icon={<Description fontSize="small" />}
                  label="Mã đơn"
                  value={don.maDon}
                  color="primary.main"
                />
              </Grid>
              <Grid size={6}>
                <DetailItem
                  icon={<CalendarToday fontSize="small" />}
                  label="Ngày gửi"
                  value={don.ngayGuiDon ? format(new Date(don.ngayGuiDon), 'dd/MM/yyyy') : ''}
                />
              </Grid>
              <Grid size={6}>
                <DetailItem
                  icon={<HistoryEdu fontSize="small" />}
                  label="Loại đơn"
                  value={
                    don.loaiDon === 0
                      ? 'Đăng ký mới'
                      : don.loaiDon === 1
                        ? 'Gia hạn'
                        : don.loaiDon === 2
                          ? 'Chuyển phòng'
                          : 'Rời KTX'
                  }
                />
              </Grid>
              <Grid size={6}>
                <DetailItem
                  icon={<CalendarToday fontSize="small" />}
                  label="Học kỳ"
                  value={don.hocKy?.tenDot}
                />
              </Grid>
            </Grid>
          </Paper>

          <Typography
            variant="overline"
            color="primary"
            fontWeight={900}
            sx={{ mb: 2, display: 'block' }}
          >
            Chi tiết yêu cầu
          </Typography>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0' }}>
            {don.loaiDon === KtxLoaiDon.DangKyMoi && (
              <Stack spacing={2}>
                <DetailItem
                  icon={<MeetingRoom fontSize="small" />}
                  label="Phòng yêu cầu"
                  value={don.dangKyMoi?.phongYeuCau?.maPhong}
                />
                <DetailItem
                  icon={<Person fontSize="small" />}
                  label="Giường yêu cầu"
                  value={don.dangKyMoi?.giuongYeuCau?.maGiuong}
                />
              </Stack>
            )}

            {don.loaiDon === KtxLoaiDon.ChuyenPhong && (
              <Stack spacing={2}>
                <DetailItem
                  icon={<SwapHoriz fontSize="small" />}
                  label="Phòng đang ở"
                  value={don.chuyenPhong?.phongHienTai?.maPhong}
                />
                <DetailItem
                  icon={<MeetingRoomOutlined fontSize="small" />}
                  label="Phòng yêu cầu mới"
                  value={don.chuyenPhong?.phongYeuCau?.maPhong}
                  color="error.main"
                />
              </Stack>
            )}

            {don.loaiDon === KtxLoaiDon.GiaHan && (
              <Stack spacing={2}>
                <DetailItem
                  icon={<MeetingRoom fontSize="small" />}
                  label="Phòng hiện tại"
                  value={don.giaHan?.phongHienTai?.maPhong}
                />
                <DetailItem
                  icon={<CalendarToday fontSize="small" />}
                  label="Gia hạn đến ngày"
                  value={don.ngayHetHan ? format(new Date(don.ngayHetHan), 'dd/MM/yyyy') : ''}
                />
              </Stack>
            )}

            {don.loaiDon === KtxLoaiDon.RoiKtx && (
              <Stack spacing={2}>
                <DetailItem
                  icon={<MeetingRoom fontSize="small" />}
                  label="Phòng rời đi"
                  value={don.roiKtx?.phongHienTai?.maPhong}
                />
                <DetailItem
                  icon={<CalendarToday fontSize="small" />}
                  label="Ngày rời dự kiến"
                  value={
                    don.roiKtx?.ngayRoiThucTe
                      ? format(new Date(don.roiKtx.ngayRoiThucTe), 'dd/MM/yyyy')
                      : ''
                  }
                />
              </Stack>
            )}

            <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
            <DetailItem
              icon={<Description fontSize="small" />}
              label="Ghi chú sinh viên"
              value={don.ghiChu}
            />
          </Paper>

          {don.trangThai === 1 && (
            <>
              <Typography
                variant="overline"
                color="success.main"
                fontWeight={900}
                sx={{ mt: 3, mb: 2, display: 'block' }}
              >
                Thông tin phê duyệt
              </Typography>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f0fdf4' }}
              >
                <DetailItem
                  icon={<MeetingRoom fontSize="small" />}
                  label="Phòng được duyệt"
                  value={don.phongDuocDuyet?.maPhong}
                  color="success.main"
                />
                <DetailItem
                  icon={<Person fontSize="small" />}
                  label="Giường được duyệt"
                  value={don.giuongDuocDuyet?.maGiuong}
                  color="success.main"
                />
                {(don.loaiDon === KtxLoaiDon.ChuyenPhong ||
                  don.loaiDon === KtxLoaiDon.DangKyMoi ||
                  don.loaiDon === KtxLoaiDon.GiaHan) && (
                  <DetailItem
                    icon={<Person fontSize="small" />}
                    label="Ngày bắt đầu"
                    value={don.ngayBatDau ? format(new Date(don.ngayBatDau), 'dd/MM/yyyy') : ''}
                    color="success.main"
                  />
                )}

                {don.loaiDon === KtxLoaiDon.RoiKtx && (
                  <DetailItem
                    icon={<Person fontSize="small" />}
                    label="Ngày rời thực tế"
                    value={format(new Date(don.roiKtx?.ngayRoiThucTe || new Date()), 'dd/MM/yyyy')}
                    color="success.main"
                  />
                )}
              </Paper>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
