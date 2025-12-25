import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { NganhHoc } from '@renderer/shared/types';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface NganhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const NganhSelection: FC<NganhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  const { data } = useListQuery<NganhHoc[]>('NganhHoc');
  return (
    <Stack>
      <FilterSelect
        label={`Ngành${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenNganhHoc',
          valueKey: 'id',
        })}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        disabled={disabled}
      />
    </Stack>
  );
};
