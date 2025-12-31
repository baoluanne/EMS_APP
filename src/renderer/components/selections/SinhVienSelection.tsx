import { useMemo } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Box,
  createFilterOptions,
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
}

const dummySchema = z.object({});

export const SinhVienSelection = ({
  control,
  name,
  label = 'Tìm kiếm sinh viên',
  required = false,
  disabled = false,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'SinhVien',
    schema: dummySchema,
    defaultValues: {},
  });

  const sinhVienList = useMemo(() => {
    const raw = (data as any)?.data || (data as any)?.items || (data as any)?.result || data || [];
    if (!Array.isArray(raw)) return [];

    return raw.map((item: any) => ({
      id: item.id || item.Id,
      maSinhVien: item.maSinhVien,
      hoTen: `${item.hoDem} ${item.ten}`,
      // Lấy giới tính (Giả sử 0: Nữ, 1: Nam hoặc Enum text)
      gioiTinh: item.gioiTinh === 0 ? 'Nữ' : item.gioiTinh === 1 ? 'Nam' : item.gioiTinh,
      tenLop: item.lopHoc?.tenLop || '---',
    }));
  }, [data]);

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option: any) => `${option.maSinhVien} ${option.hoTen}`,
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'Vui lòng chọn sinh viên' : false }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selected = sinhVienList.find((item) => item.id === value) || null;
        return (
          <Autocomplete
            disabled={disabled || isRefetching}
            options={sinhVienList}
            loading={isRefetching}
            value={selected}
            filterOptions={filterOptions}
            isOptionEqualToValue={(opt, val) => opt.id === (val?.id || val)}
            getOptionLabel={(opt) => (opt ? `${opt.maSinhVien} - ${opt.hoTen}` : '')}
            onChange={(_, newVal) => onChange(newVal?.id || null)}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {option.maSinhVien} - {option.hoTen}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ ml: 1, color: 'primary.main' }}
                    >
                      ({option.gioiTinh})
                    </Typography>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lớp: {option.tenLop}
                  </Typography>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                required={required}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isRefetching && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
};
