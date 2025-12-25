import { Stack } from '@mui/material';
import { FilterSelect } from '@renderer/components/fields';
import { Control } from 'react-hook-form';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  control?: Control<any>;
  name?: string;
  required?: boolean;
  label?: string;
}

export const LoaiThongKeHoSoSelection = ({
  value,
  onChange,
  control,
  name,
  required,
  label = 'Loại hồ sơ',
}: Props) => {
  return (
    <Stack>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={[
          { value: '0', label: 'Bắt buộc' },
          { value: '1', label: 'Không bắt buộc' },
        ]}
        value={(value as string) ?? ''}
        onChange={(e) => onChange?.(e.target.value as any)}
        control={control}
        name={name}
        required={required}
      />
    </Stack>
  );
};
