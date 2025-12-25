import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { toOptions } from '@renderer/shared/utils/select';
import { FilterSelect } from '../fields';
import { KieuMonHoc } from '@renderer/shared/types';

interface KieuMonHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const KieuMonHocSelection: FC<KieuMonHocSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name,
  control,
  required,
}) => {
  const { data } = useListQuery<KieuMonHoc[]>('KieuMonHoc');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Kiểu môn${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenKieuMonHoc',
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
