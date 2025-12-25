import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { LoaiKhenThuong, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LoaiKhenThuongSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  control?: Control<any>;
  name?: string;
  labelWidth?: number;
  required?: boolean;
}

export const LoaiKhenThuongSelection: FC<LoaiKhenThuongSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<LoaiKhenThuong[]>('LoaiKhenThuong');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiKhenThuong,
    value: item.id,
  }));

  return (
    <Stack>
      <FilterSelect
        label="Loại khen thưởng"
        options={options}
        value={value ?? ''}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        control={control}
        labelWidth={labelWidth}
        name={name}
        required={required}
      />
    </Stack>
  );
};
