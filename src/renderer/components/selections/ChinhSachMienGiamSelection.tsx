// src/renderer/components/selections/ChinhSachMienGiamSelection.tsx
import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface ChinhSachMienGiam {
  id: string;
  tenChinhSach: string;
  loaiChinhSach: 'PhanTram' | 'SoTien';
  giaTri: number;
  trangThai?: string;
}

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  filter?: Record<string, any>;
}

export const ChinhSachMienGiamSelection: FC<Props> = ({
  control,
  name,
  label = 'Chính sách miễn giảm',
  required = false,
  disabled = false,
  filter = { trangThai: 'DaDuyet' },
}) => {
  const { data, isLoading } = useListQuery<{ result: ChinhSachMienGiam[] }>('ChinhSachMienGiam', {
    params: filter,
  });

  const items = data?.result || [];

  const options = items.map((item) => ({
    label: `${item.tenChinhSach} (${
      item.loaiChinhSach === 'PhanTram'
        ? `${item.giaTri}%`
        : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.giaTri)
    })`,
    value: item.id,
  }));

  return (
    <Stack>
      <FilterSelect
        label={`${label}${required ? ' *' : ''}`}
        options={options}
        control={control}
        name={name}
        disabled={disabled || isLoading}
      />
    </Stack>
  );
};
