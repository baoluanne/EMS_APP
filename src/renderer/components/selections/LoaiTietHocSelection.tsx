import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { useListQuery } from '@renderer/shared/queries';
import { LoaiTiet, Option } from '@renderer/shared/types';

interface LoaiTietHocSelectionProps {
  value?: string;
  onChange: (val: string) => void;
}

export const LoaiTietHocSelection: FC<LoaiTietHocSelectionProps> = ({ value, onChange }) => {
  const { data } = useListQuery<LoaiTiet[]>('LoaiTiet');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiTiet ?? '',
    value: item.id!,
  }));
  return (
    <Stack>
      <FilterSelect
        label="Loại tiết học"
        options={options}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  );
};
