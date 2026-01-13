import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const ToaNhaForm = () => {
  const { register, control } = useFormContext();

  return (
    <Stack spacing={2}>
      <input type="hidden" {...register('id')} />

      <Stack direction="row" spacing={1}>
        <ControlledTextField
          label="Tên tòa nhà"
          control={control}
          name="tenToaNha"
          placeholder="Ví dụ: Tòa A, Block B..."
          helperText={''}
        />

        <ControlledTextField
          label="Loại tòa nhà"
          control={control}
          placeholder="Ví dụ: Nam, Nữ hoặc Hỗn hợp"
          name="loaiToaNha"
          helperText={''}
        />
      </Stack>
    </Stack>
  );
};
