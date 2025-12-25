import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { LoaiFileOptions } from '@renderer/shared/types';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const LoaiFileSelection: FC<Props> = ({
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
        label={`Loại file${required ? '*' : ''}`}
        options={LoaiFileOptions as any}
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
