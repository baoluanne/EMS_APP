import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface DieuKienLamKhoaLuanSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const DieuKienLamKhoaLuanSelection: FC<DieuKienLamKhoaLuanSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  const { data } = useListQuery<any[]>('DieuKienLamKhoaLuan');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Điều kiện làm khóa luận${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenDieuKien',
          valueKey: 'id',
        })}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        required={required}
        disabled={disabled}
      />
    </Stack>
  );
};
