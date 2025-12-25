import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { KhoiNganh } from '@renderer/shared/types';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const KhoiNganhSelection: FC<Props> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label = 'Khối ngành',
}) => {
  const { data } = useListQuery<KhoiNganh[]>('KhoiNganh');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenKhoiNganh',
          valueKey: 'id',
        })}
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
