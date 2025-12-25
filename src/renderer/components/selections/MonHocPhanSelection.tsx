import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface MonHocPhanSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const MonHocPhanSelection: FC<MonHocPhanSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<{ tenMonHocPhan: string; id: string }[]>('MonHocPhan');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenMonHocPhan,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Môn học phần${required ? ' *' : ''}`}
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
