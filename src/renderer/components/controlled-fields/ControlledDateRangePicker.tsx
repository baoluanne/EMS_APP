import { Stack, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Control, Controller, FieldError, FieldValues, Path, useWatch } from 'react-hook-form';

interface ControlledDateRangePickerProps<T extends FieldValues> {
  startName: Path<T>;
  endName: Path<T>;
  control: Control<T>;
  startLabel?: string;
  endLabel?: string;
  startError?: boolean;
  endError?: boolean;
  startHelperTextError?: FieldError | undefined;
  endHelperTextError?: FieldError | undefined;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
}

const toISO = (d: Date | null) => (d ? d.toISOString() : '');

const ControlledDateRangePicker = <T extends FieldValues>({
  startName,
  endName,
  control,
  startLabel = 'Từ ngày',
  endLabel = 'Đến ngày',
  startError,
  endError,
  startHelperTextError,
  endHelperTextError,
  minDate,
  maxDate,
}: ControlledDateRangePickerProps<T>) => {
  // Watch both values so we can constrain pickers against each other
  const startValue = useWatch({ control, name: startName as any }) as string | Date | null;
  const endValue = useWatch({ control, name: endName as any }) as string | Date | null;

  const startDateObj = startValue
    ? new Date(typeof startValue === 'string' ? startValue : startValue)
    : null;
  const endDateObj = endValue ? new Date(typeof endValue === 'string' ? endValue : endValue) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.25}
        sx={{
          '& .MuiPickersInputBase-root': { height: 32 },
          '& .MuiButtonBase-root': { height: 32, width: 32 },
          width: '100%',
        }}
      >
        {/* Start date */}
        <Controller
          name={startName}
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              value={startDateObj}
              onChange={(d) => field.onChange(toISO(d))}
              slotProps={{
                textField: {
                  size: 'small',
                  label: startLabel,
                  error: !!fieldState.error || !!startError,
                  helperText: fieldState.error?.message || startHelperTextError?.message,
                  sx: { flex: 1 },
                  InputProps: { sx: { fontSize: 12 } },
                },
              }}
              format="dd/MM/yyyy"
              minDate={minDate}
              // if end is chosen, start must be <= end
              maxDate={endDateObj ?? maxDate}
            />
          )}
        />

        <Typography component="span" sx={{ px: 0.5 }}>
          –
        </Typography>

        {/* End date */}
        <Controller
          name={endName}
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              value={endDateObj}
              onChange={(d) => field.onChange(toISO(d))}
              slotProps={{
                textField: {
                  size: 'small',
                  label: endLabel,
                  error: !!fieldState.error || !!endError,
                  helperText: fieldState.error?.message || endHelperTextError?.message,
                  sx: { flex: 1 },
                  InputProps: { sx: { fontSize: 12 } },
                },
              }}
              format="dd/MM/yyyy"
              // if start is chosen, end must be >= start
              minDate={startDateObj ?? minDate}
              maxDate={maxDate}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default ControlledDateRangePicker;
