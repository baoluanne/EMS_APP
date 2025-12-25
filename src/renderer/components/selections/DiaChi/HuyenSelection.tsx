import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../../fields';

interface HuyenSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
  idTinh?: string;
}

export const HuyenSelection: FC<HuyenSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label,
  idTinh,
}) => {
  const { data } = useListQuery<{ tenQuanHuyen: string; id: string }[]>(
    `QuanHuyen/tinh/${idTinh}`,
    {
      enabled: !!idTinh,
    },
  );

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenQuanHuyen,
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
