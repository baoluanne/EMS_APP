import {
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Box,
  createFilterOptions,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Controller, Control } from 'react-hook-form';
import axios from 'axios';
import { env } from '@renderer/shared/configs/env.config';

const api = axios.create({ baseURL: env.API_ENDPOINT });

const getVal = (obj: any, key: string) => {
  if (!obj) return '';
  if (obj[key] !== undefined) return obj[key];
  const pascal = key.charAt(0).toUpperCase() + key.slice(1);
  if (obj[pascal] !== undefined) return obj[pascal];
  const camel = key.charAt(0).toLowerCase() + key.slice(1);
  if (obj[camel] !== undefined) return obj[camel];
  return '';
};

const extractData = (response: any) => {
  const raw = response?.data || response;
  if (Array.isArray(raw)) return raw;
  if (raw?.items && Array.isArray(raw.items)) return raw.items;
  if (raw?.data && Array.isArray(raw.data)) return raw.data;
  if (raw?.result && Array.isArray(raw.result)) return raw.result;
  if (raw?.Result && Array.isArray(raw.Result)) return raw.Result;
  return [];
};

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
}

export const SinhVienSelection = ({
  control,
  name,
  label = 'Tìm kiếm sinh viên',
  required,
}: Props) => {
  const { data, isLoading } = useQuery<any[]>({
    queryKey: ['sinh-vien-all'],
    queryFn: async () => {
      try {
        const res = await api.get('/SinhVien/paginated', {
          params: {
            page: 1,
            pageSize: 10000,
            keyword: '',
          },
        });
        return extractData(res);
      } catch (error) {
        console.error('Lỗi lấy danh sách sinh viên:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option: any) => {
      const maSV = getVal(option, 'maSinhVien');
      const ho = getVal(option, 'hoDem');
      const ten = getVal(option, 'ten');
      return `${maSV} ${ho} ${ten}`;
    },
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? 'Vui lòng chọn sinh viên' : false }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Autocomplete
          options={data || []}
          loading={isLoading}
          filterOptions={filterOptions}
          getOptionLabel={(option) => {
            if (!option) return '';
            const msv = getVal(option, 'maSinhVien');
            const ho = getVal(option, 'hoDem');
            const ten = getVal(option, 'ten');
            if (!msv && !ten) return '';
            return `${msv} - ${ho} ${ten}`;
          }}
          isOptionEqualToValue={(option, val) => {
            const id1 = getVal(option, 'id');
            const id2 = val?.id || val;
            return id1 === id2;
          }}
          renderOption={(props, option) => {
            const maSV = getVal(option, 'maSinhVien');
            const hoTen = `${getVal(option, 'hoDem')} ${getVal(option, 'ten')}`;
            const optAny = option as any;
            const lopObj = optAny.LopHoc || optAny.lopHoc;
            const tenLop = lopObj ? lopObj.TenLop || lopObj.tenLop : '---';

            return (
              <li {...props} key={getVal(option, 'id') || Math.random()}>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {maSV} - {hoTen}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lớp: {tenLop}
                  </Typography>
                </Box>
              </li>
            );
          }}
          onChange={(_, newValue) => {
            onChange(newValue ? getVal(newValue, 'id') : null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message}
              required={required}
              placeholder="Nhập Mã SV hoặc Tên..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};
