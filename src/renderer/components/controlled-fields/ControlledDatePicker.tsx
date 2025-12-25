import { Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

interface ControlledDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  error?: boolean;
  helperTextError?: FieldError | undefined;
  maxDate?: Date | undefined;
  minDate?: Date | undefined;
  labelWidth?: number;
  disabled?: boolean;
}

const ControlledDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperTextError,
  maxDate,
  minDate,
  disabled,
}: ControlledDatePickerProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction="row"
        alignItems="center"
        flex={1}
        gap={2}
        sx={{
          '& .MuiPickersInputBase-root': {
            height: 32,
          },
          '& .MuiButtonBase-root': {
            height: 32,
            width: 32,
          },
        }}
      >
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date ? date.toISOString() : '')}
              slotProps={{
                textField: {
                  size: 'small',
                  error: !!fieldState.error || error,
                  label: label,
                  helperText: fieldState.error?.message || helperTextError?.message,
                  sx: { flex: 1 },
                  InputProps: { sx: { fontSize: 12 } },
                },
              }}
              format="dd/MM/yyyy"
              maxDate={maxDate}
              minDate={minDate}
              disabled={disabled}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default ControlledDatePicker;
