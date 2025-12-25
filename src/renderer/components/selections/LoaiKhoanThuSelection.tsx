import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LoaiKhoanThuSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const LoaiKhoanThuSelection: FC<LoaiKhoanThuSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name,
  control,
  required,
}) => {
  const { data } = useListQuery<{ id: string; tenLoaiKhoanThu: string }[]>('LoaiKhoanThu');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiKhoanThu,
    value: item.id,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Loại khoản thu"
        options={options}
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
