import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { NamHoc } from '@renderer/shared/types';

interface NamHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const NamHocSelection: FC<NamHocSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  const { data } = useListQuery<NamHoc[]>('NamHoc');
  return (
    <Stack>
      <FilterSelect
        label={`Năm học${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'namHocValue',
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
