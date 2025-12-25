import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';
import { toOptions } from '@renderer/shared/utils/select';
import { useListQuery } from '@renderer/shared/queries';
import { ChuyenNganh } from '@renderer/features/chuyen-nganh/validation';

interface ChuyenNganhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
  label?: string;
}

export const ChuyenNganhSelection: FC<ChuyenNganhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
  label = 'Chuyên Ngành',
}) => {
  const { data } = useListQuery<ChuyenNganh[]>('ChuyenNganh');
  return (
    <Stack>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenChuyenNganh',
          valueKey: 'id',
        })}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        required={required}
        disabled={disabled}
      />
    </Stack>
  );
};
