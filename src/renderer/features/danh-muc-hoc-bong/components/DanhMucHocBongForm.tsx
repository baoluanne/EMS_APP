import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucHocBongForm = () => {
  const { control } = useFormContext();

  return (
    <Stack direction="row" gap={4}>
      <Stack direction="row" gap={4} width={4 / 5}>
        <ControlledTextField
          control={control}
          name="maDanhMuc"
          label="Mã học bổng" required
          labelWidth={150}
        />
        <ControlledTextField
          control={control}
          name="tenDanhMuc"
          label="Tên học bổng" required
          labelWidth={150}
        />
      </Stack>
      <Stack width={1 / 5}>
        <ControlledTextField
          control={control}
          name="stt"
          type="number"
          label="Số thứ tự"
          labelWidth={150}
        />
      </Stack>
    </Stack>
  );
};
