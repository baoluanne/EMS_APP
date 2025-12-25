import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { CoSoTaoDao, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface CoSoSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
  label?: string;
}

export const CoSoSelection: FC<CoSoSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
  label = 'Cơ sở',
}) => {
  const { data } = useListQuery<CoSoTaoDao[]>('CoSoDaoTao');

  const options: Option[] = (data ?? []).map((item) => ({ label: item.tenCoSo, value: item.id }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={options}
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
