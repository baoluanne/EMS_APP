import { MenuItem, Stack, TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const formatDateForDisplay = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
};

export const KiemKeTaiSanForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <TextField
        label="Tên đợt kiểm kê"
        fullWidth
        {...register('tenDotKiemKe')}
        error={!!errors.tenDotKiemKe?.message}
        helperText={errors.tenDotKiemKe?.message ? (errors.tenDotKiemKe.message as string) : ''}
      />

      <Controller
        name="ngayBatDau"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Ngày bắt đầu"
            type="date"
            fullWidth
            value={formatDateForDisplay(field.value) || ''}
            onChange={(e) => field.onChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors.ngayBatDau?.message}
            helperText={errors.ngayBatDau?.message ? (errors.ngayBatDau.message as string) : ''}
          />
        )}
      />

      <Controller
        name="ngayKetThuc"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Ngày kết thúc"
            type="date"
            fullWidth
            value={formatDateForDisplay(field.value) || ''}
            onChange={(e) => field.onChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors.ngayKetThuc?.message}
            helperText={errors.ngayKetThuc?.message ? (errors.ngayKetThuc.message as string) : ''}
          />
        )}
      />

      <Controller
        name="daHoanThanh"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Đã hoàn thành"
            fullWidth
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value === 'true')}
            error={!!errors.daHoanThanh?.message}
            helperText={errors.daHoanThanh?.message ? (errors.daHoanThanh.message as string) : ''}
          >
            <MenuItem value="false">Không</MenuItem>
            <MenuItem value="true">Có</MenuItem>
          </TextField>
        )}
      />

      <TextField
        label="Ghi chú"
        fullWidth
        multiline
        rows={4}
        {...register('ghiChu')}
        error={!!errors.ghiChu?.message}
        helperText={errors.ghiChu?.message ? (errors.ghiChu.message as string) : ''}
      />
    </Stack>
  );
};
