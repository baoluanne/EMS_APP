import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';

export const PhongKtxForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const id = useWatch({ control, name: 'id' });
  const soLuongDaO = useWatch({ control, name: 'soLuongDaO' }) || 0;
  const tenToaNha = useWatch({ control, name: 'tenToaNha' }) || '';

  const isEditMode = !!id;
  const hasStudent = soLuongDaO > 0;

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <TextField
        label="Mã phòng *"
        fullWidth
        required
        disabled={isEditMode}
        {...register('maPhong')}
        error={!!errors.maPhong}
        helperText={errors.maPhong?.message as string}
      />

      {isEditMode ? (
        <TextField label="Tòa nhà" fullWidth disabled value={tenToaNha} />
      ) : (
        <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà" required />
      )}

      <TextField
        type="number"
        label="Số lượng giường *"
        fullWidth
        disabled={isEditMode}
        {...register('soLuongGiuong', { valueAsNumber: true })}
        error={!!errors.soLuongGiuong}
        helperText={
          isEditMode ? 'Không thể thay đổi số giường' : (errors.soLuongGiuong?.message as string)
        }
      />

      <TextField label="Số giường đã ở" fullWidth disabled value={soLuongDaO} />

      <Controller
        name="trangThai"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error} required>
            <InputLabel>Trạng thái *</InputLabel>
            <Select {...field} label="Trạng thái *" disabled={isEditMode && hasStudent}>
              <MenuItem value="HOAT_DONG">Hoạt động</MenuItem>
              <MenuItem value="NGUNG_HOAT_DONG">Ngừng hoạt động</MenuItem>
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <TextField
        type="number"
        label="Giá phòng (VNĐ) *"
        fullWidth
        {...register('giaPhong', { valueAsNumber: true })}
        error={!!errors.giaPhong}
        helperText={errors.giaPhong?.message as string}
      />
    </Stack>
  );
};
