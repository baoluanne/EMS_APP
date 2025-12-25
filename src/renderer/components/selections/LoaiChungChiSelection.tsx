import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { toOptions } from '@renderer/shared/utils/select';
import { LoaiChungChi } from '@renderer/features/loai-chung-chi';

interface LoaiChungChiSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const LoaiChungChiSelection: FC<LoaiChungChiSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<LoaiChungChi[]>('LoaiChungChi');

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Loại chứng chỉ${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenLoaiChungChi',
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
