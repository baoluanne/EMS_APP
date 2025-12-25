import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';

interface DoiTuongUuTienSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  control?: Control<any>;
  name?: string;
}

export const DoiTuongUuTienSelection: FC<DoiTuongUuTienSelectionProps> = ({
  value,
  onChange,
  control,
  name,
}) => {
  const { data } = useListQuery<{ id: string; tenDoiTuong: string }[]>('DanhMucDoiTuongUuTien');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenDoiTuong,
    value: item.id,
  }));

  return (
    <Stack>
      <FilterSelect
        label="Đối tượng ưu tiên"
        options={options}
        value={value ?? ''}
        name={name}
        onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
        control={control}
      />
    </Stack>
  );
};
