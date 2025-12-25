import { Stack, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DiemRangBuocForm = () => {
  const { control } = useFormContext();

  return (
    <Stack sx={{ overflow: 'auto' }} gap={2}>
      <Typography fontWeight={600}>Điểm ràng buộc</Typography>

      <Stack direction="row" gap={2} alignItems="center">
        <ControlledTextField
          control={control}
          name="drB_DiemThuongKy"
          label="Thường kỳ"
          labelWidth="fit-content"
        />
        <ControlledTextField
          control={control}
          name="drB_DiemGiuaKy"
          label="Giữa kỳ"
          labelWidth="fit-content"
        />
        <ControlledTextField
          control={control}
          name="drB_DiemChuyenCan"
          label="Chuyên cần"
          labelWidth="fit-content"
        />
        <ControlledTextField
          control={control}
          name="drB_DiemTieuLuan"
          label="Tiểu luận"
          labelWidth="fit-content"
        />
      </Stack>

      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="drB_CotDiemGK" label="Cột điểm giữa kỳ" />
        <ControlledTextField
          control={control}
          name="drB_CongThucTinhDTB_TK"
          label="Công thức tính ĐTB thường kỳ"
        />
        <ControlledTextField
          control={control}
          name="drB_ThangDiemMax"
          label="Thang điểm tối đa"
          type="number"
        />
        <ControlledTextField control={control} name="drB_CotDiemCC" label="Cột điểm chuyên cần" />
      </Stack>

      <ControlledTextField
        control={control}
        name="drB_GhiChu"
        label="Ghi chú"
        multiline
        minRows={2}
      />
    </Stack>
  );
};
