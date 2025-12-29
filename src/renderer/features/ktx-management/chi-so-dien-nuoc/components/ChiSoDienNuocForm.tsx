import { Stack, Grid, TextField, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { Controller, useFormContext, useWatch, useFormState } from 'react-hook-form';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';
import axiosInstance from '@renderer/features/ktx-management/chi-so-dien-nuoc/configs/axiosInstance';

export const ChiSoDienNuocForm = () => {
  const {
    control,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { isSubmitting } = useFormState({ control });

  const id = useWatch({ control, name: 'id' });
  const toaNhaId = useWatch({ control, name: 'toaNhaId' });
  const phongKtxId = useWatch({ control, name: 'phongKtxId' });
  const thangNam = useWatch({ control, name: 'thangNam' });
  const daChot = useWatch({ control, name: 'daChot' });

  const dienCu = useWatch({ control, name: 'dienCu' }) ?? 0;
  const dienMoi = useWatch({ control, name: 'dienMoi' }) ?? 0;
  const nuocCu = useWatch({ control, name: 'nuocCu' }) ?? 0;
  const nuocMoi = useWatch({ control, name: 'nuocMoi' }) ?? 0;

  const tieuThuDien = dienMoi >= dienCu ? dienMoi - dienCu : 0;
  const tieuThuNuoc = nuocMoi >= nuocCu ? nuocMoi - nuocCu : 0;

  const isEditMode = !!id;
  const isFormDisabled = daChot || isSubmitting;

  useEffect(() => {
    setValue('phongKtxId', '');
  }, [toaNhaId, setValue]);

  useEffect(() => {
    const loadChiSoCu = async () => {
      if (!phongKtxId || !thangNam || isEditMode) {
        setValue('dienCu', 0);
        setValue('nuocCu', 0);
        return;
      }

      const prevDate = thangNam.subtract(1, 'month');
      const prevThang = prevDate.month() + 1;
      const prevNam = prevDate.year();

      try {
        const res = await axiosInstance.get('/api/chi-so-dien-nuoc/pagination', {
          params: {
            page: 1,
            pageSize: 1,
            phongId: phongKtxId,
            thang: prevThang,
            nam: prevNam,
          },
        });

        if (res.data?.data?.length > 0) {
          const prev = res.data.data[0];
          setValue('dienCu', prev.dienMoi || 0);
          setValue('nuocCu', prev.nuocMoi || 0);
        } else {
          setValue('dienCu', 0);
          setValue('nuocCu', 0);
        }
        trigger(['dienCu', 'nuocCu']);
      } catch (error) {
        console.error('Lỗi khi tải chỉ số cũ:', error);
        setValue('dienCu', 0);
        setValue('nuocCu', 0);
      }
    };

    loadChiSoCu();
  }, [phongKtxId, thangNam, isEditMode, setValue, trigger]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {daChot && <Alert severity="warning">⚠️ Bản ghi đã chốt, không thể chỉnh sửa.</Alert>}

        <input type="hidden" {...register('id')} />

        <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà *" required />

        <PhongSelection control={control} name="phongKtxId" label="Phòng *" required />

        <Controller
          name="thangNam"
          control={control}
          rules={{ required: 'Vui lòng chọn tháng năm' }}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              label="Tháng/Năm *"
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
          )}
        />

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Chỉ số điện cũ (tự động)"
              type="number"
              fullWidth
              disabled
              value={dienCu}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Chỉ số điện mới *"
              type="number"
              fullWidth
              disabled={isFormDisabled}
              {...register('dienMoi', {
                required: 'Bắt buộc',
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

        {/* Nhập chỉ số nước */}
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Chỉ số nước cũ (tự động)"
              type="number"
              fullWidth
              disabled
              value={nuocCu}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Chỉ số nước mới *"
              type="number"
              fullWidth
              disabled={isFormDisabled}
              {...register('nuocMoi', {
                required: 'Bắt buộc',
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
