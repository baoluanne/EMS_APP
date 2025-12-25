import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface NhomTHSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  label?: string;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

const nhomTHOptions = Array.from({ length: 7 }, (_, index) => ({
  label: `Nhóm TH ${index + 1}`,
  value: (index + 1).toString(),
}));

export const NhomTHSelection: FC<NhomTHSelectionProps> = ({
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
        label={label || `Nhóm TH${required ? '*' : ''}`}
        options={nhomTHOptions}
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
