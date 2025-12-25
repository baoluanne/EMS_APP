import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Box,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '@renderer/shared/configs/env.config';
import { DonKtxRow } from '@renderer/features/ktx-management/don-sinh-vien/type';

const api = axios.create({
  baseURL: env.API_ENDPOINT,
});

interface XuLyDonModalProps {
  open: boolean;
  onClose: () => void;
  don: DonKtxRow | null;
  onSuccess: () => void;
}

const XuLyDonModal: React.FC<XuLyDonModalProps> = ({ open, onClose, don, onSuccess }) => {
  const queryClient = useQueryClient();
  const [ghiChu, setGhiChu] = useState('');
  const [toaNhaId, setToaNhaId] = useState('');
  const [phongId, setPhongId] = useState('');
  const [giuongId, setGiuongId] = useState('');
  const [lyDoTuChoi, setLyDoTuChoi] = useState('');
  const [ngayBatDauDuyet, setNgayBatDauDuyet] = useState('');
  const [ngayHetHanDuyet, setNgayHetHanDuyet] = useState('');

  const isVaoOOrChuyenPhong = don != null && ['VaoO', 'ChuyenPhong'].includes(don.loaiDon);
  const isVaoOOrGiaHan = don != null && ['VaoO', 'GiaHanKtx'].includes(don.loaiDon);

  useEffect(() => {
    if (don) {
      setNgayBatDauDuyet(
        don.ngayBatDauMongMuon
          ? new Date(don.ngayBatDauMongMuon).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      );
      setNgayHetHanDuyet(
        don.ngayHetHanMongMuon ? new Date(don.ngayHetHanMongMuon).toISOString().split('T')[0] : '',
      );
    } else {
      setNgayBatDauDuyet('');
      setNgayHetHanDuyet('');
    }
  }, [don]);

  const { data: toaNhaList = [], isLoading: loadingToaNha } = useQuery({
    queryKey: ['toa-nha-ktx-selection'],
    queryFn: async () => {
      try {
        const response = await api.get('/toa-nha-ktx/pagination', {
          params: { page: 1, pageSize: 200 },
        });

        const raw = response.data;
        let list: any[] = [];

        if (raw.result && Array.isArray(raw.result)) {
          list = raw.result;
        } else if (raw.data && Array.isArray(raw.data)) {
          list = raw.data;
        } else if (raw.items && Array.isArray(raw.items)) {
          list = raw.items;
        } else if (Array.isArray(raw)) {
          list = raw;
        }

        return list
          .map((item: any) => ({
            id: item.id?.toString() || '',
            tenToaNha: item.tenToaNha || 'Không tên',
          }))
          .filter((item) => item.id);
      } catch (error) {
        return [error];
      }
    },
    enabled: open && isVaoOOrChuyenPhong,
    staleTime: 0,
  });

  const {
    data: phongList = [],
    isLoading: loadingPhong,
    error: errorPhong,
  } = useQuery({
    queryKey: ['phong-ktx', toaNhaId],
    queryFn: async () => {
      try {
        const response = await api.get('/phong-ktx/pagination', {
          params: {
            page: 1,
            pageSize: 200,
            toaNhaId: toaNhaId || undefined,
          },
        });

        const raw = response.data;
        let list: any[] = [];

        if (raw.data && Array.isArray(raw.data)) list = raw.data;
        else if (raw.result && Array.isArray(raw.result)) list = raw.result;
        else if (Array.isArray(raw)) list = raw;

        return list
          .map((item: any) => ({
            id: item.id?.toString() || '',
            maPhong: item.maPhong || 'Không mã',
            tenToaNha: item.tenToaNha || 'Không rõ tòa',
          }))
          .filter((item) => item.id);
      } catch (error) {
        return [error];
      }
    },
    enabled: open && isVaoOOrChuyenPhong && !!toaNhaId,
    staleTime: 0,
  });

  const {
    data: giuongList = [],
    isLoading: loadingGiuong,
    error: errorGiuong,
  } = useQuery({
    queryKey: ['giuong-trong', phongId],
    queryFn: async () => {
      if (!phongId) return [];
      try {
        const response = await api.get('/giuongKtx/pagination', {
          params: {
            phongId,
            trangThai: 'Trong',
            page: 1,
            pageSize: 100,
          },
        });

        const raw = response.data;
        let list: any[] = [];

        if (raw.result && Array.isArray(raw.result)) list = raw.result;
        else if (raw.data && Array.isArray(raw.data)) list = raw.data;
        else if (Array.isArray(raw)) list = raw;

        return list
          .filter((item: any) => item.trangThai === 'Trong')
          .map((item: any) => ({
            id: item.id?.toString() || '',
            maGiuong: item.maGiuong || 'Không mã',
          }))
          .filter((item) => item.id);
      } catch (error) {
        return [error];
      }
    },
    enabled: !!phongId && isVaoOOrChuyenPhong,
    staleTime: 0,
  });

  const mutation = useMutation({
    mutationFn: async (endpoint: string) => api.post(endpoint),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-ktx'] });
      onSuccess();
    },
  });

  const tuChoiMutation = useMutation({
    mutationFn: async (lyDo: string) => {
      return api.post(`/don-ktx/${don?.id}/tu-choi`, lyDo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-ktx'] });
      onSuccess();
    },
  });

  const handleDuyet = () => {
    if (isVaoOOrChuyenPhong && (!phongId || !giuongId)) {
      alert('Vui lòng chọn phòng và giường');
      return;
    }

    if (isVaoOOrGiaHan) {
      if (!ngayBatDauDuyet || !ngayHetHanDuyet) {
        alert('Vui lòng nhập đầy đủ ngày bắt đầu và ngày hết hạn duyệt');
        return;
      }
      if (new Date(ngayHetHanDuyet) <= new Date(ngayBatDauDuyet)) {
        alert('Ngày hết hạn phải sau ngày bắt đầu');
        return;
      }
    }

    let endpoint = `/don-ktx/${don?.id}`;

    switch (don?.loaiDon) {
      case 'VaoO':
        endpoint += `/duyet-vao-o?phongId=${phongId}&giuongId=${giuongId}&ngayBatDau=${ngayBatDauDuyet}&ngayHetHan=${ngayHetHanDuyet}`;
        break;
      case 'ChuyenPhong':
        endpoint += `/duyet-chuyen-phong?phongMoiId=${phongId}&giuongMoiId=${giuongId}&ngayBatDau=${ngayBatDauDuyet}&ngayHetHan=${ngayHetHanDuyet}`;
        break;
      case 'GiaHanKtx':
        endpoint += `/duyet-gia-han?ngayHetHanMoi=${ngayHetHanDuyet}`;
        break;
      case 'RoiKtx':
        endpoint += '/duyet-roi-ktx';
        break;
      default:
        return;
    }

    if (ghiChu.trim()) {
      endpoint += `${endpoint.includes('?') ? '&' : '?'}ghiChuDuyet=${encodeURIComponent(ghiChu.trim())}`;
    }

    mutation.mutate(endpoint);
  };

  const handleTuChoi = () => {
    if (!lyDoTuChoi.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }
    tuChoiMutation.mutate(lyDoTuChoi.trim());
  };

  const getTitle = () => {
    switch (don?.loaiDon) {
      case 'VaoO':
        return 'Duyệt đơn vào ở';
      case 'ChuyenPhong':
        return 'Duyệt chuyển phòng';
      case 'GiaHanKtx':
        return 'Duyệt gia hạn';
      case 'RoiKtx':
        return 'Duyệt rời KTX';
      default:
        return 'Xử lý đơn';
    }
  };

  if (!don) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2">Thông tin sinh viên:</Typography>
            <Typography>
              {don.maSinhVien} - {don.hoTenSinhVien}
            </Typography>
          </Box>

          {(don.loaiDon === 'VaoO' || don.loaiDon === 'GiaHanKtx') && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Thời hạn mong muốn trong đơn
              </Typography>
              <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
                <Typography>
                  <strong>Bắt đầu:</strong>{' '}
                  {don.ngayBatDauMongMuon
                    ? new Date(don.ngayBatDauMongMuon).toLocaleDateString('vi-VN')
                    : 'Không có'}
                </Typography>
                <Typography>
                  <strong>Hết hạn:</strong>{' '}
                  {don.ngayHetHanMongMuon
                    ? new Date(don.ngayHetHanMongMuon).toLocaleDateString('vi-VN')
                    : 'Không có'}
                </Typography>
              </Stack>
            </Box>
          )}

          {don.loaiDon === 'GiaHanKtx' && (
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Thời hạn cư trú hiện tại
              </Typography>
              <Stack spacing={2} sx={{ pl: 2 }}>
                <Typography>
                  <strong>Ngày bắt đầu:</strong>{' '}
                  <span style={{ color: don.ngayBatDauHienTai ? 'green' : 'red', fontWeight: 600 }}>
                    {don.ngayBatDauHienTai
                      ? new Date(don.ngayBatDauHienTai).toLocaleDateString('vi-VN')
                      : 'Chưa có'}
                  </span>
                </Typography>
                <Typography>
                  <strong>Ngày hết hạn:</strong>{' '}
                  <span
                    style={{ color: don.ngayHetHanHienTai ? '#ff9800' : 'red', fontWeight: 600 }}
                  >
                    {don.ngayHetHanHienTai
                      ? new Date(don.ngayHetHanHienTai).toLocaleDateString('vi-VN')
                      : 'Chưa có'}
                  </span>
                </Typography>
              </Stack>
            </Box>
          )}

          {isVaoOOrGiaHan && (
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Thời hạn duyệt thực tế (bắt buộc)
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  required
                  fullWidth
                  label="Ngày bắt đầu ở"
                  type="date"
                  value={ngayBatDauDuyet}
                  onChange={(e) => setNgayBatDauDuyet(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                />
                <TextField
                  required
                  fullWidth
                  label="Ngày hết hạn"
                  type="date"
                  value={ngayHetHanDuyet}
                  onChange={(e) => setNgayHetHanDuyet(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: ngayBatDauDuyet || new Date().toISOString().split('T')[0] }}
                  error={
                    !!ngayBatDauDuyet &&
                    !!ngayHetHanDuyet &&
                    new Date(ngayHetHanDuyet) <= new Date(ngayBatDauDuyet)
                  }
                  helperText={
                    !!ngayBatDauDuyet &&
                    !!ngayHetHanDuyet &&
                    new Date(ngayHetHanDuyet) <= new Date(ngayBatDauDuyet)
                      ? 'Ngày hết hạn phải sau ngày bắt đầu'
                      : ''
                  }
                />
              </Stack>
            </Box>
          )}

          {isVaoOOrChuyenPhong && (
            <>
              {loadingToaNha ? (
                <Box textAlign="center">
                  <CircularProgress size={30} />
                </Box>
              ) : toaNhaList.length === 0 ? (
                <Alert severity="warning">Không có tòa nhà nào</Alert>
              ) : (
                <TextField
                  select
                  label="Chọn tòa nhà"
                  fullWidth
                  value={toaNhaId}
                  onChange={(e) => {
                    setToaNhaId(e.target.value);
                    setPhongId('');
                    setGiuongId('');
                  }}
                >
                  <MenuItem value="">-- Chọn tòa nhà --</MenuItem>
                  {toaNhaList.map((toaNha: any) => (
                    <MenuItem key={toaNha.id} value={toaNha.id}>
                      {toaNha.tenToaNha}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {errorPhong ? (
                <Alert severity="error">Không tải được danh sách phòng</Alert>
              ) : loadingPhong ? (
                <Box textAlign="center">
                  <CircularProgress size={30} />
                </Box>
              ) : phongList.length === 0 ? (
                <Alert severity="warning">Không có phòng nào trong tòa này</Alert>
              ) : (
                <TextField
                  select
                  label="Chọn phòng"
                  fullWidth
                  value={phongId}
                  onChange={(e) => {
                    setPhongId(e.target.value);
                    setGiuongId('');
                  }}
                  disabled={!toaNhaId}
                >
                  <MenuItem value="">-- Chọn phòng --</MenuItem>
                  {phongList.map((phong: any) => (
                    <MenuItem key={phong.id} value={phong.id}>
                      {phong.maPhong} - {phong.tenToaNha}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {phongId && (
                <>
                  {errorGiuong ? (
                    <Alert severity="error">Không tải được danh sách giường</Alert>
                  ) : loadingGiuong ? (
                    <Box textAlign="center">
                      <CircularProgress size={30} />
                    </Box>
                  ) : giuongList.length === 0 ? (
                    <Alert severity="warning">Không có giường trống trong phòng này</Alert>
                  ) : (
                    <TextField
                      select
                      label="Chọn giường trống"
                      fullWidth
                      value={giuongId}
                      onChange={(e) => setGiuongId(e.target.value)}
                    >
                      <MenuItem value="">-- Chọn giường --</MenuItem>
                      {giuongList.map((giuong: any) => (
                        <MenuItem key={giuong.id} value={giuong.id}>
                          Giường {giuong.maGiuong}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </>
              )}
            </>
          )}

          <TextField
            label="Ghi chú duyệt (tùy chọn)"
            fullWidth
            multiline
            rows={3}
            value={ghiChu}
            onChange={(e) => setGhiChu(e.target.value)}
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Hoặc từ chối đơn
            </Typography>
            <TextField
              label="Lý do từ chối (bắt buộc nếu từ chối)"
              fullWidth
              multiline
              rows={2}
              value={lyDoTuChoi}
              onChange={(e) => setLyDoTuChoi(e.target.value)}
            />
          </Box>

          {(mutation.isError || tuChoiMutation.isError) && (
            <Alert severity="error">
              Lỗi:{' '}
              {(mutation.error as any)?.response?.data?.message ||
                (tuChoiMutation.error as any)?.response?.data?.message ||
                'Không thể xử lý đơn'}
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleTuChoi}
          disabled={tuChoiMutation.isPending || !lyDoTuChoi.trim()}
        >
          {tuChoiMutation.isPending ? <CircularProgress size={20} /> : 'Từ chối'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDuyet}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <CircularProgress size={20} /> : 'Duyệt'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default XuLyDonModal;
