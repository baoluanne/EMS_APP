import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';

const options = [
  { label: 'Ngoại trú', value: '0' },
  { label: 'Nội trú', value: '1' },
];

interface LoaiCuTruSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  control?: Control<any>;
  name?: string;
}

export const LoaiCuTruSelection: FC<LoaiCuTruSelectionProps> = ({
  value,
  onChange,
  control,
  name,
}) => {
  return (
    <Stack>
      <FilterSelect
        label="Loại cư trú"
        options={options}
        name={name}
        value={value ?? ''}
        onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
        control={control}
      />
    </Stack>
  );
};
