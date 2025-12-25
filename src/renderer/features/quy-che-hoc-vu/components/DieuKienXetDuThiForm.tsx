import { Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { QuyCheHocVu } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

export const DieuKienXetDuThiForm = () => {
  const { control } = useFormContext<QuyCheHocVu>();
  return (
    <Stack gap={1}>
      <Stack direction="row">
        <ControlledCheckbox name="dkdT_IsDongHocPhi" label="Đóng học phí" control={control} />
        <ControlledCheckbox name="dkdT_IsDiemTBTK" label="Điểm TBTK" control={control} />
        <ControlledCheckbox name="dkdT_IsDiemTBTH" label="Điểm TBTH" control={control} />
        <ControlledCheckbox name="dkdT_IsKhongVangQua" label="Vắng không quá" control={control} />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="dkdT_DiemTBTK"
          label="Điểm TBTK"
          type="number"
        />
        <ControlledTextField
          control={control}
          name="dkdT_DiemTBTH"
          label="Điểm TBTH"
          type="number"
        />
        <ControlledTextField
          control={control}
          name="dkdT_TongTietVang"
          label="Tổng tiết vắng"
          type="number"
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="dkdT_DuocThiLai"
          label="Được thi lần 2 (%)"
          type="number"
        />
        <ControlledTextField
          control={control}
          name="dkdT_LyThuyet"
          label="Lý thuyết (%)"
          type="number"
        />
        <ControlledTextField
          control={control}
          name="dkdT_ThucHanh"
          label="Thực hành (%)"
          type="number"
        />
      </Stack>
    </Stack>
  );
};
