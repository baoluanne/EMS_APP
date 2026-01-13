import { useEffect } from 'react';
import { Stack, MenuItem, Typography, Box, Alert, Divider } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';

export const PhongKtxForm = () => {
  const { control, register, setError, clearErrors } = useFormContext();

  const id = useWatch({ control, name: 'id' });
  const soLuongDaO = useWatch({ control, name: 'soLuongDaO' }) || 0;
  const soLuongGiuong = useWatch({ control, name: 'soLuongGiuong' });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && soLuongGiuong !== undefined && soLuongGiuong < soLuongDaO) {
      setError('soLuongGiuong', {
        type: 'manual',
        message: `Số giường không thể nhỏ hơn số sinh viên hiện có (${soLuongDaO})`,
      });
    } else {
      clearErrors('soLuongGiuong');
    }
  }, [soLuongGiuong, soLuongDaO, isEditMode, setError, clearErrors]);

  return (
    <Stack spacing={2.5} sx={{ mt: 1 }}>
      <input type="hidden" {...register('id')} />

      <Box>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">
          THÔNG TIN VỊ TRÍ
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <Box flex={1}>
              {isEditMode ? (
                <ControlledTextField
                  label="Tòa nhà"
                  control={control}
                  name="tenToaNha"
                  disabled
                  helperText={''}
                />
              ) : (
                <ToaNhaSelection control={control} name="toaNhaId" label="Chọn tòa nhà" />
              )}
            </Box>
            <Box flex={1}>
              <ControlledTextField
                label="Mã phòng"
                control={control}
                name="maPhong"
                placeholder="Ví dụ: P.101"
                helperText={''}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">
          CẤU HÌNH & TRẠNG THÁI
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <ControlledTextField
              label="Tổng số giường"
              control={control}
              name="soLuongGiuong"
              type="number"
              placeholder="Nhập số giường..."
              helperText={isEditMode ? `Đang ở: ${soLuongDaO}` : ''}
            />
            <ControlledTextField
              label="Số giường đã ở"
              control={control}
              name="soLuongDaO"
              type="number"
              disabled
              helperText={'Tự động cập nhật'}
            />
          </Stack>

          <Stack direction="row" spacing={1}>
            <Box flex={1}>
              <ControlledTextField
                label="Giá phòng (VNĐ)"
                control={control}
                name="giaPhong"
                type="number"
                placeholder="500,000"
                helperText={''}
              />
            </Box>
            <Box flex={1}>
              <ControlledTextField
                label="Trạng thái"
                control={control}
                name="trangThai"
                select
                helperText={''}
              >
                <MenuItem value="HOAT_DONG">Đang hoạt động</MenuItem>
                <MenuItem value="NGUNG_HOAT_DONG">Ngừng hoạt động</MenuItem>
                <MenuItem value="BAO_TRI">Đang bảo trì</MenuItem>
              </ControlledTextField>
            </Box>
          </Stack>

          {isEditMode && soLuongDaO > 0 && (
            <Alert severity="info" sx={{ py: 0 }}>
              Phòng đang có {soLuongDaO} sinh viên cư trú.
            </Alert>
          )}
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">
          GHI CHÚ BỔ SUNG
        </Typography>
        <ControlledTextField
          label="Ghi chú chi tiết"
          control={control}
          name="ghiChu"
          multiline
          minRows={3}
          placeholder="Thông tin về cơ sở vật chất, hỏng hóc..."
          helperText={''}
        />
      </Box>
    </Stack>
  );
};
