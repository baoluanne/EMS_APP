import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const KhoaForm = () => {
  const { control } = useFormContext();
  return (
    <Stack direction="row" gap={2}>
      <ControlledTextField control={control} name="maKhoa" label="Mã khoa" required />
      <ControlledTextField control={control} name="tenKhoa" label="Tên khoa" required />
    </Stack>
  );
};
