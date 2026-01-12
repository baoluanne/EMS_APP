import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const NhaCungCapForm = () => {
  const { register, control } = useFormContext();

  return (
    <Stack spacing={2}>
      <input type="hidden" {...register('id')} />
      <Stack direction="row" spacing={1}>
        <ControlledTextField
          label="Tên nhà cung cấp"
          control={control}
          name="tenNhaCungCap"
          placeholder="Ví dụ: Công ty TNHH ABC"
          helperText={''}
        />

        <ControlledTextField
          label="Điện thoại"
          control={control}
          placeholder="Ví dụ: 0123456789"
          name="dienThoai"
          helperText={''}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <ControlledTextField
          label="Email"
          control={control}
          placeholder="Ví dụ: contact@company.com"
          name="email"
          helperText={''}
        />

        <ControlledTextField
          label="Địa chỉ"
          control={control}
          placeholder="Nhập địa chỉ nhà cung cấp"
          name="diaChi"
          helperText={''}
        />
      </Stack>

      <ControlledTextField
        label="Ghi chú"
        control={control}
        name="ghiChu"
        helperText={''}
        multiline
        minRows={3}
      />
    </Stack>
  );
};
