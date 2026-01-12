import { MenuItem, Stack, TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';

export const KiemKeTaiSanForm = () => {
  const { register, control } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <ControlledTextField
        name="tenDotKiemKe"
        control={control}
        label="Tên đợt kiểm kê"
        helperText=""
      />

      <Stack direction="row" spacing={2}>
        <ControlledDatePicker name="ngayBatDau" control={control} label="Ngày bắt đầu" />
        <ControlledDatePicker name="ngayKetThuc" control={control} label="Ngày kết thúc" />
      </Stack>

      <Controller
        name="daHoanThanh"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Trạng thái hoàn thành"
            fullWidth
            size="small"
            value={field.value === true || field.value === 'true' ? 'true' : 'false'}
            onChange={(e) => field.onChange(e.target.value === 'true')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            <MenuItem value="false">Chưa hoàn thành</MenuItem>
            <MenuItem value="true">Đã hoàn thành</MenuItem>
          </TextField>
        )}
      />

      <ControlledTextField
        name="ghiChu"
        control={control}
        label="Ghi chú"
        multiline
        rows={4}
        helperText=""
      />
    </Stack>
  );
};
