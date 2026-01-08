import { useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { nhaCungCapSchema } from '@renderer/features/equip-management/nha-cung-cap-thiet-bi/validation';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const NhaCungCapSelection = ({
  control,
  name,
  label = 'Nhà cung cấp',
  required = false,
  disabled = false,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'NhaCungCap',
    schema: nhaCungCapSchema,
    defaultValues: {
      id: undefined,
      tenNhaCungCap: undefined,
      dienThoai: undefined,
      email: undefined,
      diaChi: undefined,
      ghiChu: undefined,
    },
  });

  const items = useMemo(() => {
    if (!data) return [];

    let list: any[] = [];
    if ('data' in data && Array.isArray(data.data)) {
      list = data.data;
    } else if ('result' in data && Array.isArray(data.result)) {
      list = data.result;
    } else if (Array.isArray(data)) {
      list = data;
    }

    return list.map((item) => ({
      id: item.id?.toString(),
      tenNhaCungCap: item.tenNhaCungCap,
    }));
  }, [data]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} không được để trống` : false }}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth
          error={!!error}
          disabled={disabled || isRefetching}
          sx={{ height: '56px' }}
        >
          <InputLabel required={required} id={`${name}-label`}>
            {label}
          </InputLabel>
          <Select
            labelId={`${name}-label`}
            label={label}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          >
            <MenuItem value="">
              <em>Chọn {label}</em>
            </MenuItem>
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.tenNhaCungCap}
              </MenuItem>
            ))}
          </Select>
          {isRefetching && (
            <CircularProgress
              size={24}
              style={{ position: 'absolute', top: '50%', right: '40px', marginTop: -12 }}
            />
          )}
          <FormHelperText>{error ? error.message : ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
