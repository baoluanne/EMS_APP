import { Stack, StackProps, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FC } from 'react';

interface AppDatePickerProps {
  onChange: (date: PickerValue) => void;
  label: string;
  containerProps?: StackProps;
}

export const AppDatePicker: FC<AppDatePickerProps> = ({ onChange, label, containerProps }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack {...containerProps}>
        <Typography variant="h5" mb={1}>
          {label}
        </Typography>
        <DatePicker
          onChange={onChange}
          format="dd/MM/yyyy"
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};
