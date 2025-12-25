import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Option } from '@renderer/shared/types';
import { FC, MouseEventHandler } from 'react';
import { Control, Controller } from 'react-hook-form';

type FilterMultiSelectProps = {
  label: string;
  options: Option[];
  value?: string[];
  onChange?: (event: SelectChangeEvent<string[]>) => void;
  name?: string;
  control?: Control<any>;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: MouseEventHandler | undefined;
};

export const FilterMultiSelect: FC<FilterMultiSelectProps> = ({
  label,
  options,
  value = [],
  onChange,
  name,
  control,
  required,
  disabled,
  readOnly,
  onClick,
}) => {
  const handleToggle = (
    currentValue: string[],
    optionValue: string,
    setter?: (val: string[]) => void,
  ) => {
    if (readOnly) return;
    const exists = currentValue?.includes(optionValue);
    const newValue = exists
      ? currentValue.filter((v) => v !== optionValue)
      : [...(currentValue ?? []), optionValue];
    setter?.(newValue);
  };

  const renderSelect = (field?: any, fieldState?: any) => {
    const currentVal = field ? (field.value ?? []) : value;

    const updateValue = (newValue: string[]) => {
      if (field) {
        field.onChange(newValue);
      } else if (onChange) {
        onChange({ target: { value: newValue } } as unknown as SelectChangeEvent<string[]>);
      }
    };

    return (
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
          multiple
          labelId={`${label}-label`}
          size="small"
          error={!!fieldState?.error}
          value={currentVal}
          onChange={field ? field.onChange : onChange}
          required={required}
          disabled={disabled}
          onClick={onClick}
          renderValue={(selected) =>
            Array.isArray(selected)
              ? selected
                  .map((val) => options.find((opt) => opt.value === val)?.label)
                  .filter(Boolean)
                  .join(', ')
              : ''
          }
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 300 },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                fontSize: '12px',
                py: 0.5,
                minHeight: 28,
                '& .MuiCheckbox-root': { p: 0.5 },
              }}
              onClick={() => handleToggle(currentVal, String(option.value), updateValue)}
            >
              <Checkbox
                checked={(currentVal ?? []).includes(String(option.value))}
                sx={{ p: 0.5, pointerEvents: 'none' }}
              />
              <ListItemText primary={option.label} primaryTypographyProps={{ fontSize: '12px' }} />
            </MenuItem>
          ))}
        </Select>
        {fieldState?.error && (
          <FormHelperText error sx={{ ml: 0 }}>
            {fieldState.error.message}
          </FormHelperText>
        )}
      </FormControl>
    );
  };

  return (
    <Stack direction="column">
      <Stack direction="row" flex={1}>
        {control && name ? (
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => renderSelect(field, fieldState)}
          />
        ) : (
          renderSelect()
        )}
      </Stack>
    </Stack>
  );
};
