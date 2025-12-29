import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const ToaNhaForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <TextField
        label="Tên tòa nhà"
        fullWidth
        placeholder="Ví dụ: Tòa A, Tòa Nam, Tòa Nữ..."
        {...register('tenToaNha')}
        error={!!errors.tenToaNha}
        helperText={errors.tenToaNha?.message as string}
      />

      <TextField
        label="Loại tòa nhà"
        fullWidth
        placeholder="Ví dụ: Nam, Nữ, Hỗn hợp (tùy chọn)"
        {...register('loaiToaNha')}
        error={!!errors.loaiToaNha}
        helperText={errors.loaiToaNha?.message as string}
      />
    </Stack>
  );
};
