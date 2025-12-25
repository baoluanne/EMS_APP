import { FormHelperText, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ControlledDoubleTextFieldProps<T extends FieldValues> {
  name1: Path<T>;
  name2: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  labelWidth?: number;
  props1?: TextFieldProps;
  props2?: TextFieldProps;
  hasDivider?: boolean;
}

export const ControlledDoubleTextField = <T extends FieldValues>({
  name1,
  name2,
  control,
  label,
  labelWidth,
  hasDivider,
  props1 = {},
  props2 = {},
}: ControlledDoubleTextFieldProps<T>) => {
  return (
    <Stack flex={1}>
      {label && <Typography sx={{ width: labelWidth, fontSize: 13 }}>{label}</Typography>}

      <Stack direction="row" spacing={1} flex={1}>
        <Controller
          name={name1}
          control={control}
          render={({ field, fieldState }) => (
            <Stack flex={1}>
              <TextField
                {...field}
                value={field.value ?? ''}
                error={!!fieldState.error}
                size="small"
                {...props1}
              />
              {fieldState.error && (
                <FormHelperText error>{fieldState.error.message}</FormHelperText>
              )}
            </Stack>
          )}
        />
        {hasDivider && <Typography pt={1}>-</Typography>}
        <Controller
          name={name2}
          control={control}
          render={({ field, fieldState }) => (
            <Stack flex={1}>
              <TextField
                {...field}
                value={field.value ?? ''}
                error={!!fieldState.error}
                size="small"
                {...props2}
              />
              {fieldState.error && (
                <FormHelperText error>{fieldState.error.message}</FormHelperText>
              )}
            </Stack>
          )}
        />
      </Stack>
    </Stack>
  );
};
