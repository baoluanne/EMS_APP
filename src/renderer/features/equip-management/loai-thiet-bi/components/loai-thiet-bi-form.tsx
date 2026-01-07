import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const LoaiThietBiForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <TextField
        label="Mã loại thiết bị"
        fullWidth
        placeholder="Ví dụ: LT001, LT002..."
        {...register('maLoai')}
        error={!!errors.maLoai?.message}
        helperText={errors.maLoai?.message as string}
      />

      <TextField
        label="Tên loại thiết bị"
        placeholder="Ví dụ: Máy tính, Máy in..."
        {...register('tenLoai')}
        error={!!errors.tenLoai?.message}
        helperText={errors.tenLoai?.message as string}
      />

      <TextField
        label="Mô tả"
        placeholder="Mô tả về loại thiết bị (tùy chọn)"
        multiline
        rows={4}
        {...register('moTa')}
        error={!!errors.moTa?.message}
        helperText={errors.moTa?.message as string}
      />
    </Stack>
  );
};
