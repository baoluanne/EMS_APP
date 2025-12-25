import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const KhoiKienThucForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <Stack direction="row" gap={2} width={4 / 5}>
          <ControlledTextField
            control={control}
            name="maKhoiKienThuc"
            label="Mã khối kiến thức"
            required
          />
          <ControlledTextField
            control={control}
            name="tenKhoiKienThuc"
            label="Tên khối kiến thức"
            required
          />
        </Stack>
        <Stack width={1 / 5}>
          <ControlledTextField control={control} name="stt" label="STT" type="number" fullWidth />
        </Stack>
      </Stack>

      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
      </Stack>
    </Stack>
  );
};
