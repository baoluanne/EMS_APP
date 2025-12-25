import { Stack } from '@mui/material';
import { FilterMultiSelect, FilterSelect } from '@renderer/components/fields';
import { TRANG_THAI_SINH_VIEN_OPTIONS } from '@renderer/shared/constants';
import { Control } from 'react-hook-form';

interface Props<T extends boolean = false> {
  multiple?: T;
  value?: T extends true ? string[] : string;
  onChange?: (val: T extends true ? string[] : string) => void;
  control?: Control<any>;
  name?: string;
  required?: boolean;
  label?: string;
}

export const TrangThaiSinhVienSelection = <T extends boolean = false>({
  multiple,
  value,
  onChange,
  control,
  name,
  required,
  label = 'Trạng thái',
}: Props<T>) => {
  const isMultiple = !!multiple;

  return (
    <Stack>
      {isMultiple ? (
        <FilterMultiSelect
          label={`${label}${required ? '*' : ''}`}
          options={TRANG_THAI_SINH_VIEN_OPTIONS}
          value={(value as string[]) ?? []}
          onChange={(e) => onChange?.(e.target.value as any)}
          control={control}
          name={name}
          required={required}
        />
      ) : (
        <FilterSelect
          label={`${label}${required ? '*' : ''}`}
          options={TRANG_THAI_SINH_VIEN_OPTIONS}
          value={(value as string) ?? ''}
          onChange={(e) => onChange?.(e.target.value as any)}
          control={control}
          name={name}
          required={required}
        />
      )}
    </Stack>
  );
};
