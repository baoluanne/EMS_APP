import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface CaHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const CaHocSelection: FC<CaHocSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<{ id: string; tenCaHoc }[]>('CaHoc');

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Ca học${required ? '*' : ''}`}
        options={toOptions(data ?? [], { labelKey: 'tenCaHoc', valueKey: 'id' })}
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
