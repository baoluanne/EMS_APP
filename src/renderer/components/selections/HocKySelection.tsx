import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface HocKySelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
  label?: string;
}

export const HocKySelection: FC<HocKySelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label = 'Học kỳ',
  disabled,
}) => {
  const { data } = useListQuery<{ id: string; tenDot: string }[]>('HocKy');
  return (
    <Stack>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenDot',
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
