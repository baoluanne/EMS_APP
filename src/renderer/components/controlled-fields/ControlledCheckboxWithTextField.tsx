import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface TextFieldConfig<T extends FieldValues> {
  name: Path<T>;
  props?: React.ComponentProps<typeof TextField>;
}

interface ControlledCheckboxWithTextFieldProps<T extends FieldValues>
  extends Omit<CheckboxProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  labelWidth?: number;
  textFieldConfigs?: TextFieldConfig<T>[]; // <-- Nhiều TextField
}

export const ControlledCheckboxWithTextField = <T extends FieldValues>({
  name,
  control,
  label,
  labelWidth,
  textFieldConfigs = [],
  ...props
}: ControlledCheckboxWithTextFieldProps<T>) => {
  return (
    <Stack direction="row" alignItems="center" flex={1}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    {...props}
                  />
                }
                label={label}
                slotProps={{ typography: { width: labelWidth } }}
                sx={{ mr: 0 }}
              />
              {textFieldConfigs.map((config) => (
                <Controller
                  key={config.name}
                  name={config.name}
                  control={control}
                  render={({ field: tfField, fieldState: tfState }) => (
                    <TextField
                      {...tfField}
                      {...config.props}
                      error={!!tfState.error}
                      helperText={tfState.error?.message}
                      size="small"
                    />
                  )}
                />
              ))}
            </Stack>
            {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
          </Stack>
        )}
      />
    </Stack>
  );
};
