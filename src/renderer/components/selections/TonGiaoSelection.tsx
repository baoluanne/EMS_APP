import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { TonGiao, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface TonGiaoSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const TonGiaoSelection: FC<TonGiaoSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<TonGiao[]>('DanhMucTonGiao');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenTonGiao,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Tôn giáo"
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
