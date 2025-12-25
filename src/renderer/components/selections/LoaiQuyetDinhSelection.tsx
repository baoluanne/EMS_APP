import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface LoaiQuyetDinhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const LoaiQuyetDinhSelection: FC<LoaiQuyetDinhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  const { data } = useListQuery<
    {
      id: string;
      tenLoaiQD: string;
    }[]
  >('LoaiQuyetDinh');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenLoaiQD,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Loại quyết định"
        options={options}
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
