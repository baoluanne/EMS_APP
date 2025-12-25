import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { DotRaQuyetDinh, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface DotRaQuyetDinhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const DotRaQuyetDinhSelection: FC<DotRaQuyetDinhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<DotRaQuyetDinh[]>('DotRaQuyetDinh');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenDotRaQuyetDinh,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Đợt ra quyết định"
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
