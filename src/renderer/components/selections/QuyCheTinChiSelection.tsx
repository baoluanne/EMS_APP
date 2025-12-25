import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { QuyCheTinChi } from '@renderer/shared/types/quy-che-tin-chi.types';

interface QuyCheTinChiSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
  label?: string;
}

export const QuyCheTinChiSelection: FC<QuyCheTinChiSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name,
  control,
  required,
  label = 'Quy chế',
}) => {
  const { data } = useListQuery<QuyCheTinChi[]>('QuyChe_TinChi_');

  const options = (data ?? []).map((item) => ({
    label: item.quyCheHocVu?.tenQuyChe ?? '',
    value: item.id,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={options}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        labelWidth={labelWidth}
        name={name}
        control={control}
        required={required}
      />
    </Stack>
  );
};

