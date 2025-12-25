// @renderer/components/selections/CongNoSelection.tsx
import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { formatCurrency } from '@renderer/shared/utils/format';

interface CongNoSelectionProps {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  labelWidth?: number;
  disabled?: boolean;
}

export const CongNoSelection: FC<CongNoSelectionProps> = ({
  control,
  name,
  label = 'Công nợ',
  required,
  labelWidth,
  disabled,
}) => {
  const { data = [], isLoading } = useListQuery<any[]>('CongNoSinhVien', {
    select: (res) => res.result,
  });

  const options = toOptions(data, {
    label: (item) => `${item.sinhVien?.maSinhVien} - ${item.namHocHocKy?.tenDot} - Còn nợ: ${formatCurrency(item.conNo)}`,
    value: 'id',
  });

  return (
    <Stack>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={options}
        control={control}
        name={name}
        labelWidth={labelWidth}
        disabled={disabled || isLoading}
      />
    </Stack>
  );
};
