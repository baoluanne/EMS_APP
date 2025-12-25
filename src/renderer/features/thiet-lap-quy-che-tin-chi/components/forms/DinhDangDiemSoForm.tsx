import { Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DinhDangDiemSoForm = () => {
  const { control } = useFormContext();

  return (
    <HorizontalFilterCollapse title="Định dạng điểm số (số chữ số thập phân)">
      <Stack gap={2.5}>
        <Stack direction="row" gap={2}>
          <ControlledTextField
            control={control}
            label="Điểm thường kỳ"
            name="dddS_DiemThuongKy"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Điểm TB môn"
            name="dddS_DiemTBMon"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Điểm TB chung"
            name="dddS_DiemTBChung"
            type="number"
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <ControlledTextField
            control={control}
            label="Điểm kết thúc môn"
            name="dddS_DiemTKMon"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Điểm TB học kỳ"
            name="dddS_DiemTBHK"
            type="number"
          />
          <Stack flex={1} />
        </Stack>
      </Stack>
    </HorizontalFilterCollapse>
  );
};
