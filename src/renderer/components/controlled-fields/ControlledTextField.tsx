import { FormHelperText, Stack, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ControlledTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  flex?: number;
  labelChildren?: React.ReactNode;
  required?: boolean;
  labelWidth?: number | string;
  readOnly?: boolean;
}

export const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  label,
  flex = 1,
  required,
  readOnly,
  ...props
}: ControlledTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Stack flex={flex}>
          <TextField
            {...field}
            value={field.value ?? ''}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            size="small"
            required={required}
            label={label}
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                padding: '0 !important',
                margin: '0 !important',
              },
            }}
            slotProps={{
              input: {
                readOnly,
              },
            }}
            {...props}
          />
          {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
        </Stack>
      )}
    />
  );
};
