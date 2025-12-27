import { Stack, TextField, MenuItem, Box, Typography, CircularProgress } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { SinhVienDangOKtxSelection } from '@renderer/components/selections/ktx/SinhVienDangOKtxSelection';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TaiSanOption {
  id: string;
  tenTaiSan: string;
  maTaiSan: string;
  tinhTrang: string;
}

export const YeuCauSuaChuaForm = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const sinhVienId = useWatch({ control, name: 'sinhVienId' });
  const phongKtxId = useWatch({ control, name: 'phongKtxId' });
  const taiSanKtxId = useWatch({ control, name: 'taiSanKtxId' });
  const trangThai = useWatch({ control, name: 'trangThai' });

  const [phongInfo, setPhongInfo] = useState<any>(null);
  const [taiSanOptions, setTaiSanOptions] = useState<TaiSanOption[]>([]);
  const [taiSanInfo, setTaiSanInfo] = useState<any>(null);
  const [loadingPhong, setLoadingPhong] = useState(false);
  const [loadingTaiSan, setLoadingTaiSan] = useState(false);

  // Tự động set trạng thái mặc định là "MoiGui" khi tạo mới
  useEffect(() => {
    setValue('trangThai', 'MoiGui');
  }, [setValue]);

  useEffect(() => {
    if (!sinhVienId) {
      setValue('phongKtxId', '');
      setValue('taiSanKtxId', '');
      setPhongInfo(null);
      setTaiSanOptions([]);
      setTaiSanInfo(null);
      return;
    }

    setLoadingPhong(true);
    axios
      .get(`http://localhost:5031/api/cu-tru-ktx/hop-dong-hien-tai/${sinhVienId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        const giuongKtx = data?.giuongKtx;
        const phongKtx = giuongKtx?.phongKtx;
        const phongId = phongKtx?.id;

        if (phongId) {
          setValue('phongKtxId', phongId);
          setPhongInfo({
            maPhong: phongKtx?.maPhong || 'Chưa xác định',
            tenToaNha: phongKtx?.toaNha?.tenToaNha || 'Chưa xác định',
          });
        } else {
          setPhongInfo(null);
        }
      })
      .catch(() => {
        setPhongInfo(null);
        setValue('phongKtxId', '');
      })
      .finally(() => setLoadingPhong(false));
  }, [sinhVienId, setValue]);

  useEffect(() => {
    if (!phongKtxId) {
      setTaiSanOptions([]);
      setValue('taiSanKtxId', '');
      setTaiSanInfo(null);
      return;
    }

    setLoadingTaiSan(true);
    axios
      .get('http://localhost:5031/api/tai-san-ktx/pagination', {
        params: { page: 1, pageSize: 1000, phongKtxId },
      })
      .then((res) => {
        const data = res.data?.data || [];
        setTaiSanOptions(Array.isArray(data) ? data : []);
      })
      .catch(() => setTaiSanOptions([]))
      .finally(() => setLoadingTaiSan(false));
  }, [phongKtxId, setValue]);

  useEffect(() => {
    if (!taiSanKtxId) {
      setTaiSanInfo(null);
      return;
    }

    axios
      .get(`http://localhost:5031/api/tai-san-ktx/${taiSanKtxId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        setTaiSanInfo(data);
        setValue('maTaiSan', data?.maTaiSan || '');
        setValue('tenTaiSan', data?.tenTaiSan || '');
        setValue('tinhTrangTaiSan', data?.tinhTrang || '');
      })
      .catch(() => setTaiSanInfo(null));
  }, [taiSanKtxId, setValue]);

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />
      <input type="hidden" {...register('phongKtxId')} />
      <input type="hidden" {...register('maTaiSan')} />
      <input type="hidden" {...register('tenTaiSan')} />
      <input type="hidden" {...register('tinhTrangTaiSan')} />
      <input type="hidden" {...register('maPhong')} />
      <input type="hidden" {...register('tenToaNha')} />
      <input type="hidden" {...register('hoTenSinhVien')} />

      <TextField
        label="Tiêu đề yêu cầu"
        fullWidth
        placeholder="Nhập tiêu đề sửa chữa"
        {...register('tieuDe')}
        error={!!errors.tieuDe}
        helperText={errors.tieuDe?.message as string}
      />

      <TextField
        label="Nội dung chi tiết"
        fullWidth
        multiline
        rows={4}
        placeholder="Mô tả chi tiết vấn đề cần sửa chữa"
        {...register('noiDung')}
        error={!!errors.noiDung}
        helperText={errors.noiDung?.message as string}
      />

      <SinhVienDangOKtxSelection control={control} name="sinhVienId" label="Chọn sinh viên" />

      {loadingPhong && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Đang tải phòng...</Typography>
        </Box>
      )}

      {phongInfo && !loadingPhong && (
        <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 1, border: '2px solid #1976d2' }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
            🏠 Phòng KTX
          </Typography>
          <Stack spacing={1} sx={{ fontSize: '0.95rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Mã phòng:</span>
              <strong>{phongInfo.maPhong}</strong>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tòa nhà:</span>
              <strong>{phongInfo.tenToaNha}</strong>
            </Box>
          </Stack>
        </Box>
      )}

      {phongKtxId && (
        <Box sx={{ position: 'relative' }}>
          <TextField
            label="Chọn tài sản cần sửa chữa (nếu có)"
            fullWidth
            select
            value={taiSanKtxId || ''}
            onChange={(e) => setValue('taiSanKtxId', e.target.value)}
            disabled={loadingTaiSan}
          >
            <MenuItem value="">-- Không chọn tài sản --</MenuItem>
            {taiSanOptions.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.maTaiSan} - {item.tenTaiSan}
              </MenuItem>
            ))}
          </TextField>
          {loadingTaiSan && (
            <CircularProgress
              size={24}
              sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
          )}
        </Box>
      )}

      {taiSanInfo && (
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, border: '1px solid #e0e0e0' }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#1976d2' }}>
            ℹ️ Thông tin tài sản
          </Typography>
          <Stack spacing={1} sx={{ fontSize: '0.875rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Mã:</span>
              <strong>{taiSanInfo.maTaiSan || '-'}</strong>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tên:</span>
              <strong>{taiSanInfo.tenTaiSan || '-'}</strong>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tình trạng:</span>
              <strong>{taiSanInfo.tinhTrang || '-'}</strong>
            </Box>
          </Stack>
        </Box>
      )}

      <TextField
        label="Trạng thái yêu cầu"
        fullWidth
        select
        {...register('trangThai')}
        error={!!errors.trangThai}
        helperText={errors.trangThai?.message as string}
      >
        <MenuItem value="MoiGui">Mới gửi</MenuItem>
        <MenuItem value="DangXuLy">Đang xử lý</MenuItem>
        <MenuItem value="DaXong">Hoàn thành</MenuItem>
        <MenuItem value="Huy">Từ chối</MenuItem>
      </TextField>

      {trangThai !== 'MoiGui' && trangThai !== 'DangXuLy' && (
        <>
          <TextField
            label="Ghi chú xử lý"
            fullWidth
            multiline
            rows={3}
            placeholder="Ghi chú về quá trình sửa chữa"
            {...register('ghiChuXuLy')}
            error={!!errors.ghiChuXuLy}
            helperText={errors.ghiChuXuLy?.message as string}
          />

          <TextField
            label="Ngày xử lý"
            fullWidth
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </>
      )}
    </Stack>
  );
};
