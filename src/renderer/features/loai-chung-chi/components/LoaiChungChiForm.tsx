import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const LoaiChungChiForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={4}>
        <Stack direction="row" gap={4} width={4 / 5}>
          <ControlledTextField
            control={control}
            name="maLoaiChungChi"
            label="Mã loại chứng chỉ"
            required
            labelWidth={150}
          />
          <ControlledTextField
            control={control}
            name="tenLoaiChungChi"
            label="Tên loại chứng chỉ"
            required
            labelWidth={150}
          />
        </Stack>
        <Stack width={1 / 5}>
          <ControlledTextField control={control} labelWidth={150} name="stt" label="Số thứ tự" />
        </Stack>
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          labelWidth={150}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Stack>
    </Stack>
  );
};
