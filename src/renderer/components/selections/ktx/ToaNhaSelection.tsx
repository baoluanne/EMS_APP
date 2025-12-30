import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { toaNhaSchema } from '@renderer/features/ktx-management/toa-nha/validation';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const ToaNhaSelection = ({
  control,
  name,
  label = 'Tòa nhà',
  required = false,
  disabled = false,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'ToaNhaKtx',
    schema: toaNhaSchema,
    defaultValues: {},
  });

  const toaNhaList = useMemo(() => {
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
      tenToaNha: item.tenToaNha,
    }));
  }, [data]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} disabled={disabled || isRefetching}>
          <InputLabel required={required} id={`${name}-label`}>
            {label}
          </InputLabel>
          <Select {...field} labelId={`${name}-label`} label={label} value={field.value || ''}>
            {isRefetching ? (
              <MenuItem disabled value="">
                <CircularProgress size={20} sx={{ mr: 1 }} /> Đang tải...
              </MenuItem>
            ) : toaNhaList.length === 0 ? (
              <MenuItem disabled value="">
                -- Không có dữ liệu --
              </MenuItem>
            ) : (
              toaNhaList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.tenToaNha}
                </MenuItem>
              ))
            )}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
