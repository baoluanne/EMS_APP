import { Stack } from '@mui/material';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface Props {
  value?: number;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const LocTheoToBoMonSelection: FC<Props> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const data: Option[] = [
    {
      value: '1',
      label: 'Đã có tổ bộ môn',
    },
    {
      value: '2',
      label: 'Chưa có tổ bộ môn',
    },
  ]

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Lọc theo tổ bộ môn"
        options={data}
        value={value?.toString()}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        required={required}
      />
    </Stack>
  );
};
