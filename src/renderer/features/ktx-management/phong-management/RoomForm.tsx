import { Stack, MenuItem, Typography, Divider } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const RoomForm = () => {
  const { control } = useFormContext();

  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={800}>
        THÔNG TIN CHI TIẾT
      </Typography>
      <ControlledTextField label="Mã phòng" name="maPhong" control={control} fullWidth />
      <Stack direction="row" spacing={2}>
        <ControlledTextField select label="Loại phòng" name="loaiPhong" control={control} fullWidth>
          <MenuItem value="Nam">Nam</MenuItem>
          <MenuItem value="Nữ">Nữ</MenuItem>
          <MenuItem value="Hỗn hợp">Hỗn hợp</MenuItem>
        </ControlledTextField>
        <ControlledTextField
          label="Số giường"
          name="soLuongGiuong"
          control={control}
          type="number"
          fullWidth
        />
      </Stack>
      <Divider />
      <ControlledTextField select label="Trạng thái" name="trangThai" control={control} fullWidth>
        <MenuItem value={0}>Hoạt động</MenuItem>
        <MenuItem value={1}>Bảo trì</MenuItem>
      </ControlledTextField>
    </Stack>
  );
};
