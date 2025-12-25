import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';
import { Option } from '@renderer/shared/types';
import { useListQuery } from '@renderer/shared/queries';
import { TrangThaiXetQuyUoc } from '@renderer/shared/types/trang-thai-xet-quy-uoc.types';

interface TrangThaiXetQuyUocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const TrangThaiXetQuyUocSelection: FC<TrangThaiXetQuyUocSelectionProps> = ({
  value,
  onChange,
  labelWidth,
  name,
  control,
  required,
}) => {
  const { data } = useListQuery<TrangThaiXetQuyUoc[]>('TrangThaiXetQuyUoc');
  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenTrangThaiXetQuyUoc,
    value: item.id!,
  }));
  return (
    <Stack>
      <FilterSelect
        label="Trạng thái xét quy ước"
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
