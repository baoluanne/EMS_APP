import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { MucDoSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const HinhThucXuLyViPhamQuyCheThiForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="maHinhThucXL" label="Mã xử lý quy chế thi" required />
        <ControlledTextField control={control} name="tenHinhThucXL" label="Tên xử lý QC thi" required />
        <ControlledTextField
          control={control}
          name="phanTramDiemTru"
          label="Phần trăm điểm trừ (%)"
          type="number"
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="diemTruRL" label="Điểm trừ (RL)" />
        <MucDoSelection control={control} name="idMucDo" />
        <Stack flex={1} />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Stack>
    </Stack>
  );
};
