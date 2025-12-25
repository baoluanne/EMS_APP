import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Khoa, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface KhoaSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const KhoaSelection: FC<KhoaSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label = 'Khoa',
}) => {
  const { data } = useListQuery<Khoa[]>('Khoa');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenKhoa,
    value: item.id!,
  }));
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={options}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        required={required}
      />
    </Stack>
  );
};
