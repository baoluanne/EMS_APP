import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { DanhMucBieuMau } from '@renderer/shared/types';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface DanhMucBieuMauSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const DanhMucBieuMauSelection: FC<DanhMucBieuMauSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<DanhMucBieuMau[]>('DanhMucBieuMau');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Biểu mẫu danh sách dự thi${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenBieuMau',
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
