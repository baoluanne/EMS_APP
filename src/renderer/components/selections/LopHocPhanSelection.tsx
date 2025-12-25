import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LopHocPhanSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const LopHocPhanSelection: FC<LopHocPhanSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name,
  control,
  required,
}) => {
  const { data } = useListQuery<{ id: string; tenLopHocPhan: string }[]>('LopHocPhan');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLopHocPhan,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Lớp học phần"
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
