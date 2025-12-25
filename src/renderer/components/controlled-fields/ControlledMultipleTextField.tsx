import {
  FormHelperText,
  Stack,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ControlledMultipleTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  labelWidth?: number | string;
  labelSx?: SxProps<Theme>;
  flex?: number;
  numberOfFields: number;
}

export const ControlledMultipleTextField = <T extends FieldValues>({
  name,
  control,
  label,
  labelWidth = 135,
  labelSx,
  flex = 1,
  numberOfFields,
  ...props
}: ControlledMultipleTextFieldProps<T>) => {
  return (
    <Stack>
      <Stack flex={flex}>
        <Stack>
          {label && (
            <Typography sx={{ width: labelWidth, mb: 0.5, ...labelSx }}>{label}</Typography>
          )}
          <Stack direction="row" alignItems="center" gap={2} flex={1}>
            {Array.from({ length: numberOfFields }).map((_, index) => (
              <Controller
                key={index}
                name={`${name}${index + 1}` as Path<T>}
                control={control}
                render={({ field, fieldState }) => (
                  <Stack flex={flex}>
                    <TextField
                      {...field}
                      value={field.value ?? ''}
                      error={!!fieldState.error}
                      size="small"
                      {...props}
                    />
                    {fieldState.error && (
                      <FormHelperText error sx={{ ml: `${labelWidth}px` }}>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </Stack>
                )}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
