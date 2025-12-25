import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucHoSoHssvForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maHoSo" label="Mã hồ sơ" required />
        <ControlledTextField control={control} name="tenHoSo" label="Tên hồ sơ" required />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="stt" label="Số thứ tự" type="number" />
        <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
      </Stack>
    </Stack>
  );
};
