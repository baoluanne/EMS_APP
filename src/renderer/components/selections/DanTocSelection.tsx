import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { DanToc, Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface DanTocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const DanTocSelection: FC<DanTocSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<DanToc[]>('DanhMucDanToc');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenDanToc,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Dân tộc"
        options={options}
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
