import { Stack, TextField, MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

export const TaiSanKtxForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <TextField
        label="Mã tài sản"
        fullWidth
        placeholder="Ví dụ: TS001, TS002..."
        {...register('maTaiSan')}
        error={!!errors.maTaiSan}
        helperText={errors.maTaiSan?.message as string}
      />

      <TextField
        label="Tên tài sản"
        fullWidth
        placeholder="Ví dụ: Giường tầng, Tủ quần áo, Bàn ghế..."
        {...register('tenTaiSan')}
        error={!!errors.tenTaiSan}
        helperText={errors.tenTaiSan?.message as string}
      />

      <PhongSelection control={control} name="phongKtxId" label="Phòng KTX" required={false} />

      <TextField
        label="Tình trạng"
        fullWidth
        select
        defaultValue=""
        {...register('tinhTrang')}
        error={!!errors.tinhTrang}
        helperText={errors.tinhTrang?.message as string}
      >
        <MenuItem value="Tot">Tốt</MenuItem>
        <MenuItem value="BinhThuong">Bình thường</MenuItem>
        <MenuItem value="CanSuaChua">Cần sửa chữa</MenuItem>
        <MenuItem value="Hong">Hỏng</MenuItem>
      </TextField>

      <TextField
        label="Giá trị (VNĐ)"
        fullWidth
        type="number"
        placeholder="Nhập giá trị tài sản"
        {...register('giaTri', { valueAsNumber: true })}
        error={!!errors.giaTri}
        helperText={errors.giaTri?.message as string}
      />

      <TextField
        label="Ghi chú"
        fullWidth
        multiline
        rows={3}
        placeholder="Nhập ghi chú về tài sản (tùy chọn)"
        {...register('ghiChu')}
        error={!!errors.ghiChu}
        helperText={errors.ghiChu?.message as string}
      />
    </Stack>
  );
};
