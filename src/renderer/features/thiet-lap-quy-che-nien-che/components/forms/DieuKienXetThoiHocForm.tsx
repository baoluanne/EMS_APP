import { Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DieuKienXetThoiHocForm = () => {
  const { control } = useFormContext();

  return (
    <HorizontalFilterCollapse title="Điều kiện xét thôi học">
      <Stack gap={2.5}>
        <Stack direction="row" gap={2}>
          <ControlledTextField
            control={control}
            label="Điểm thôi học mỗi HK"
            name="dktH_DiemThoiHocMoiHK"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Số ĐVHT không đạt >="
            name="dktH_SoDVHTKhongDatHK"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Điểm tích lũy năm 2 >="
            name="dktH_DiemTLNam2"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Số ĐVHT không đạt năm 2 >="
            name="dktH_SoDVHTKhongDatN2"
            type="number"
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <ControlledTextField
            control={control}
            label="Điểm tích lũy năm 3 >="
            name="dktH_DiemTLNam3"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Số ĐVHT không đạt năm 3 >="
            name="dktH_SoDVHTKhongDatN3"
            type="number"
          />
        </Stack>
      </Stack>
    </HorizontalFilterCollapse>
  );
};
