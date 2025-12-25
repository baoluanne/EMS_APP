import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { LOAI_LOP_LHP_OPTIONS } from '@renderer/shared/constants/loai-lop-lhp.constant';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const LoaiLopLHPSelection: FC<Props> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label = 'Loại lớp LHP',
}) => {
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={LOAI_LOP_LHP_OPTIONS}
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
