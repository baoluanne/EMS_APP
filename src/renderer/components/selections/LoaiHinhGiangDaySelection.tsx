import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';

interface LoaiHinhGiangDaySelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const LoaiHinhGiangDaySelection: FC<LoaiHinhGiangDaySelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<{ id: string; tenLoaiHinhGiangDay: string }[]>('LoaiHinhGiangDay');

  return (
    <Stack>
      <FilterSelect
        label={`Loại hình giảng dạy${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenLoaiHinhGiangDay',
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
