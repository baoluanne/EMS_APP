import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { Option } from '@renderer/shared/types';
import { FC, MouseEventHandler } from 'react';
import { Control, Controller } from 'react-hook-form';

type FilterSelectProps = {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: MouseEventHandler | undefined;
};

export const FilterSelect: FC<FilterSelectProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  control,
  required,
  disabled,
  readOnly,
  onClick,
}) => {
  return (
    <Stack direction="column">
      <Stack direction="row" flex={1}>
        {control && name ? (
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <InputLabel
                  id={`${label}-label`}
                  sx={{
                    fontSize: '0.75rem',
                    transform: 'translate(14px, 50%)',
                    '&.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -7px)',
                      color: 'primary',
                      backgroundColor: 'white',
                    },
                  }}
                >
                  {label}
                </InputLabel>
                <Select
                  label={label}
                  labelId={`${label}-label`}
                  size="small"
                  error={!!fieldState.error}
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  required={required}
                  disabled={disabled}
                  readOnly={readOnly}
                  onClick={onClick}
                >
                  {[{ label: '-- Tất cả --', value: '' }, ...options].map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{ fontSize: '12px' }}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <FormHelperText error sx={{ ml: 0 }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        ) : (
          <FormControl fullWidth>
            <InputLabel
              id={`${label}-label`}
              sx={{
                fontSize: '0.75rem',
                transform: 'translate(14px, 50%)',
                '&.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -7px)',
                  color: 'primary',
                  backgroundColor: 'white',
                },
              }}
            >
              {label}
            </InputLabel>
            <Select
              size="small"
              labelId={`${label}-label`}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              onClick={onClick}
            >
              {[{ label: '-- Tất cả --', value: '' }, ...options].map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ fontSize: '12px' }}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>
    </Stack>
  );
};
