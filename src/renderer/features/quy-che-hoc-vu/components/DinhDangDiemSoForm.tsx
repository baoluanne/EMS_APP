import { Stack, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { QuyCheHocVu } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

export const DinhDangDiemSoForm = () => {
  const { control } = useFormContext<QuyCheHocVu>();
  return (
    <Stack gap={1}>
      <Typography fontWeight={600}>Điểm thành phần:</Typography>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="dddS_DiemThanhPhan"
          label="Điểm thành phần"
          type="number"
        />
        <ControlledTextField
          control={control}
          name="dddS_DiemCuoiKy"
          label="Điểm cuối kỳ"
          type="number"
        />
        <ControlledTextField
          control={control}
          name="dddS_DiemTBThuongKy"
          label="Điểm trường kỳ"
          type="number"
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="dddS_DiemTBTH" label="ĐTB TH" type="number" />
        <ControlledTextField control={control} name="dddS_DiemTB" label="Điểm TB" type="number" />
        <Stack flex={1} />
      </Stack>
      <Typography fontWeight={600}>Học kỳ/Tốt nghiệp:</Typography>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="dddS_DiemTBHK"
          label="ĐTB học kỳ"
          type="number"
        />
        <ControlledTextField control={control} name="dddS_DiemTN" label="Điểm TN" type="number" />
        <ControlledTextField control={control} name="dddS_DiemTK" label="Điểm TK" type="number" />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="dddS_KieuLamTron" label="Kiểu làm tròn" />
        <Stack flex={1} />
        <Stack flex={1} />
      </Stack>
    </Stack>
  );
};
