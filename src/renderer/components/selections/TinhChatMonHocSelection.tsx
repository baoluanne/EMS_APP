import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option, TinhChatMonHoc } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface TinhChatMonHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
}

export const TinhChatMonHocSelection: FC<TinhChatMonHocSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
}) => {
  const { data } = useListQuery<TinhChatMonHoc[]>('TinhChatMonHoc');

  const options: Option[] = (data ?? []).map((item) => ({
    label: item.tenTinhChatMonHoc,
    value: item.id!,
  }));

  return (
    <Stack flex={1}>
      <FilterSelect
        label="Tính chất môn học"
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
