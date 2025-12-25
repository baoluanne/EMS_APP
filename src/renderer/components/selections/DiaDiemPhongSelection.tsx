import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { DiaDiemPhong, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface DiaDiemPhongSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  control?: Control<any>;
  name?: string;
  labelWidth?: number;
  required?: boolean;
}

export const DiaDiemPhongSelection: FC<DiaDiemPhongSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<DiaDiemPhong[]>('DiaDiemPhong');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenNhomDDPhong,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Nhóm ĐĐ phòng"
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
