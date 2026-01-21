import { useState, useEffect, useMemo } from 'react';
import {
  Stack,
  TextField,
  MenuItem,
  Button,
  Divider,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMutation } from '@renderer/shared/mutations';
import { toast } from 'react-toastify';
import { Cancel, Person, Home, MeetingRoom, SwapHoriz, CheckCircle } from '@mui/icons-material';
import { format } from 'date-fns';

interface Props {
  onClose: () => void;
  selectedId: string;
  onSuccess: () => void;
}

export const ApproveDonModal = ({ onClose, selectedId, onSuccess }: Props) => {
  //#region State & Current Don
  const [phongId, setPhongId] = useState('');
  const [giuongId, setGiuongId] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  const { data: donData } = useCrudPagination<any>({
    entity: 'DonKtx',
    endpoint: `pagination?Id=${selectedId}`,
    enabled: !!selectedId,
  });

  const currentDon = useMemo(() => (donData as any)?.result?.[0] || donData, [donData]);

  const loaiDon = currentDon?.loaiDon;
  const isDangKyMoi = loaiDon === 0;
  const isGiaHan = loaiDon === 1;
  const isChuyenPhong = loaiDon === 2;
  const isRoiKtx = loaiDon === 3;

  const currentStayInfo = useMemo(() => {
    if (isGiaHan) return currentDon?.giaHan;
    if (isChuyenPhong) return currentDon?.chuyenPhong;
    if (isRoiKtx) return currentDon?.roiKtx;
    return null;
  }, [currentDon, isGiaHan, isChuyenPhong, isRoiKtx]);

  const currentPhong = useMemo(() => currentStayInfo?.phongHienTai, [currentStayInfo]);

  const requestedPhong = useMemo(() => {
    if (isDangKyMoi) return currentDon?.dangKyMoi?.phongYeuCau;
    if (isChuyenPhong) return currentDon?.chuyenPhong?.phongYeuCau;
    return null;
  }, [currentDon, isDangKyMoi, isChuyenPhong]);

  useEffect(() => {
    if (isGiaHan && currentStayInfo?.phongHienTaiId) {
      setPhongId(currentStayInfo.phongHienTaiId);
    } else if (requestedPhong?.id && (isDangKyMoi || isChuyenPhong)) {
      setPhongId(requestedPhong.id);
    }
  }, [requestedPhong, currentStayInfo, isDangKyMoi, isChuyenPhong, isGiaHan]);

  const { data: phongs } = useCrudPagination<any>({
    entity: 'PhongKtx',
    endpoint: `pagination?Gender=${currentDon?.sinhVien?.gioiTinh ?? ''}`,
    enabled: isDangKyMoi || isChuyenPhong,
  });

  const { data: fetchedGiuongs, isRefetching } = useCrudPagination<any>({
    entity: 'GiuongKtx',
    endpoint: `pagination?PhongId=${phongId}&TrangThai=0`,
    enabled: !!phongId && (isDangKyMoi || isChuyenPhong),
  });

  const bedOptions = useMemo(() => {
    if (phongId === requestedPhong?.id && requestedPhong?.giuongs) {
      return requestedPhong.giuongs.filter((g: any) => g.trangThai === 0);
    }
    return (fetchedGiuongs as any)?.result || [];
  }, [phongId, requestedPhong, fetchedGiuongs]);

  const { mutateAsync: approveDon } = useMutation<any>(
    `DonKtx/${selectedId}/approve?phongDuyetId=${phongId}&giuongDuyetId=${giuongId}`,
  );
  const { mutateAsync: rejectDon } = useMutation<any>(`DonKtx/${selectedId}/reject`);

  const handleApprove = async () => {
    if ((isDangKyMoi || isChuyenPhong) && (!phongId || !giuongId)) {
      toast.error('Vui lòng chọn đầy đủ phòng và giường duyệt');
      return;
    }
    try {
      await approveDon({});
      toast.success('Duyệt đơn thành công');
      onSuccess();
      onClose();
    } catch {
      toast.error('Lỗi khi xử lý');
    }
  };

  const handleRejectAction = async () => {
    if (!ghiChu.trim()) {
      toast.warning('Vui lòng nhập lý do từ chối');
      return;
    }
    try {
      await rejectDon({ ghiChu });
      toast.success('Đã từ chối đơn');
      onSuccess();
      onClose();
    } catch {
      toast.error('Lỗi khi từ chối đơn');
    }
  };

  const InfoItem = ({ label, value, color = 'textPrimary', bold = false }: any) => (
    <Grid size={6}>
      <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={bold ? 700 : 500} color={color}>
        {value || '---'}
      </Typography>
    </Grid>
  );
  //#endregion

  //#region FormDetailsModal
  return (
    <FormDetailsModal
      title={`Xử lý đơn ${isDangKyMoi ? 'đăng ký mới' : isChuyenPhong ? 'chuyển phòng' : isGiaHan ? 'gia hạn' : 'rời KTX'}`}
      onClose={onClose}
      onSave={handleApprove}
      saveTitle={isRoiKtx ? 'Xác nhận rời' : 'Duyệt đơn'}
      maxWidth="sm"
    >
      <Stack spacing={2} sx={{ mt: 1 }}>
        <Paper
          variant="outlined"
          sx={{ p: 2, bgcolor: '#f8f9fa', borderLeft: '4px solid #1976d2' }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Person fontSize="small" color="primary" />
            <Typography variant="subtitle2" fontWeight={700}>
              THÔNG TIN SINH VIÊN
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            <InfoItem label="Mã đơn" value={currentDon?.maDon} color="primary" bold />
            <InfoItem label="Học kỳ" value={currentDon?.hocKy?.tenDot} />
            <Grid size={12}>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </Grid>
            <InfoItem
              label="Họ tên"
              value={`${currentDon?.sinhVien?.hoDem || ''} ${currentDon?.sinhVien?.ten || ''}`}
              bold
            />
            <InfoItem label="Mã sinh viên" value={currentDon?.sinhVien?.maSinhVien} bold />
            {!isRoiKtx && (
              <InfoItem
                label="Gói dịch vụ"
                value={currentDon?.goiDichVu?.tenKhoanThu || 'Mặc định'}
              />
            )}
          </Grid>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, borderLeft: '4px solid #ed6c02' }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            {isRoiKtx ? (
              <MeetingRoom color="error" />
            ) : isChuyenPhong ? (
              <SwapHoriz color="warning" />
            ) : (
              <Home color="success" />
            )}
            <Typography variant="subtitle2" fontWeight={700}>
              CHI TIẾT YÊU CẦU
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {(isChuyenPhong || isGiaHan || isRoiKtx) && (
              <InfoItem
                label="PHÒNG ĐANG Ở"
                value={currentPhong?.maPhong || currentStayInfo?.phongHienTaiId || 'Đang ở KTX'}
                bold
                color="primary.main"
              />
            )}

            {(isDangKyMoi || isChuyenPhong) && (
              <InfoItem
                label="PHÒNG YÊU CẦU"
                value={requestedPhong?.maPhong}
                bold
                color="error.main"
              />
            )}

            <InfoItem
              label={
                isRoiKtx
                  ? 'NGÀY RỜI KTX (DỰ KIẾN)'
                  : isChuyenPhong
                    ? 'NGÀY BẮT ĐẦU CHUYỂN'
                    : 'NGÀY BẮT ĐẦU Ở'
              }
              value={
                currentDon?.ngayBatDau
                  ? format(new Date(currentDon.ngayBatDau), 'dd/MM/yyyy')
                  : '---'
              }
              bold
              color={isRoiKtx ? 'error.main' : 'textPrimary'}
            />

            {isGiaHan && (
              <InfoItem
                label="HẠN LƯU TRÚ MỚI"
                value={
                  currentDon?.hocKy?.denNgay
                    ? format(new Date(currentDon.hocKy.denNgay), 'dd/MM/yyyy')
                    : 'Theo học kỳ'
                }
                bold
                color="success.main"
              />
            )}
          </Grid>
        </Paper>

        {(isDangKyMoi || isChuyenPhong) && (
          <Box sx={{ px: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <CheckCircle fontSize="small" color="success" />
              <Typography variant="caption" fontWeight={700} color="success.main">
                CHỈ ĐỊNH PHÒNG & GIƯỜNG DUYỆT
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <TextField
                select
                fullWidth
                size="small"
                label="Chọn phòng duyệt"
                value={phongId}
                onChange={(e) => {
                  setPhongId(e.target.value);
                  setGiuongId('');
                }}
              >
                {phongs?.result?.map((p: any) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.maPhong} - {p.tang?.tenTang} ({p.loaiPhong})
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                size="small"
                label="Chọn giường duyệt"
                value={giuongId}
                onChange={(e) => setGiuongId(e.target.value)}
                disabled={!phongId || isRefetching}
                error={!!(phongId && bedOptions.length === 0)}
                helperText={
                  phongId && bedOptions.length === 0 ? 'Phòng này không còn giường trống!' : ''
                }
              >
                {bedOptions.map((g: any) => (
                  <MenuItem key={g.id} value={g.id}>
                    Số giường: {g.maGiuong}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>
        )}

        <Divider />

        <Stack spacing={1} sx={{ bgcolor: '#fff5f5', p: 1.5, borderRadius: 1 }}>
          <TextField
            fullWidth
            label="Lý do từ chối (nếu có)"
            multiline
            rows={2}
            size="small"
            value={ghiChu}
            onChange={(e) => setGhiChu(e.target.value)}
          />
          <Button
            variant="outlined"
            color="error"
            startIcon={<Cancel />}
            onClick={handleRejectAction}
            fullWidth
            size="small"
          >
            Từ chối đơn này
          </Button>
        </Stack>
      </Stack>
    </FormDetailsModal>
  );
  //#endregion
};
