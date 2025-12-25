import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { MucDoViPham, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface MucDoSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const MucDoSelection: FC<MucDoSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label,
}) => {
  const { data } = useListQuery<MucDoViPham[]>('MucDoViPham');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenMucDoViPham,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={label ?? 'Mức độ*'}
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
