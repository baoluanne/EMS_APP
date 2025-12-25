import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LoaiMonHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const LoaiMonHocSelection: FC<LoaiMonHocSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name,
  control,
  required,
}) => {
  const { data } = useListQuery<{ id: string; tenLoaiMonHoc: string }[]>('LoaiMonHoc');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiMonHoc,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Loại môn học${required ? '*' : ''}`}
        options={options}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        labelWidth={labelWidth}
        name={name}
        control={control}
        required={required}
      />
    </Stack>
  );
};
