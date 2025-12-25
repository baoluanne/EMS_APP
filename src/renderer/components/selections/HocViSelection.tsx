import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { HocVi, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface HocViSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
}

export const HocViSelection: FC<HocViSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
}) => {
  const { data } = useListQuery<HocVi[]>('HocVi');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenHocVi,
    value: item.id!,
  }));
  return (
    <Stack flex={1}>
      <FilterSelect
        label="Học vị"
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
