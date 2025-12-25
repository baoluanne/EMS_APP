import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { KhoiKienThuc, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface KhoiKienThucSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const KhoiKienThucSelection: FC<KhoiKienThucSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name,
  control,
  required,
}) => {
  const { data } = useListQuery<KhoiKienThuc[]>('KhoiKienThuc');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenKhoiKienThuc,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Khối kiến thức"
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
