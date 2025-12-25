import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';

interface HinhThucDaoTaoSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const HinhThucDaoTaoSelection: FC<HinhThucDaoTaoSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<{ id: string; tenHinhThuc: string }[]>('HinhThucDaoTao');

  return (
    <Stack>
      <FilterSelect
        label={`Hình thức đào tạo${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenHinhThuc',
          valueKey: 'id',
        })}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
      />
    </Stack>
  );
};
