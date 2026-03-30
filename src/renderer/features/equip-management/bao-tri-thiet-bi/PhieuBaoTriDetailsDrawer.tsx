import { Drawer, Box, Typography, IconButton, Stack, Chip, Grid, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DevicesIcon from '@mui/icons-material/Devices';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StoreIcon from '@mui/icons-material/Store';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { format } from 'date-fns';

interface Props {
  open: boolean;
  onClose: () => void;
  data: any;
  onEdit?: (data: any) => void; // ✅ Thêm prop onEdit để bắt sự kiện cập nhật
}

const LOAI_BAO_TRI: Record<number, string> = {
  0: 'Bảo dưỡng định kỳ',
  1: 'Sửa chữa sự cố',
  2: 'Nâng cấp',
};

const TRANG_THAI_PHIEU: Record<number, { label: string; color: any }> = {
  0: { label: 'Chờ xử lý', color: 'info' },
  1: { label: 'Đang bảo trì', color: 'warning' },
  2: { label: 'Hoàn thành', color: 'success' },
  3: { label: 'Đã hủy', color: 'error' },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);

export const PhieuBaoTriDetailsDrawer = ({ open, onClose, data, onEdit }: Props) => {
  if (!data) return null;

  const status = TRANG_THAI_PHIEU[data.trangThai] || { label: 'N/A', color: 'default' };
  const loai = LOAI_BAO_TRI[data.loaiBaoTri] || 'N/A';
  const nguoiLap = `${data.nguoiLapPhieu?.hoDem || ''} ${data.nguoiLapPhieu?.ten || ''}`.trim() || 'N/A';
  const chiTiets: any[] = data.chiTietThietBis || [];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      hideBackdrop={true}
      sx={{
        pointerEvents: 'none',
        '& .MuiPaper-root': {
          pointerEvents: 'auto',
          width: { xs: '100%', sm: 520 },
          bgcolor: '#f8fafc',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* Container chính: Sử dụng flexbox để chia Header, Content, Footer */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* ── HEADER ── */}
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(45deg, #f59e0b 30%, #fbbf24 90%)',
            color: 'white',
            flexShrink: 0, // Không bị co lại
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ p: 1.2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex' }}>
              <BuildCircleIcon />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} lineHeight={1.2} sx={{ fontSize: '1.2rem' }}>
                CHI TIẾT BẢO TRÌ
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, letterSpacing: 1, fontWeight: 700 }}>
                #{data.maPhieu || 'N/A'}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.15)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.25)', transform: 'rotate(90deg)' },
              transition: 'all 0.3s',
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* ── CONTENT (Cuộn được) ── */}
        <Box sx={{ p: 2.5, overflowY: 'auto', flexGrow: 1 }}>
          <Stack spacing={2.5}>
            {/* Block 1: Thông tin chung */}
            <Box sx={{ bgcolor: 'white', p: 2.5, borderRadius: 3, boxShadow: '0 2px 8px rgba(145,158,171,0.08)' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle2" color="warning.main" fontWeight={800} sx={{ textTransform: 'uppercase' }}>
                  Thông tin phiếu
                </Typography>
                <Chip
                  label={status.label.toUpperCase()}
                  color={status.color}
                  sx={{ fontWeight: 900, px: 1, borderRadius: 1.5, fontSize: '0.75rem' }}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <PersonOutlineIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>Người lập</Typography>
                      <Typography variant="body2" fontWeight={600}>{nguoiLap}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <BuildCircleIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>Loại</Typography>
                      <Typography variant="body2" fontWeight={600}>{loai}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {data.noiDungBaoTri && (
                <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px dashed #cbd5e1' }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <NoteAltOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>
                        Nội dung yêu cầu:
                      </Typography>
                      <Typography variant="body2">{data.noiDungBaoTri}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Block 2: Danh sách thiết bị */}
            <Box sx={{ bgcolor: 'white', p: 2.5, borderRadius: 3, boxShadow: '0 2px 8px rgba(145,158,171,0.08)' }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <DevicesIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="subtitle2" color="primary.main" fontWeight={800} sx={{ textTransform: 'uppercase' }}>
                  Danh sách thiết bị ({chiTiets.length})
                </Typography>
              </Box>

              {chiTiets.length === 0 ? (
                <Typography variant="body2" color="text.secondary">Không có thiết bị</Typography>
              ) : (
                <Stack spacing={1.5}>
                  {chiTiets.map((ct: any, idx: number) => (
                    <Box key={ct.id || idx} sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                      <Typography variant="body2" fontWeight={700} mb={1}>
                        📦 {ct.thietBi ? `${ct.thietBi.maThietBi} — ${ct.thietBi.tenThietBi}` : ct.thietBiId}
                      </Typography>
                      <Grid container spacing={1}>
                        {ct.nhaCungCap && (
                          <Grid size={{ xs: 12 }}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <StoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">NCC:</Typography>
                              <Typography variant="caption" fontWeight={600}>{ct.nhaCungCap.tenNhaCungCap}</Typography>
                            </Box>
                          </Grid>
                        )}
                        {ct.tinhTrangSauSua && (
                          <Grid size={{ xs: 12 }}>
                            <Typography variant="caption" color="text.secondary">Tình trạng sau sửa: </Typography>
                            <Typography variant="caption" fontWeight={600}>{ct.tinhTrangSauSua}</Typography>
                          </Grid>
                        )}
                        {ct.chiPhiRieng != null && (
                          <Grid size={{ xs: 12 }}>
                            <Typography variant="caption" color="text.secondary">Chi phí riêng: </Typography>
                            <Typography variant="caption" fontWeight={700} color="success.main">
                              {formatCurrency(ct.chiPhiRieng)}
                            </Typography>
                          </Grid>
                        )}
                        {ct.ghiChu && (
                          <Grid size={{ xs: 12 }}>
                            <Typography variant="caption" color="text.secondary">Ghi chú: </Typography>
                            <Typography variant="caption">{ct.ghiChu}</Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>

            {/* Block 3: Kết quả xử lý */}
            <Box sx={{ bgcolor: 'white', p: 2.5, borderRadius: 3, boxShadow: '0 2px 8px rgba(145,158,171,0.08)' }}>
              <Typography variant="subtitle2" color="success.main" fontWeight={700} sx={{ textTransform: 'uppercase', mb: 2 }}>
                Kết quả xử lý
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <DateRangeIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>Bắt đầu</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {data.ngayBatDau ? format(new Date(data.ngayBatDau), 'dd/MM/yyyy') : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <CheckCircleIcon sx={{ color: data.ngayKetThuc ? 'success.main' : 'text.secondary', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>Kết thúc</Typography>
                      <Typography variant="body2" fontWeight={600} color={data.ngayKetThuc ? 'success.main' : 'text.primary'}>
                        {data.ngayKetThuc ? format(new Date(data.ngayKetThuc), 'dd/MM/yyyy') : 'Chưa xong'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <MonetizationOnIcon sx={{ color: 'success.main', fontSize: 20, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>Tổng chi phí</Typography>
                      <Typography variant="body1" fontWeight={700} color="success.main">
                        {formatCurrency(data.chiPhi)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {(data.ketQuaXuLy || data.ghiChu) && (
                <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px dashed #86efac' }}>
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <NoteAltOutlinedIcon sx={{ color: 'success.main', fontSize: 20, mt: 0.2 }} />
                    <Box flex={1}>
                      {data.ketQuaXuLy && (
                        <Box mb={data.ghiChu ? 1 : 0}>
                          <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>Kết quả:</Typography>
                          <Typography variant="body2">{data.ketQuaXuLy}</Typography>
                        </Box>
                      )}
                      {data.ghiChu && (
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block" mb={0.2}>Ghi chú:</Typography>
                          <Typography variant="body2">{data.ghiChu}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Stack>
        </Box>

        {/* ── FOOTER (Nút hành động cố định) ── */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #e2e8f0',
            bgcolor: 'white',
            flexShrink: 0,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            startIcon={<EditOutlinedIcon />}
            onClick={() => onEdit && onEdit(data)}
            disabled={data.trangThai === 2 || data.trangThai === 3} // Vô hiệu hóa nút nếu đã Hoàn Thành hoặc Đã Hủy
            sx={{
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: 2,
              py: 1.2
            }}
          >
            {data.trangThai === 2 || data.trangThai === 3 ? 'Không thể cập nhật phiếu đã đóng' : 'Cập nhật phiếu'}
          </Button>
        </Box>

      </Box>
    </Drawer>
  );
};