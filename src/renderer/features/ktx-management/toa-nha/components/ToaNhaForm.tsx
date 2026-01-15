import { MenuItem, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import { LOAI_TOA_NHA_OPTIONS } from '../LoaiToaNhaEnums';

export const ToaNhaForm = () => {
  const { register, control } = useFormContext();

  return (
    <Stack spacing={3} pt={0}>
      <input type="hidden" {...register('id')} />

      <ControlledTextField
        label="Tên tòa nhà"
        control={control}
        name="tenToaNha"
        placeholder="Ví dụ: Tòa A, Block B..."
      />

      <Stack direction="row" spacing={2}>
        <ControlledTextField
          select
          label="Loại tòa nhà"
          control={control}
          name="loaiToaNha"
          fullWidth
        >
          {LOAI_TOA_NHA_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </ControlledTextField>
        <ControlledTextField
          label="Số tầng"
          control={control}
          name="soTang"
          type="number"
          fullWidth
        />
      </Stack>
      <ControlledTextField label="Ghi chú" control={control} name="ghiChu" multiline rows={3} />
    </Stack>
  );
};
