import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LoaiTietSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
}

export const LoaiTietSelection: FC<LoaiTietSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
}) => {
  const { data } = useListQuery<{ id: string; tenLoaiTiet: string }[]>('LoaiTiet');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiTiet,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Loại tiết"
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
