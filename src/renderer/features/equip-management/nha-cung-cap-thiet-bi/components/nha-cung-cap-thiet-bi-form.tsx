import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const NhaCungCapForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <TextField
        label="Tên nhà cung cấp"
        fullWidth
        placeholder="Ví dụ: Công ty TNHH ABC"
        {...register('tenNhaCungCap')}
        error={!!errors.tenNhaCungCap?.message}
        helperText={errors.tenNhaCungCap?.message ? (errors.tenNhaCungCap.message as string) : ''}
      />

      <TextField
        label="Điện thoại"
        placeholder="Ví dụ: 0123456789"
        {...register('dienThoai')}
        error={!!errors.dienThoai?.message}
        helperText={errors.dienThoai?.message ? (errors.dienThoai.message as string) : ''}
      />

      <TextField
        label="Email"
        placeholder="Ví dụ: contact@company.com"
        {...register('email')}
        error={!!errors.email?.message}
        helperText={errors.email?.message ? (errors.email.message as string) : ''}
      />

      <TextField
        label="Địa chỉ"
        placeholder="Nhập địa chỉ nhà cung cấp"
        multiline
        rows={2}
        {...register('diaChi')}
        error={!!errors.diaChi?.message}
        helperText={errors.diaChi?.message ? (errors.diaChi.message as string) : ''}
      />

      <TextField
        label="Ghi chú"
        placeholder="Nhập ghi chú (tùy chọn)"
        multiline
        rows={3}
        {...register('ghiChu')}
        error={!!errors.ghiChu?.message}
        helperText={errors.ghiChu?.message ? (errors.ghiChu.message as string) : ''}
      />
    </Stack>
  );
};
