import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { DayNha, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface DayNhaSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const DayNhaSelection: FC<DayNhaSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<DayNha[]>('DayNha');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenDayNha,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Dãy nhà"
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
