import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ControlledCheckboxProps<T extends FieldValues> extends Omit<CheckboxProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  labelWidth?: number | string;
  labelSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
}

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  labelSx,
  containerSx,
  labelWidth,
  ...props
}: ControlledCheckboxProps<T>) => {
  return (
    <Stack direction="row" alignItems="center" flex={1} sx={containerSx}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Stack>
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
              slotProps={{
                typography: {
                  sx: labelSx,
                },
              }}
              sx={{ mr: 0 }}
            />
            {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
          </Stack>
        )}
      />
    </Stack>
  );
};
