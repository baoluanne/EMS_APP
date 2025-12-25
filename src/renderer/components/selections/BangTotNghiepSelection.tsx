import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { useListQuery } from '@renderer/shared/queries';
import { BangBangDiemTN } from '@renderer/shared/types/bang-bang-diem-tot-nghiep.types';
import { toOptions } from '@renderer/shared/utils/select';
import { Control } from 'react-hook-form';

interface BangTotNghiepSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const BangTotNghiepSelection: FC<BangTotNghiepSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<BangBangDiemTN[]>('Bang_BangDiem_TN');
  return (
    <Stack>
      <FilterSelect
        label={`Bằng tốt nghiệp${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenBang_BangDiem',
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
