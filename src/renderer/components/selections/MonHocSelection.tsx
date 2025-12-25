import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';
import { toOptions } from '@renderer/shared/utils/select';
import { useListQuery } from '@renderer/shared/queries';
import { MonHoc } from '@renderer/shared/types'; // adjust type if needed

interface MonHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const MonHocSelection: FC<MonHocSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<MonHoc[]>('MonHoc');

  return (
    <Stack>
      <FilterSelect
        label={`Môn học${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenMonHoc',
          valueKey: 'id',
        })}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
      />
    </Stack>
  );
};
