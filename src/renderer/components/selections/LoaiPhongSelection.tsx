import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { LoaiPhong, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LoaiPhongSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const LoaiPhongSelection: FC<LoaiPhongSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<LoaiPhong[]>('LoaiPhong');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiPhong,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Loại phòng"
        options={options}
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
