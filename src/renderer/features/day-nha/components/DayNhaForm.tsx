import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { DiaDiemPhongSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const DayNhaForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maDayNha" label="Dãy nhà" required />
        <ControlledTextField control={control} name="tenDayNha" label="Tên dãy nhà" required />
        <DiaDiemPhongSelection control={control} name="idDiaDiemPhong" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="soTang" type="number" label="Số tầng" />
        <ControlledTextField control={control} name="soPhong" type="number" label="Số phòng" />
        <Stack flex={1} />
      </Stack>

      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" multiline minRows={2} />
    </Stack>
  );
};
