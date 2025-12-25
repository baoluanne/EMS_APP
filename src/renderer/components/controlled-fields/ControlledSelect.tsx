import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import React from 'react';

type Option = { value: string | number; label: React.ReactNode };

type ControlledSelectProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'select' | 'onChange' | 'value' | 'defaultValue'
> & {
  control: Control<T>;
  name: Path<T>;
  label?: React.ReactNode;
  options: Option[];
};

export const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  size = 'small',
  variant = 'outlined',
  ...rest
}: ControlledSelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <TextField
        select
        label={label}
        value={field.value ?? ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        fullWidth
        size={size}
        variant={variant}
        {...rest}
      >
        {options.map((opt) => (
          <MenuItem key={String(opt.value)} value={opt.value} sx={{ fontSize: '12px' }}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);
