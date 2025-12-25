import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { BacDaoTao } from '@renderer/shared/types';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface BacDaoTaoSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const BacDaoTaoSelection: FC<BacDaoTaoSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  const { data } = useListQuery<BacDaoTao[]>('BacDaoTao');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Bậc đào tạo${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenBacDaoTao',
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
