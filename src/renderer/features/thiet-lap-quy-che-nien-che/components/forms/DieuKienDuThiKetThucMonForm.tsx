import { Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DieuKienDuThiKetThucMonForm = () => {
  const { control } = useFormContext();

  return (
    <HorizontalFilterCollapse title="Điều kiện dự thi kết thúc môn">
      <Stack gap={2.5}>
        <Stack direction="row" gap={2}>
          <ControlledTextField control={control} label="%Tổng vắng" name="dkdT_PTTongVang" type="number" />
          <ControlledTextField control={control} label="%Lý thuyết" name="dkdT_PTLyThuyet" type="number" />
          <ControlledTextField control={control} label="%Thực hành" name="dkdT_PTThucHanh" type="number" />
        </Stack>
        <Stack gap={2} direction="row">
          <ControlledCheckbox
            label="Đã đóng học phí"
            name="dkdT_IsDaDongHP"
            control={control}
            labelWidth={140}
          />
          <ControlledCheckbox
            name="dkdT_IsDTBThuongKy"
            control={control}
            label="ĐTB thường kỳ >="
            labelWidth={140}
          />
          <ControlledCheckbox
            label="Vắng không quá"
            name="dkdT_IsKhongVangQua"
            control={control}
            labelWidth={140}
          />
        </Stack>
        <ControlledTextField control={control} label="ĐTB thường kỳ >=" name="dkdT_DTBThuongKy" />
      </Stack>
    </HorizontalFilterCollapse>
  );
};
