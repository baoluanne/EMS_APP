import { Stack } from '@mui/material';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface DaKiemTraSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const DaKiemTraSelection: FC<DaKiemTraSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  return (
    <Stack flex={1}>
      <FilterSelect
        label="Đã kiểm tra"
        options={[
          {
            label: 'Chưa kiểm tra',
            value: '0',
          },
          {
            label: 'Đã kiểm tra',
            value: '1',
          },
        ]}
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
