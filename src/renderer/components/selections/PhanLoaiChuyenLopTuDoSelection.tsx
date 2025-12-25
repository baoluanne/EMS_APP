import { Stack } from '@mui/material';
import { Option } from '@renderer/shared/types';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { PhanLoaiChuyenLop } from '@renderer/shared/enums';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

const options: Option[] = [
  {
    label: 'Chuyển lớp tự do',
    value: PhanLoaiChuyenLop.ChuyenLopTuDo,
  },
  {
    label: 'Chuyển lớp cùng ngành',
    value: PhanLoaiChuyenLop.ChuyenLopCungNganh,
  },
];

export const PhanLoaiChuyenLopTuDoSelection: FC<Props> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  label = 'Phân loại chuyển lớp tự do',
}) => {
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
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
