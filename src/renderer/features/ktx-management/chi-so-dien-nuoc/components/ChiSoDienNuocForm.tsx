import { Stack, Grid, TextField, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { Controller, useFormContext, useWatch, useFormState } from 'react-hook-form';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const ChiSoDienNuocForm = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { isSubmitting } = useFormState({ control });

  const toaNhaId = useWatch({ control, name: 'toaNhaId' });
  const daChot = useWatch({ control, name: 'daChot' });

  const dienCu = useWatch({ control, name: 'dienCu' }) ?? 0;
  const dienMoi = useWatch({ control, name: 'dienMoi' }) ?? 0;
  const nuocCu = useWatch({ control, name: 'nuocCu' }) ?? 0;
  const nuocMoi = useWatch({ control, name: 'nuocMoi' }) ?? 0;

  const tieuThuDien = dienMoi >= dienCu ? dienMoi - dienCu : 0;
  const tieuThuNuoc = nuocMoi >= nuocCu ? nuocMoi - nuocCu : 0;

  const isFormDisabled = daChot || isSubmitting;

  useEffect(() => {
    setValue('phongKtxId', '');
  }, [toaNhaId, setValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {daChot && <Alert severity="warning"> Bản ghi đã chốt, không thể chỉnh sửa.</Alert>}

        <input type="hidden" {...register('id')} />

        <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà " />

        <PhongSelection
          control={control}
          name="phongKtxId"
          label="Phòng"
          disabled={!toaNhaId}
          toaNhaId={toaNhaId}
        />

        <Controller
          name="thangNam"
          control={control}
          render={({ field, fieldState }) => {
            let dayjsValue: any = null;
            if (field.value) {
              if (dayjs.isDayjs(field.value)) {
                dayjsValue = field.value;
              } else if (field.value instanceof Date) {
                dayjsValue = dayjs(field.value);
              }
            }

            return (
              <DatePicker
                value={dayjsValue}
                onChange={(newValue: any) => {
                  if (newValue) {
                    const dayjsObj = dayjs.isDayjs(newValue) ? newValue : dayjs(newValue);
                    field.onChange(dayjsObj.toDate());
                  } else {
                    field.onChange(null);
                  }
                }}
                label="Tháng/Năm"
                views={['month', 'year']}
                format="MM/YYYY"
                disabled={isFormDisabled}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            );
          }}
        />

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Chỉ số điện cũ"
              type="number"
              fullWidth
              disabled={isFormDisabled}
              {...register('dienCu', {
                valueAsNumber: true,
              })}
              error={!!errors.dienCu}
              helperText={errors.dienCu?.message as string}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Chỉ số điện mới"
              type="number"
              fullWidth
              disabled={isFormDisabled}
              {...register('dienMoi', {
                valueAsNumber: true,
                min: { value: dienCu, message: `Phải ≥ ${dienCu}` },
              })}
              error={!!errors.dienMoi}
              helperText={errors.dienMoi?.message as string}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Tiêu thụ điện (kWh)"
              value={tieuThuDien}
              fullWidth
              disabled
              InputProps={{
                style: { fontWeight: 'bold', color: '#1976d2' },
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Chỉ số nước cũ"
              type="number"
              fullWidth
              disabled={isFormDisabled}
              {...register('nuocCu', {
                valueAsNumber: true,
              })}
              error={!!errors.nuocCu}
              helperText={errors.nuocCu?.message as string}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Chỉ số nước mới"
              type="number"
              fullWidth
              disabled={isFormDisabled}
              {...register('nuocMoi', {
                valueAsNumber: true,
                min: { value: nuocCu, message: `Phải ≥ ${nuocCu}` },
              })}
              error={!!errors.nuocMoi}
              helperText={errors.nuocMoi?.message as string}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Tiêu thụ nước (m³)"
              value={tieuThuNuoc}
              fullWidth
              disabled
              InputProps={{
                style: { fontWeight: 'bold', color: '#1976d2' },
              }}
            />
          </Grid>
        </Grid>

        <FormControlLabel
          control={<Checkbox {...register('daChot')} disabled={isFormDisabled} />}
          label="✓ Đã chốt chỉ số"
        />
      </Stack>
    </LocalizationProvider>
  );
};
