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
import { z } from 'zod';

import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  toaNhaId?: string;
}

const dummySchema = z.object({});

export const PhongSelection = ({
  control,
  name,
  label = 'Phòng',
  required = false,
  disabled = false,
  toaNhaId,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'PhongKtx',
    schema: dummySchema,
    defaultValues: {},
  });

  const phongList = useMemo(() => {
    if (!data) return [];

    let list: any[] = [];
    if ('data' in data && Array.isArray(data.data)) {
      list = data.data;
    } else if ('result' in data && Array.isArray(data.result)) {
      list = data.result;
    } else if (Array.isArray(data)) {
      list = data;
    }

    if (toaNhaId) {
      list = list.filter((item) => item.toaNhaId === toaNhaId || item.idToaNha === toaNhaId);
    }

    return list.map((item) => ({
      id: item.id?.toString(),
      maPhong: item.maPhong,
      tenToaNha: item.tenToaNha || item.toaNha?.tenToaNha || '',
    }));
  }, [data, toaNhaId]);

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
                <CircularProgress size={20} sx={{ mr: 1 }} /> Đang tải dữ liệu...
              </MenuItem>
            ) : phongList.length === 0 ? (
              <MenuItem disabled value="">
                -- Không có dữ liệu --
              </MenuItem>
            ) : (
              phongList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.maPhong} {item.tenToaNha ? `- ${item.tenToaNha}` : ''}
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
