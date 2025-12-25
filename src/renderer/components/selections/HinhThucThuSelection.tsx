import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { HinhThucThuOptions } from '@renderer/shared/types/hinh-thuc-thu.types';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const HinhThucThuSelection: FC<Props> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Hình thức thu${required ? '*' : ''}`}
        options={HinhThucThuOptions as any}
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
