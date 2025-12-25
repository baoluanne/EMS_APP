import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { toOptions } from '@renderer/shared/utils/select';
import { TieuChiTuyenSinh } from '@renderer/features/tieu-chi-tuyen-sinh';

interface TieuChiTuyenSinhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const TieuChiTuyenSinhSelection: FC<TieuChiTuyenSinhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<TieuChiTuyenSinh[]>('TieuChiTuyenSinh');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Tiêu chí tuyển sinh${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenTieuChiTuyenSinh',
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
