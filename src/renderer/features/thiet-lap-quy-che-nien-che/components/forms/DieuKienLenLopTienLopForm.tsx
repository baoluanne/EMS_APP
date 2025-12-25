import { Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { QuyCheNienChe } from '@renderer/shared/types/quy-che-nien-che.types';
import { useFormContext } from 'react-hook-form';

export const DieuKienLenLopTienLopForm = () => {
  const { control } = useFormContext<QuyCheNienChe>();
  return (
    <HorizontalFilterCollapse title="Điều kiện xét học tiếp - lên lớp">
      <Stack gap={2.5}>
        <Stack direction="row" gap={2.5}>
          <ControlledTextField
            control={control}
            label="Học kỳ: ĐTB học kỳ >="
            name="dkhT_DTBHocKy"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Số ĐVHT không đạt <="
            name="dkhT_SoDVHTKhongDatHK"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Năm học: ĐTB năm >="
            name="dkhT_DTBNam"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Số ĐVHT không đạt <="
            name="dkhT_SoDVHTKhongDatN"
            type="number"
          />
        </Stack>
        <Stack direction="row" gap={2.5}>
          <ControlledTextField
            control={control}
            label="Điểm tích lũy năm 2 >="
            name="dkhT_DiemTichLuyN2"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Số ĐVHT không đạt <="
            name="dkhT_SoDVHTKhongDatN2"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Điểm tích lũy năm 3 >="
            name="dkhT_DiemTichLuyN3"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Số ĐVHT không đạt <="
            name="dkhT_SoDVHTKhongDatN3"
            type="number"
          />
        </Stack>
      </Stack>
    </HorizontalFilterCollapse>
  );
};
