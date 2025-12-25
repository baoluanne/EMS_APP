import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '@renderer/components/fields';

interface LopHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

export const LopHocSelection: FC<LopHocSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label,
}) => {
  const { data } = useListQuery<any[]>('LopHoc');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label || 'Lớp học'}${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenLopHoc',
          valueKey: 'id',
        })}
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
