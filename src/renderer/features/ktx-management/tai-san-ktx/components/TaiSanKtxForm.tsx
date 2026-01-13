import { Stack, MenuItem, Typography, Box, Divider } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

export const TaiSanKtxForm = () => {
  const { control, register } = useFormContext();

  return (
    <Stack spacing={2.5} sx={{ mt: 1 }}>
      <input type="hidden" {...register('id')} />

      {/* NHÓM 1: ĐỊNH DANH TÀI SẢN */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">
          THÔNG TIN TÀI SẢN
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <ControlledTextField
              label="Mã tài sản"
              control={control}
              name="maTaiSan"
              placeholder="Ví dụ: TS-001"
              helperText={''}
            />
            <ControlledTextField
              label="Tên tài sản"
              control={control}
              name="tenTaiSan"
              placeholder="Ví dụ: Giường tầng"
              helperText={''}
            />
          </Stack>
          <PhongSelection control={control} name="phongKtxId" label="Phòng ký túc xá" required />
        </Stack>
      </Box>

      <Divider />

      {/* NHÓM 2: TÌNH TRẠNG & GIÁ TRỊ */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">
          TÌNH TRẠNG & GIÁ TRỊ
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <Box flex={1}>
              <ControlledTextField
                label="Tình trạng"
                control={control}
                name="tinhTrang"
                select
                helperText={''}
              >
                <MenuItem value="Tot">Tốt</MenuItem>
                <MenuItem value="BinhThuong">Bình thường</MenuItem>
                <MenuItem value="CanSuaChua">Cần sửa chữa</MenuItem>
                <MenuItem value="Hong">Hỏng</MenuItem>
              </ControlledTextField>
            </Box>
            <Box flex={1}>
              <ControlledTextField
                label="Giá trị (VNĐ)"
                control={control}
                name="giaTri"
                type="number"
                placeholder="Nhập giá trị..."
                helperText={''}
              />
            </Box>
          </Stack>
          <ControlledTextField
            label="Ghi chú"
            control={control}
            name="ghiChu"
            multiline
            minRows={3}
            placeholder="Mô tả chi tiết tình trạng hoặc lưu ý..."
            helperText={''}
          />
        </Stack>
      </Box>
    </Stack>
  );
};
