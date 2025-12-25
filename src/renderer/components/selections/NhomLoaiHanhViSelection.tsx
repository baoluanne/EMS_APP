import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { NhomLoaiHanhViViPham, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface NhomLoaiHanhViProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
}

export const NhomLoaiHanhViPropsSelection: FC<NhomLoaiHanhViProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
}) => {
  const { data } = useListQuery<NhomLoaiHanhViViPham[]>('NhomLoaiHanhViViPham');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenNhomHanhVi,
    value: item.id,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Nhóm loại hành vi*"
        options={options}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
      />
    </Stack>
  );
};
