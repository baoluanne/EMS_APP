import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const HocBongForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2.5}>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          label="Điểm trung bình >="
          name="hB_DiemTrungBinh"
          type="number"
        />
        <ControlledTextField
          control={control}
          label="Điểm hạnh kiểm >="
          name="dH_DiemHK"
          type="number"
        />
        <ControlledTextField
          control={control}
          label="Điểm TB tối thiểu >="
          name="hB_DiemTBToiThieu"
          type="number"
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          label="Số tín chỉ đăng ký >="
          name="hB_SoTCDangKy"
          type="number"
        />
        <ControlledTextField
          control={control}
          label="Số tín chỉ ĐK năm >="
          name="hB_SoTCDKNam"
          type="number"
        />
        <Stack flex={1} />
      </Stack>
    </Stack>
  );
};
