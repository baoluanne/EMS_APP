import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';

const options = [
  { label: 'Công Nghệ Thông Tin', value: '1' },
  { label: 'Ngôn Ngữ Anh', value: '2' },
];

interface LopBanDauSelectionProps {
  value?: string;
  onChange: (val: string) => void;
}

export const LopBanDauSelection: FC<LopBanDauSelectionProps> = ({ value, onChange }) => {
  return (
    <Stack>
      <FilterSelect
        label="Lớp ban đầu"
        options={options}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  );
};
