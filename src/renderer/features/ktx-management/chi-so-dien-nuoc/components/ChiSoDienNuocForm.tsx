import { Stack, Box, Typography, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const ChiSoDienNuocForm = () => {
  const { control, register, setValue } = useFormContext();

  const toaNhaId = useWatch({ control, name: 'toaNhaId' });
  const daChot = useWatch({ control, name: 'daChot' });
  const dienCu = useWatch({ control, name: 'dienCu' }) ?? 0;
  const dienMoi = useWatch({ control, name: 'dienMoi' }) ?? 0;
  const nuocCu = useWatch({ control, name: 'nuocCu' }) ?? 0;
  const nuocMoi = useWatch({ control, name: 'nuocMoi' }) ?? 0;

  const tieuThuDien = dienMoi >= dienCu ? dienMoi - dienCu : 0;
  const tieuThuNuoc = nuocMoi >= nuocCu ? nuocMoi - nuocCu : 0;

  useEffect(() => {
    if (toaNhaId) {
      setValue('phongKtxId', '');
    }
  }, [toaNhaId, setValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2.5}>
        {daChot && <Alert severity="warning">Bản ghi đã chốt, không thể chỉnh sửa.</Alert>}

        <input type="hidden" {...register('id')} />

        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà" disabled={daChot} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <PhongSelection
              control={control}
              name="phongKtxId"
              label="Phòng"
              disabled={!toaNhaId || daChot}
              toaNhaId={toaNhaId}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="thangNam"
              control={control}
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Tháng/Năm áp dụng"
                  views={['month', 'year']}
                  format="MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue: any) => {
                    if (newValue) {
                      const d = dayjs(newValue);
                      field.onChange(d.isValid() ? d.toDate() : null);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  disabled={daChot}
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
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={<Checkbox {...register('daChot')} disabled={daChot} />}
              label="Xác nhận chốt chỉ số"
            />
          </Box>
        </Stack>

        <Typography
          variant="subtitle2"
          sx={{ color: 'primary.main', fontWeight: 700, borderBottom: '1px dashed', pb: 0.5 }}
        >
          ⚡ ĐIỆN (kWh)
        </Typography>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <ControlledTextField
              label="Chỉ số cũ"
              control={control}
              name="dienCu"
              type="number"
              disabled={daChot}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <ControlledTextField
              label="Chỉ số mới"
              control={control}
              name="dienMoi"
              type="number"
              disabled={daChot}
              helperText={''}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <ControlledTextField
              label="Tiêu thụ"
              control={control}
              name="tieuThuDienDisplay"
              value={tieuThuDien}
              disabled
              InputProps={{ style: { fontWeight: 'bold' } }}
            />
          </Box>
        </Stack>

        <Typography
          variant="subtitle2"
          sx={{ color: 'primary.main', fontWeight: 700, borderBottom: '1px dashed', pb: 0.5 }}
        >
          💧 NƯỚC (m³)
        </Typography>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <ControlledTextField
              label="Chỉ số cũ"
              control={control}
              name="nuocCu"
              type="number"
              disabled={daChot}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <ControlledTextField
              label="Chỉ số mới"
              control={control}
              name="nuocMoi"
              type="number"
              disabled={daChot}
              helperText={''}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <ControlledTextField
              label="Tiêu thụ"
              control={control}
              name="tieuThuNuocDisplay"
              value={tieuThuNuoc}
              disabled
              InputProps={{ style: { fontWeight: 'bold' } }}
            />
          </Box>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};
