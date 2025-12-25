// src/renderer/components/selections/NamHocHocKySelection.tsx
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Controller, Control } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useDebounce } from '@renderer/shared/hooks/use-debounce';
import { env } from '@renderer/shared/configs/env.config';

// 1. Setup API
const api = axios.create({ baseURL: env.API_ENDPOINT });

// 2. Helper lấy giá trị an toàn
const getVal = (obj: any, key: string) => {
  if (!obj) return '';
  if (obj[key] !== undefined && obj[key] !== null) return obj[key];
  const pascal = key.charAt(0).toUpperCase() + key.slice(1);
  if (obj[pascal] !== undefined && obj[pascal] !== null) return obj[pascal];
  const camel = key.charAt(0).toLowerCase() + key.slice(1);
  if (obj[camel] !== undefined && obj[camel] !== null) return obj[camel];
  return '';
};

// 3. Helper trích xuất data
const extractArray = (response: any) => {
  const raw = response?.data || response;
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.result)) return raw.result;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
};

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const NamHocHocKySelection = ({
  control,
  name,
  label = 'Chọn Năm học - Học kỳ',
  required,
  disabled = false,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useDebounce(inputValue, 300);

  // 4. Gọi API
  const { data: allOptions = [], isLoading } = useQuery<any[]>({
    queryKey: ['namhoc-hocky-all'],
    queryFn: async () => {
      try {
        const res = await api.get('/NamHoc_HocKy');
        return extractArray(res);
      } catch (err) {
        console.error('Lỗi tải năm học:', err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 10, // Cache 10 phút
  });

  // --- SỬA LỖI Ở ĐÂY: ĐƯA HÀM NÀY LÊN TRƯỚC ---
  // 5. Hàm tạo nhãn hiển thị
  const generateLabel = (option: any) => {
    if (!option) return '';
    const dot = getVal(option, 'tenDot') || getVal(option, 'tenHocKy');
    const nam = getVal(option, 'tenNamHoc') || getVal(option, 'namHoc');
    if (nam && dot) return `${nam} - ${dot}`;
    return dot || nam || '---';
  };
  // ----------------------------------------------

  // 6. Logic lọc phía Client (Giờ gọi generateLabel mới an toàn)
  const filteredOptions = allOptions.filter((option) => {
    if (!debouncedSearch) return true;
    const label = generateLabel(option).toLowerCase();
    return label.includes(debouncedSearch.toLowerCase());
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? 'Vui lòng chọn đợt học' : false }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        // Tìm object đang được chọn dựa trên ID (value) để hiển thị
        const selectedOption = allOptions.find((item) => getVal(item, 'id') === value) || null;

        return (
          <Autocomplete
            disabled={disabled}
            value={selectedOption}
            options={filteredOptions} // Dùng danh sách đã lọc
            loading={isLoading}
            isOptionEqualToValue={(option, val) => getVal(option, 'id') === getVal(val, 'id')}
            getOptionLabel={generateLabel}
            // Khi người dùng gõ -> Cập nhật inputValue để filter chạy
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            // Khi người dùng chọn -> Lưu ID vào form
            onChange={(_, newValue) => {
              onChange(newValue ? getVal(newValue, 'id') : null);
            }}
            renderOption={(props, option) => (
              <li {...props} key={getVal(option, 'id')}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {generateLabel(option)}
                  </Typography>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                label={label}
                error={!!error}
                helperText={error?.message}
                required={required}
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
        );
      }}
    />
  );
};
