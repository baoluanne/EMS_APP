import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterMultiSelect } from '@renderer/components/fields';
import { Control } from 'react-hook-form';
import { TRANG_THAI_DANG_KY_OPTIONS } from '@renderer/shared/constants';

interface Props {
  value?: string[];
  onChange?: (val: string[]) => void;
  control?: Control<any>;
  name?: string;
  required?: boolean;
  label?: string;
}

export const TrangThaiDangKySelection: FC<Props> = ({
  value = [],
  onChange,
  control,
  name,
  required,
  label = 'Trạng thái ĐK',
}) => {
  return (
    <Stack>
      <FilterMultiSelect
        label={`${label}${required ? '*' : ''}`}
        options={TRANG_THAI_DANG_KY_OPTIONS}
        value={value}
        onChange={(e) => onChange?.(e.target.value as string[])}
        control={control}
        name={name}
        required={required}
      />
    </Stack>
  );
};
