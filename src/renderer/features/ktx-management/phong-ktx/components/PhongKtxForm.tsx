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
import React from 'react';

export const PhongKtxForm = () => {
  const {
    register,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const id = useWatch({ control, name: 'id' });
  const soLuongDaO = useWatch({ control, name: 'soLuongDaO' }) || 0;
  const soLuongGiuong = useWatch({ control, name: 'soLuongGiuong' });
  const tenToaNha = useWatch({ control, name: 'tenToaNha' }) || '';

  const isEditMode = !!id;

  React.useEffect(() => {
    if (isEditMode && soLuongGiuong && soLuongGiuong < soLuongDaO) {
      setError('soLuongGiuong', {
        type: 'manual',
        message: `Số giường không thể nhỏ hơn số giường đã ở (${soLuongDaO})`,
      });
    } else {
      clearErrors('soLuongGiuong');
    }
  }, [soLuongGiuong, soLuongDaO, isEditMode, setError, clearErrors]);

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <TextField
        label="Mã phòng *"
        fullWidth
        required
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
        {...register('soLuongGiuong', { valueAsNumber: true })}
        error={!!errors.soLuongGiuong}
        helperText={
          (errors.soLuongGiuong?.message as string) ||
          (isEditMode ? `Số giường hiện đang ở: ${soLuongDaO}` : '')
        }
        slotProps={{
          htmlInput: {
            min: isEditMode ? soLuongDaO : 1,
          },
        }}
      />

      <TextField
        label="Số giường đã ở"
        fullWidth
        disabled
        value={soLuongDaO}
        helperText="Trường này được tự động cập nhật"
      />

      <Controller
        name="trangThai"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error} required>
            <InputLabel>Trạng thái *</InputLabel>
            <Select {...field} label="Trạng thái *">
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
        slotProps={{
          htmlInput: {
            min: 0,
            step: 10000,
          },
        }}
      />
    </Stack>
  );
};
