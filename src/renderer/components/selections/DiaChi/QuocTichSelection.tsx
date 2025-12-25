import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../../fields';

interface QuocTichSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const QuocTichSelection: FC<QuocTichSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label,
}) => {
  const { data } = useListQuery<{ tenQuocGia: string; id: string }[]>('DanhMucQuocTich');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenQuocGia,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={label || 'Quộc tịch'}
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
