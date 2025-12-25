import { Stack, Typography } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const QuyDinhCachTinhDiemForm = () => {
  const { control } = useFormContext();
  return (
    <HorizontalFilterCollapse title="Quy định cách tính điểm">
      <Stack gap={2}>
        <Stack>
          <ControlledTextField
            control={control}
            label="Số tín chỉ nợ tối đa tới thời điểm hiện tại"
            name="soTinhChiNoToiHT"
            type="number"
          />
          <ControlledCheckbox
            control={control}
            label="Ràng buộc điểm kết thúc"
            name="isRangBuocDKT"
          />
        </Stack>
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
        </Stack>
        <Stack gap={1}>
          <Typography variant="subtitle1">Môn thực hành:</Typography>

          <Stack direction="row" gap={1} justifyContent="start">
            <ControlledCheckbox
              control={control}
              label="Tính theo điểm lý thuyết"
              name="isTinhTheoDiemLT"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 175 }}
            />

            <ControlledCheckbox
              control={control}
              label="Số cột điểm KTTK"
              name="isSoCotDiemKTTK"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 200 }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <ControlledTextField
              control={control}
              label="Điểm KTTK"
              name="soCotDiemKTTK"
              type="number"
            />
          </Stack>
        </Stack>
      </Stack>
    </HorizontalFilterCollapse>
  );
};
