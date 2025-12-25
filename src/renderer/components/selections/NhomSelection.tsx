import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface NhomSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  label?: string;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

const nhomOptions = Array.from({ length: 7 }, (_, index) => ({
  label: `Nhóm ${index + 1}`,
  value: (index + 1).toString(),
}));

export const NhomSelection: FC<NhomSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  label,
  labelWidth,
  required,
  disabled,
}) => {
  return (
    <Stack flex={1}>
      <FilterSelect
        label={label || `Nhóm${required ? '*' : ''}`}
        options={nhomOptions}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        required={required}
        disabled={disabled}
      />
    </Stack>
  );
};
