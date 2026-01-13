import { Stack, MenuItem, Box, Typography, CircularProgress } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
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
  const { register, control, setValue } = useFormContext();

  const id = useWatch({ control, name: 'id' });
  const isEditMode = !!id;
  const sinhVienId = useWatch({ control, name: 'sinhVienId' });
  const phongKtxId = useWatch({ control, name: 'phongKtxId' });
  const taiSanKtxId = useWatch({ control, name: 'taiSanKtxId' });
  const trangThai = useWatch({ control, name: 'trangThai' });
  const ngayHoanThanh = useWatch({ control, name: 'ngayHoanThanh' });
  const maTaiSan = useWatch({ control, name: 'maTaiSan' });
  const tenTaiSan = useWatch({ control, name: 'tenTaiSan' });
  const tinhTrangTaiSan = useWatch({ control, name: 'tinhTrangTaiSan' });

  const [phongInfo, setPhongInfo] = useState<any>(null);
  const [taiSanOptions, setTaiSanOptions] = useState<TaiSanOption[]>([]);
  const [taiSanInfo, setTaiSanInfo] = useState<any>(null);
  const [loadingPhong, setLoadingPhong] = useState(false);
  const [loadingTaiSan, setLoadingTaiSan] = useState(false);

  useEffect(() => {
    if (!isEditMode) {
      setValue('ngayGui', new Date().toISOString().split('T')[0]);
    }
  }, [isEditMode, setValue]);

  useEffect(() => {
    if (!sinhVienId) {
      setValue('phongKtxId', '');
      setValue('taiSanKtxId', '');
      setPhongInfo(null);
      setTaiSanOptions([]);
      return;
    }
    setLoadingPhong(true);
    axios
      .get(`http://localhost:5031/api/cu-tru-ktx/hop-dong-hien-tai/${sinhVienId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        const phongKtx = data?.giuongKtx?.phongKtx;
        if (phongKtx?.id) {
          setValue('phongKtxId', phongKtx.id);
          setValue('maPhong', phongKtx.maPhong);
          setValue('tenToaNha', phongKtx.toaNha?.tenToaNha);
          setPhongInfo({
            maPhong: phongKtx.maPhong || 'Chưa xác định',
            tenToaNha: phongKtx.toaNha?.tenToaNha || 'Chưa xác định',
          });
        }
      })
      .catch(() => setPhongInfo(null))
      .finally(() => setLoadingPhong(false));
  }, [sinhVienId, setValue]);

  useEffect(() => {
    if (!phongKtxId) {
      setTaiSanOptions([]);
      return;
    }
    setLoadingTaiSan(true);
    axios
      .get('http://localhost:5031/api/tai-san-ktx/pagination', {
        params: { page: 1, pageSize: 1000, phongKtxId },
      })
      .then((res) => {
        const items = res.data?.data || [];
        setTaiSanOptions(Array.isArray(items) ? items : []);
      })
      .finally(() => setLoadingTaiSan(false));
  }, [phongKtxId]);

  useEffect(() => {
    if (!taiSanKtxId) {
      setTaiSanInfo(null);
      return;
    }
    axios.get(`http://localhost:5031/api/tai-san-ktx/${taiSanKtxId}`).then((res) => {
      const data = res.data?.data || res.data;
      setTaiSanInfo(data);
      if (!isEditMode) {
        setValue('maTaiSan', data?.maTaiSan || '');
        setValue('tenTaiSan', data?.tenTaiSan || '');
        setValue('tinhTrangTaiSan', data?.tinhTrang || '');
      }
    });
  }, [taiSanKtxId, isEditMode, setValue]);

  return (
    <Stack spacing={2.5}>
      <input type="hidden" {...register('id')} />
      <input type="hidden" {...register('maTaiSan')} />
      <input type="hidden" {...register('tenTaiSan')} />
      <input type="hidden" {...register('tinhTrangTaiSan')} />
      <input type="hidden" {...register('maPhong')} />
      <input type="hidden" {...register('tenToaNha')} />
      <input type="hidden" {...register('hoTenSinhVien')} />
      <input type="hidden" {...register('chiPhiPhatSinh')} />
      <input type="hidden" {...register('ngayHoanThanh')} />

      <Stack direction="row" spacing={2}>
        <Box sx={{ flex: 2 }}>
          <ControlledTextField
            label="Tiêu đề yêu cầu"
            control={control}
            name="tieuDe"
            placeholder="Nhập tiêu đề sửa chữa"
            helperText={''}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          {!isEditMode ? (
            <ControlledTextField label="Ngày gửi" control={control} name="ngayGui" type="date" />
          ) : (
            <ControlledTextField
              label="Trạng thái"
              control={control}
              name="trangThai"
              select
              disabled={!!ngayHoanThanh}
            >
              <MenuItem value="DangXuLy">Đang xử lý</MenuItem>
              <MenuItem value="DaXong">Hoàn thành</MenuItem>
              <MenuItem value="Huy">Từ chối</MenuItem>
            </ControlledTextField>
          )}
        </Box>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Box sx={{ flex: 1 }}>
          <SinhVienDangOKtxSelection
            control={control}
            name="sinhVienId"
            label="Sinh viên yêu cầu"
          />
          {loadingPhong && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <CircularProgress size={14} />
              <Typography variant="caption">Đang xác định phòng...</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          {!isEditMode ? (
            <ControlledTextField
              label="Mức độ ưu tiên"
              control={control}
              name="trangThai"
              select
              disabled
            >
              <MenuItem value="MoiGui">Mới gửi (Mặc định)</MenuItem>
            </ControlledTextField>
          ) : (
            <ControlledTextField
              label="Ngày hoàn thành"
              control={control}
              name="ngayHoanThanh"
              type="date"
              disabled
            />
          )}
        </Box>
      </Stack>

      <ControlledTextField
        label="Nội dung chi tiết"
        control={control}
        name="noiDung"
        multiline
        minRows={3}
        placeholder="Mô tả cụ thể sự cố cần khắc phục"
        helperText={''}
      />

      {(phongInfo || taiSanInfo || (isEditMode && taiSanKtxId)) && (
        <Stack direction="row" spacing={2}>
          {phongInfo && (
            <Box
              sx={{
                flex: 1,
                p: 2,
                bgcolor: '#f0f7ff',
                borderRadius: 1,
                border: '1px solid #b3d7ff',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0052cc', mb: 0.5 }}>
                🏠 Vị trí phòng
              </Typography>
              <Typography variant="body2">
                Mã phòng: <strong>{phongInfo.maPhong}</strong> - {phongInfo.tenToaNha}
              </Typography>
            </Box>
          )}
          {(taiSanInfo || (isEditMode && taiSanKtxId)) && (
            <Box
              sx={{
                flex: 1,
                p: 2,
                bgcolor: '#fff9e6',
                borderRadius: 1,
                border: '1px solid #ffe58f',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#874d00', mb: 0.5 }}>
                ℹ️ Tài sản liên quan
              </Typography>
              <Typography variant="body2">
                {isEditMode
                  ? `${tenTaiSan} (${maTaiSan})`
                  : `${taiSanInfo?.tenTaiSan} - ${taiSanInfo?.tinhTrang || tinhTrangTaiSan}`}
              </Typography>
            </Box>
          )}
        </Stack>
      )}

      {phongKtxId && !isEditMode && (
        <ControlledTextField
          label="Chọn tài sản cần sửa chữa"
          control={control}
          name="taiSanKtxId"
          select
          disabled={loadingTaiSan}
        >
          <MenuItem value="">-- Không chọn tài sản (Hỏng hóc chung tại phòng) --</MenuItem>
          {taiSanOptions.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.maTaiSan} - {item.tenTaiSan}
            </MenuItem>
          ))}
        </ControlledTextField>
      )}

      {isEditMode && trangThai !== 'MoiGui' && (
        <Stack spacing={2}>
          <ControlledTextField
            label="Ghi chú xử lý của quản trị viên"
            control={control}
            name="ghiChuXuLy"
            multiline
            minRows={2}
            helperText={''}
          />
          <Stack direction="row" spacing={2}>
            {trangThai === 'DangXuLy' && (
              <Box sx={{ flex: 1 }}>
                <ControlledTextField
                  label="Ngày bắt đầu xử lý"
                  control={control}
                  name="ngayXuLy"
                  type="date"
                />
              </Box>
            )}
            {trangThai === 'DaXong' && (
              <Box sx={{ flex: 1 }}>
                <ControlledTextField
                  label="Ngày hoàn thành thực tế"
                  control={control}
                  name="ngayHoanThanh"
                  type="date"
                />
              </Box>
            )}
            <Box sx={{ flex: 1 }} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
