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
import { Cancel, Person, Assignment, Home } from '@mui/icons-material';
import { format } from 'date-fns';

interface Props {
  onClose: () => void;
  selectedId: string;
  onSuccess: () => void;
}

export const ApproveDonModal = ({ onClose, selectedId, onSuccess }: Props) => {
  const [phongId, setPhongId] = useState('');
  const [giuongId, setGiuongId] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  const { data: donData } = useCrudPagination<any>({
    entity: 'DonKtx',
    endpoint: `pagination?Id=${selectedId}`,
    enabled: !!selectedId,
  });

  const currentDon = useMemo(() => (donData as any)?.result?.[0] || donData, [donData]);

  const requestedPhong = useMemo(() => {
    return currentDon?.dangKyMoi?.phongYeuCau || currentDon?.chuyenPhong?.phongYeuCau;
  }, [currentDon]);

  useEffect(() => {
    if (requestedPhong?.id) {
      setPhongId(requestedPhong.id);
    }
  }, [requestedPhong]);

  const { data: phongs } = useCrudPagination<any>({
    entity: 'PhongKtx',
    endpoint: `pagination?Gender=${currentDon?.sinhVien?.gioiTinh ?? ''}`,
    enabled: !!currentDon,
  });

  const { data: fetchedGiuongs, isRefetching } = useCrudPagination<any>({
    entity: 'GiuongKtx',
    endpoint: `pagination?PhongId=${phongId}&TrangThai=0`,
    enabled: !!phongId && phongId !== requestedPhong?.id,
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
    if (!phongId || !giuongId) {
      toast.error('Vui lòng chọn phòng và giường để duyệt');
      return;
    }
    try {
      await approveDon({});
      toast.success('Duyệt đơn thành công');
      onSuccess();
      onClose();
    } catch {
      toast.error('Lỗi khi duyệt');
    }
  };

  const handleReject = async () => {
    if (!ghiChu.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }
    try {
      await rejectDon({ ghiChu });
      toast.success('Đã từ chối đơn');
      onSuccess();
      onClose();
    } catch {
      toast.error('Lỗi khi từ chối');
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

  return (
    <FormDetailsModal
      title="Hệ thống phê duyệt đơn nội trú"
      onClose={onClose}
      onSave={handleApprove}
      saveTitle="Duyệt đơn"
      maxWidth="sm"
    >
      <Stack spacing={2} sx={{ mt: 1 }}>
        <Paper
          variant="outlined"
          sx={{ p: 2, bgcolor: '#fcfcfc', borderLeft: '4px solid #1976d2' }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Person fontSize="small" color="primary" />
            <Typography variant="subtitle2" fontWeight={700} color="primary">
              THÔNG TIN CHI TIẾT ĐƠN
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            <InfoItem label="Mã đơn" value={currentDon?.maDon} color="primary" bold />
            <InfoItem
              label="Ngày đăng ký"
              value={
                currentDon?.ngayGuiDon
                  ? format(new Date(currentDon.ngayGuiDon), 'dd/MM/yyyy')
                  : '---'
              }
            />
            <Grid size={12}>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </Grid>
            <InfoItem
              label="Sinh viên"
              value={`${currentDon?.sinhVien?.hoDem || ''} ${currentDon?.sinhVien?.ten || ''}`.trim()}
              bold
            />
            <InfoItem label="Mã sinh viên" value={currentDon?.sinhVien?.maSinhVien} bold />
            <InfoItem
              label="Giới tính"
              value={currentDon?.sinhVien?.gioiTinh === 0 ? 'Nam' : 'Nữ'}
            />
            <InfoItem label="Gói dịch vụ" value={currentDon?.goiDichVu?.maKhoanThu || 'Mặc định'} />
            <Grid size={12}>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </Grid>
            <InfoItem
              label="PHÒNG YÊU CẦU"
              value={requestedPhong?.maPhong || 'Chưa chọn'}
              color="error"
              bold
            />
            <InfoItem
              label="Ngày bắt đầu ở"
              value={
                currentDon?.ngayBatDau
                  ? format(new Date(currentDon.ngayBatDau), 'dd/MM/yyyy')
                  : '---'
              }
            />
          </Grid>
        </Paper>

        <Box sx={{ px: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <Home fontSize="small" color="success" />
            <Typography variant="caption" fontWeight={700} color="success.main">
              CHỈ ĐỊNH PHÒNG & GIƯỜNG DUYỆT
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <TextField
              select
              fullWidth
              label="Chọn phòng duyệt"
              value={phongId}
              onChange={(e) => {
                setPhongId(e.target.value);
                setGiuongId('');
              }}
              size="small"
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
              label="Chọn giường duyệt"
              value={giuongId}
              onChange={(e) => setGiuongId(e.target.value)}
              size="small"
              disabled={!phongId || isRefetching}
              error={!!(phongId && bedOptions.length === 0)}
              helperText={
                phongId && bedOptions.length === 0
                  ? 'Phòng này hiện tại không còn giường trống!'
                  : ''
              }
            >
              {bedOptions.map((g: any) => (
                <MenuItem key={g.id} value={g.id}>
                  Giường: {g.maGiuong}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>

        <Divider />

        <Stack spacing={1.5} sx={{ bgcolor: '#fff5f5', p: 1.5, borderRadius: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Assignment fontSize="small" color="error" />
            <Typography variant="caption" fontWeight={700} color="error">
              HÀNH ĐỘNG TỪ CHỐI
            </Typography>
          </Stack>
          <TextField
            fullWidth
            label="Lý do từ chối"
            multiline
            rows={2}
            value={ghiChu}
            onChange={(e) => setGhiChu(e.target.value)}
            size="small"
          />
          <Button
            variant="outlined"
            color="error"
            startIcon={<Cancel />}
            onClick={handleReject}
            fullWidth
            size="small"
          >
            Từ chối đơn đăng ký
          </Button>
        </Stack>
      </Stack>
    </FormDetailsModal>
  );
};
