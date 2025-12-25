import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';

const options = [
  { label: 'Công Nghệ Thông Tin', value: '1' },
  { label: 'Ngôn Ngữ Anh', value: '2' },
];

interface LoaiLopSelectionProps {
  value?: string;
  onChange: (val: string) => void;
}

export const LoaiLopSelection: FC<LoaiLopSelectionProps> = ({ value, onChange }) => {
  return (
    <Stack>
      <FilterSelect
        label="Loại lớp"
        options={options}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  );
};
