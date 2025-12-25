import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { NoiDung } from '@renderer/shared/types';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface NoiDungSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const NoiDungSelection: FC<NoiDungSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<NoiDung[]>('NoiDung');
  return (
    <Stack>
      <FilterSelect
        label={`Nội dung${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenNoiDung',
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
