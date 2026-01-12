import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const LoaiThietBiForm = () => {
  const { control, register } = useFormContext();

  return (
    <Stack spacing={2}>
      <input type="hidden" {...register('id')} />

      <ControlledTextField
        label="Mã loại thiết bị"
        control={control}
        name="maLoai"
        helperText={''}
      />

      <ControlledTextField
        label="Tên loại thiết bị"
        control={control}
        name="tenLoai"
        helperText={''}
      />

      <ControlledTextField
        label="Mô tả"
        control={control}
        name="moTa"
        helperText={''}
        multiline
        minRows={3}
      />
    </Stack>
  );
};
