import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { LoaiHanhViViPham, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LoaiHanhViSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  control?: Control<any>;
  name?: string;
  labelWidth?: number;
  required?: boolean;
}

export const LoaiHanhViSelection: FC<LoaiHanhViSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<LoaiHanhViViPham[]>('LoaiHanhViViPham');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiHanhVi,
    value: item.id!,
  }));

  return (
    <Stack>
      <FilterSelect
        label="Loại hành vi"
        options={options}
        value={value ?? ''}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        control={control}
        labelWidth={labelWidth}
        name={name}
        required={required}
      />
    </Stack>
  );
};
