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

  const id = useWatch({ control, name: 'id' });
  const isEditMode = !!id;

  const sinhVienId = useWatch({ control, name: 'sinhVienId' });
  const phongKtxId = useWatch({ control, name: 'phongKtxId' });
  const taiSanKtxId = useWatch({ control, name: 'taiSanKtxId' });
  const trangThai = useWatch({ control, name: 'trangThai' });
  const ngayHoanThanh = useWatch({ control, name: 'ngayHoanThanh' });

  const [phongInfo, setPhongInfo] = useState<any>(null);
  const [taiSanOptions, setTaiSanOptions] = useState<TaiSanOption[]>([]);
  const [taiSanInfo, setTaiSanInfo] = useState<any>(null);
  const [loadingPhong, setLoadingPhong] = useState(false);
  const [loadingTaiSan, setLoadingTaiSan] = useState(false);

  const maTaiSan = useWatch({ control, name: 'maTaiSan' });
  const tenTaiSan = useWatch({ control, name: 'tenTaiSan' });
  const tinhTrangTaiSan = useWatch({ control, name: 'tinhTrangTaiSan' });

  // Khởi tạo ngày mặc định khi tạo mới
  useEffect(() => {
    if (!isEditMode) {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      setValue('ngayGui', dateString);
    }
  }, [isEditMode, setValue]);

  // Xử lý sinh viên → tải phòng
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
          setValue('phongKtxId', '');
          setPhongInfo(null);
        }
      })
      .catch(() => {
        setValue('phongKtxId', '');
        setPhongInfo(null);
      })
      .finally(() => setLoadingPhong(false));
  }, [sinhVienId, setValue]);

  // Xử lý phòng → tải tài sản
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

  // Xử lý tài sản → hiển thị thông tin
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
      <input type="hidden" {...register('maTaiSan')} />
      <input type="hidden" {...register('tenTaiSan')} />
      <input type="hidden" {...register('tinhTrangTaiSan')} />
      <input type="hidden" {...register('maPhong')} />
      <input type="hidden" {...register('tenToaNha')} />
      <input type="hidden" {...register('hoTenSinhVien')} />
      <input type="hidden" {...register('chiPhiPhatSinh')} />
      <input type="hidden" {...register('ngayHoanThanh')} />

      <TextField
        label="Tiêu đề yêu cầu"
        fullWidth
        placeholder="Nhập tiêu đề sửa chữa"
        {...register('tieuDe', { required: 'Tiêu đề không được để trống' })}
        error={!!errors.tieuDe}
        helperText={errors.tieuDe?.message as string}
      />

      <TextField
        label="Nội dung chi tiết"
        fullWidth
        multiline
        rows={4}
        placeholder="Mô tả chi tiết vấn đề cần sửa chữa"
        {...register('noiDung', { required: 'Nội dung không được để trống' })}
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

      {/* Chỉ hiển thị chọn tài sản ở chế độ tạo mới */}
      {phongKtxId && !isEditMode && (
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

      {/* Hiển thị thông tin tài sản - chỉ ở chế độ tạo mới khi đã chọn */}
      {!isEditMode && taiSanInfo && (
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

      {/* Hiển thị tài sản dạng read-only ở chế độ edit khi có tài sản */}
      {isEditMode && taiSanKtxId && (
        <Box sx={{ p: 2, bgcolor: '#fff3cd', borderRadius: 1, border: '1px solid #ffc107' }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#ff6f00' }}>
            ℹ️ Tài sản cần sửa chữa (không thể thay đổi)
          </Typography>
          <Stack spacing={1} sx={{ fontSize: '0.875rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Mã:</span>
              <strong>{tenTaiSan ? tenTaiSan.split(' - ')[0] : maTaiSan || '-'}</strong>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tên:</span>
              <strong>{tenTaiSan || '-'}</strong>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tình trạng hiện tại:</span>
              <strong>{tinhTrangTaiSan || '-'}</strong>
            </Box>
          </Stack>
        </Box>
      )}

      {/* Ngày gửi - hiển thị ở chế độ tạo mới */}
      {!isEditMode && (
        <TextField
          label="Ngày gửi"
          fullWidth
          type="date"
          {...register('ngayGui')}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.ngayGui}
          helperText={errors.ngayGui?.message as string}
        />
      )}

      {/* Trạng thái */}
      <TextField
        label="Trạng thái yêu cầu"
        fullWidth
        select
        value={trangThai || ''}
        onChange={(e) => setValue('trangThai', e.target.value)}
        error={!!errors.trangThai}
        helperText={errors.trangThai?.message as string}
        disabled={!!ngayHoanThanh} // Không cho sửa nếu đã hoàn thành
      >
        {!isEditMode ? (
          <MenuItem value="MoiGui">Mới gửi</MenuItem>
        ) : (
          [
            <MenuItem key="DangXuLy" value="DangXuLy">
              Đang xử lý
            </MenuItem>,
            <MenuItem key="DaXong" value="DaXong">
              Hoàn thành
            </MenuItem>,
            <MenuItem key="Huy" value="Huy">
              Từ chối
            </MenuItem>,
          ]
        )}
      </TextField>

      {/* Ghi chú xử lý + Ngày xử lý/Ngày hoàn thành - chỉ khi edit và không phải trạng thái mới */}
      {isEditMode && trangThai && trangThai !== 'MoiGui' && !ngayHoanThanh && (
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

          {trangThai === 'DangXuLy' && (
            <TextField
              label="Ngày bắt đầu xử lý"
              fullWidth
              type="date"
              {...register('ngayXuLy')}
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.ngayXuLy}
              helperText={errors.ngayXuLy?.message as string}
            />
          )}

          {trangThai === 'DaXong' && (
            <TextField
              label="Ngày hoàn thành"
              fullWidth
              type="date"
              {...register('ngayHoanThanh')}
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.ngayHoanThanh}
              helperText={errors.ngayHoanThanh?.message as string}
            />
          )}
        </>
      )}
    </Stack>
  );
};
