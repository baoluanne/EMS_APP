import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { GENDER_OPTIONS } from '@renderer/shared/constants';

interface GioiTinhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const GioiTinhSelection: FC<GioiTinhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Giới tính${required ? '*' : ''}`}
        options={GENDER_OPTIONS}
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
