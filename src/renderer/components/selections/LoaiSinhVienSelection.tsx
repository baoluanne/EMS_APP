import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { toOptions } from '@renderer/shared/utils/select';
import { LoaiSinhVien } from '@renderer/features/loai-sinh-vien';

interface LoaiSinhVienSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const LoaiSinhVienSelection: FC<LoaiSinhVienSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<LoaiSinhVien[]>('LoaiSinhVien');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Loại sinh viên${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenLoaiSinhVien',
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
