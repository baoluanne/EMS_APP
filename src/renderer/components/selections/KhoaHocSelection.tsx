import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { KhoaHoc } from '@renderer/shared/types';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface KhoaHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const KhoaHocSelection: FC<KhoaHocSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  const { data } = useListQuery<KhoaHoc[]>('KhoaHoc');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Khóa học${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenKhoaHoc',
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
