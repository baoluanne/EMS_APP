import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option, ToBoMon } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface ToBoMonSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const ToBoMonSelection: FC<ToBoMonSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<ToBoMon[]>('ToBoMon');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenToBoMon,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Tổ bộ môn${required ? '*' : ''}`}
        options={options}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
      />
    </Stack>
  );
};
