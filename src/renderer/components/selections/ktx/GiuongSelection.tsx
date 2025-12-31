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
  phongId?: string;
}

const dummySchema = z.object({});

export const GiuongSelection = ({
  control,
  name,
  label = 'Giường',
  required = false,
  disabled = false,
  phongId,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'GiuongKtx',
    schema: dummySchema,
    defaultValues: {},
  });

  const giuongList = useMemo(() => {
    if (!data) return [];

    let list: any[] = [];
    if ('data' in data && Array.isArray(data.data)) {
      list = data.data;
    } else if ('result' in data && Array.isArray(data.result)) {
      list = data.result;
    } else if (Array.isArray(data)) {
      list = data;
    }

    if (phongId) {
      list = list.filter(
        (item) =>
          (item.phongKtxId === phongId || item.PhongKtxId === phongId) &&
          (item.trangThai === 'Trong' || item.TrangThai === 'Trong'),
      );
    }

    return list.map((item) => ({
      id: item.id?.toString() || item.Id?.toString(),
      maGiuong: item.maGiuong || item.MaGiuong || '',
      trangThai: item.trangThai || item.TrangThai || '',
    }));
  }, [data, phongId]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} disabled={disabled || isRefetching || !phongId}>
          <InputLabel required={required} id={`${name}-label`}>
            {label}
          </InputLabel>
          <Select {...field} labelId={`${name}-label`} label={label} value={field.value || ''}>
            {isRefetching ? (
              <MenuItem disabled value="">
                <CircularProgress size={20} sx={{ mr: 1 }} /> Đang tải...
              </MenuItem>
            ) : !phongId ? (
              <MenuItem disabled value="">
                -- Vui lòng chọn phòng trước --
              </MenuItem>
            ) : giuongList.length === 0 ? (
              <MenuItem disabled value="">
                -- Không có giường trống --
              </MenuItem>
            ) : (
              giuongList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  Giường {item.maGiuong}
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
