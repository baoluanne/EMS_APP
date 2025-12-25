import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { useListQuery } from '@renderer/shared/queries';
import { ChungChi } from '@renderer/features/chung-chi';
import { toOptions } from '@renderer/shared/utils/select';

interface ChungChiSelection {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const ChungChiSelection: FC<ChungChiSelection> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<ChungChi[]>('ChungChi');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Chứng chỉ${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenLoaiChungChi',
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
