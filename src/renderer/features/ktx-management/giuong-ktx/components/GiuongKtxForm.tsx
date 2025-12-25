import {
  Stack,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

const trangThaiOptions = [
  { value: 'Trong', label: 'Trống' },
  { value: 'CoSinhVien', label: 'Có sinh viên' },
  { value: 'BaoTri', label: 'Bảo trì' },
];

export const GiuongKtxForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      <input type="hidden" {...register('id')} />

      <Controller
        name="phongKtxId"
        control={control}
        render={({ field }) => (
          <PhongSelection {...field} control={control} label="Phòng *" required />
        )}
      />

      <TextField
        label="Mã giường *"
        fullWidth
        required
        placeholder="Ví dụ: 01, 02, A, B..."
        {...register('maGiuong')}
        error={!!errors.maGiuong}
        helperText={(errors.maGiuong?.message as string) || 'Mã giường sẽ hiển thị dạng: P0101-01'}
      />

      <Controller
        name="trangThai"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.trangThai}>
            <InputLabel id="trang-thai-label">Trạng thái *</InputLabel>
            <Select labelId="trang-thai-label" {...field} label="Trạng thái *">
              {trangThaiOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.trangThai && (
              <FormHelperText>{errors.trangThai.message as string}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
};
