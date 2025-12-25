import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterSelect } from '../fields';
import { Control } from 'react-hook-form';

const options = [
  { label: 'Công Nghệ Thông Tin', value: '1' },
  { label: 'Ngôn Ngữ Anh', value: '2' },
];

interface TrinhDoDuocGiangDaySelectionProps {
  value?: string;
  onChange: (val: string) => void;
  label?: string;
  name?: string;
  control?: Control<any>;
}

export const TrinhDoDuocGiangDaySelection: FC<TrinhDoDuocGiangDaySelectionProps> = ({
  value,
  onChange,
  name,
  label,
  control,
}) => {
  return (
    <Stack>
      <FilterSelect
        label={`${label || 'Trình độ được giảng dạy'}`}
        options={options}
        name={name}
        control={control}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  );
};
