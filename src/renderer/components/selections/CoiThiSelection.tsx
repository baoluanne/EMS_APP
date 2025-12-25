import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';

const options = [
  { label: 'Công Nghệ Thông Tin', value: '1' },
  { label: 'Ngôn Ngữ Anh', value: '2' },
];

interface CoiThiSelectionProps {
  value?: string;
  onChange: (val: string) => void;
}

export const CoiThiSelection: FC<CoiThiSelectionProps> = ({ value, onChange }) => {
  return (
    <Stack>
      <FilterSelect
        label="Coi thi"
        options={options}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  );
};
