import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

export const GiuongKtxForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <PhongSelection control={control} name="phongKtxId" label="Thuộc Phòng" />

      <TextField
        label="Mã giường"
        fullWidth
        {...register('maGiuong')}
        error={!!errors.maGiuong}
        helperText={errors.maGiuong?.message as string}
        placeholder="Ví dụ: P101-01"
      />

      <Controller
        name="trangThai"
        control={control}
        defaultValue="TRONG"
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <InputLabel>Trạng thái</InputLabel>
            <Select {...field} label="Trạng thái">
              <MenuItem value="Trong">Trống</MenuItem>
              <MenuItem value="BaoTri">Bảo trì</MenuItem>
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Stack>
  );
};
