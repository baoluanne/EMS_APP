import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const HocBongForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2.5}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} label="Điểm trung bình >=" name="hB_DiemTB" type="number" />
        <ControlledTextField control={control} label="Điểm hạnh kiểm >=" name="hB_DiemHK" type="number" />
        <ControlledTextField
          control={control}
          label="Điểm TB tối thiểu >="
          name="hB_DiemTBToiThieu"
          type="number"
        />
      </Stack>
    </Stack>
  );
};
