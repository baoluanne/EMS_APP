import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';

const options = [
  { value: '1', label: 'Nhóm 1' },
  { value: '2', label: 'Nhóm 2' },
  { value: '3', label: 'Nhóm 3' },
];

interface DoiTuongChinhSachSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const DoiTuongChinhSachSelection: FC<DoiTuongChinhSachSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  return (
    <Stack>
      <FilterSelect
        label={`Đối tượng chính sách${required ? '*' : ''}`}
        options={options}
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
