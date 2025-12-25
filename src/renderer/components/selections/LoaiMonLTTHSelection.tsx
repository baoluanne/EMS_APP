import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { LOAI_MON_LTTH_OPTIONS } from '@renderer/shared/constants/loai-mon-ltth.constant';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const LoaiMonLTTHSelection: FC<Props> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label = 'Loại môn LT/TH',
}) => {
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={LOAI_MON_LTTH_OPTIONS}
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
