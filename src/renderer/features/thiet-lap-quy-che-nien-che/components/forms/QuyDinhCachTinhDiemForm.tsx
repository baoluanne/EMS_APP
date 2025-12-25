import { Stack, Typography } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const QuyDinhCachTinhDiemForm = () => {
  const { control } = useFormContext();
  return (
    <HorizontalFilterCollapse title="Quy định cách tính điểm">
      <Stack gap={1}>
        <Typography variant="subtitle1">Môn lý thuyết:</Typography>
        <Stack direction="row" gap={1}>
          <ControlledTextField
            control={control}
            label="Hệ số điểm lý thuyết"
            name="heSoDiemLT"
            type="number"
          />
          <ControlledTextField
            control={control}
            label="Hệ số điểm thực hành"
            name="heSoDiemTH"
            type="number"
          />
        </Stack>
        <Typography variant="subtitle1">Môn thực hành:</Typography>
        <Stack gap={1} direction="row">
          <ControlledCheckbox
            control={control}
            label="Tính theo điểm lý thuyết"
            name="isTinhTheoDiemLT"
          />
          <ControlledCheckbox name="isCotDiemKTTK" control={control} label="Số cột điểm KTTK" />
          <ControlledCheckbox
            control={control}
            label="Ràng buộc điểm kết thúc"
            name="isRangBuocDiemTK"
          />
        </Stack>
        <ControlledTextField control={control} label="Điểm KTTK" name="cotDiemKTTK" />
      </Stack>
    </HorizontalFilterCollapse>
  );
};
