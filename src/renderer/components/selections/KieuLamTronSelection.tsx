import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { KieuLamTron } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { toOptions } from '@renderer/shared/utils/select';
import { FilterSelect } from '../fields';

interface KieuLamTronSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const KieuLamTronSelection: FC<KieuLamTronSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name,
  control,
  required,
}) => {
  const { data } = useListQuery<KieuLamTron[]>('KieuLamTron');

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Kiểu làm tròn"
        options={toOptions(data || [], {
          labelKey: 'tenKieuLamTron',
          valueKey: 'id',
        })}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        labelWidth={labelWidth}
        name={name}
        control={control}
        required={required}
      />
    </Stack>
  );
};
