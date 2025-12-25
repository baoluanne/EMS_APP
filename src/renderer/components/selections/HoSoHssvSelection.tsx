import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { HoSoHssv } from '@renderer/shared/types';
import { toOptions } from '@renderer/shared/utils/select';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  entity?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const HoSoHssvSelection: FC<Props> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  entity = 'DanhMucHoSoHssv',
}) => {
  const { data } = useListQuery<HoSoHssv[]>(entity);
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Hồ sơ${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenHoSo',
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
