import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { ILopDanhNghia } from '@renderer/shared/types';

interface LopDanhNghiaSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const LopDanhNghiaSelection: FC<LopDanhNghiaSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label = 'Lớp danh nghĩa',
}) => {
  const { data } = useListQuery<ILopDanhNghia[]>('LopDanhNghia');
  return (
    <Stack>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenLopDanhNghia',
          valueKey: 'id',
        })}
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
