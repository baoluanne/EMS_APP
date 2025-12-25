import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../../fields';

interface TinhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const TinhSelection: FC<TinhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label,
}) => {
  const { data } = useListQuery<{ tenTinhThanh: string; id: string }[]>('TinhThanh');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenTinhThanh,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={label || 'Tỉnh'}
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
