import { useState, useMemo } from 'react';
import {
  Stack,
  TextField,
  Autocomplete,
  Box,
  Typography,
  Chip,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PhieuThanhLyFilterState } from './validation';

const filterFields = [
  { key: 'soQuyetDinh', label: 'Số Quyết Định' },
  { key: 'nguoiLapPhieu', label: 'Người lập phiếu' },
  { key: 'thietBi', label: 'Thiết bị' },
  { key: 'lyDo', label: 'Lý do' },
];

interface Props {
  onApply: (filters: PhieuThanhLyFilterState) => void;
  onReset: () => void;
}

export const PhieuThanhLyFilter = ({ onApply, onReset }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const options = useMemo(() => {
    if (!inputValue) return [];
    const results: any[] = [];

    // 1. Kiểm tra xem user có đang gõ định dạng ngày không (VD: 11/02 hoặc 11/02/2026)
    // Regex: Cho phép gõ dd/mm hoặc dd/mm/yyyy
    const dateRegex = /^(\d{1,2})\/(\d{1,2})(\/(\d{4}))?$/;

    if (dateRegex.test(inputValue)) {
      results.push({
        key: 'ngayThanhLy',
        label: 'Ngày thanh lý',
        value: inputValue,
        display: `Ngày thanh lý: "${inputValue}"`,
        isDate: true, // Đánh dấu đây là option đặc biệt
      });
    }

    // 2. Các option text thông thường
    filterFields.forEach((field) => {
      results.push({
        key: field.key,
        label: field.label,
        value: inputValue,
        display: `${field.label}: "${inputValue}"`,
      });
    });

    return results;
  }, [inputValue]);

  const handleSelect = (_: any, newValue: any) => {
    if (newValue && typeof newValue !== 'string') {
      const updated = { ...activeFilters, [newValue.key]: newValue.value };
      setActiveFilters(updated);
      onApply(updated as any);
      setInputValue('');
    }
  };

  const handleDelete = (key: string) => {
    const updated = { ...activeFilters };
    delete updated[key];
    setActiveFilters(updated);
    if (Object.keys(updated).length === 0) onReset();
    else onApply(updated as any);
  };

  return (
    <Stack spacing={1} sx={{ mb: 1 }}>
      <Autocomplete
        freeSolo
        value={null}
        options={options}
        getOptionLabel={(option: any) => option.display || ''}
        inputValue={inputValue}
        onInputChange={(_, val) => setInputValue(val)}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            // Placeholder hướng dẫn người dùng
            placeholder="Tìm theo Số QĐ, Người lập, hoặc gõ ngày (vd: 11/02/2026)..."
            size="small"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', ml: 0.5, fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff',
                borderRadius: 2,
                paddingY: '1px !important',
                px: 1,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                '& fieldset': { borderColor: '#e2e8f0' },
                '&:hover fieldset': { borderColor: 'primary.main' },
              },
              '& .MuiInputBase-input': {
                paddingY: '4px !important',
                height: '1.2rem',
              },
            }}
          />
        )}
        renderOption={(props, option: any) => (
          <Box component="li" {...props} sx={{ display: 'flex', gap: 1 }}>
            <Typography
              variant="body2"
              fontWeight={700}
              color={option.isDate ? 'secondary.main' : 'primary'} // Đổi màu nếu là ngày
            >
              {option.label}:
            </Typography>
            <Typography variant="body2">&quot;{option.value}&quot;</Typography>
          </Box>
        )}
      />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', minHeight: 1 }}>
        {Object.entries(activeFilters).map(([key, value]) => {
          // Tìm label, nếu là ngày thanh lý thì tự đặt label
          const field = filterFields.find((f) => f.key === key);
          const label = field ? field.label : key === 'ngayThanhLy' ? 'Ngày thanh lý' : key;

          if (!value) return null;
          return (
            <Chip
              key={key}
              label={`${label}: ${value}`}
              onDelete={() => handleDelete(key)}
              color="primary"
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: '#e3f2fd',
                borderRadius: 1.5,
                height: 26,
                fontSize: '0.75rem',
              }}
            />
          );
        })}
        {Object.keys(activeFilters).length > 0 && (
          <Chip
            label="Xóa tất cả"
            onClick={() => {
              setActiveFilters({});
              onReset();
            }}
            size="small"
            color="error"
            variant="filled"
            sx={{
              height: 26,
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          />
        )}
      </Box>
    </Stack>
  );
};
