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
import { loaiThietBiSchema } from '@renderer/features/equip-management/loai-thiet-bi/validation';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const LoaiThietBiSelection = ({
  control,
  name,
  label = 'Loại thiết bị',
  required = false,
  disabled = false,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'LoaiThietBi',
    schema: loaiThietBiSchema,
    defaultValues: {
      id: undefined,
      maLoai: undefined,
      tenLoai: undefined,
      moTa: undefined,
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
      maLoai: item.maLoai,
      tenLoai: item.tenLoai,
    }));
  }, [data]);

  console.log('Selection data:', data);
  console.log('Selection items:', items);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} không được để trống` : false }}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} disabled={disabled || isRefetching}>
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
                {item.tenLoai}
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
