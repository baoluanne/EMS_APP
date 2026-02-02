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
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import type { ThongTinSvKtxFilterState } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/type';

const filterFields = [
  { key: 'maSinhVien', label: 'Mã sinh viên' },
  { key: 'hoTen', label: 'Họ tên' },
  { key: 'maPhong', label: 'Mã phòng' },
  { key: 'maGiuong', label: 'Mã giường' },
  { key: 'isSapHetHan', label: 'Tình trạng', value: 'true', displayLabel: 'Sắp hết hạn nội trú' },
  {
    key: 'isQuaHan',
    label: 'Tình trạng',
    value: 'true',
    displayLabel: 'Đã quá hạn (Chưa gia hạn)',
  },
];

interface Props {
  onApply: (filters: ThongTinSvKtxFilterState) => void;
  onReset: () => void;
}

export const ThongTinSvKtxFilter = ({ onApply, onReset }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const options = useMemo(() => {
    if (!inputValue) return [];
    const results: any[] = [];
    const searchLower = inputValue.toLowerCase();

    filterFields.forEach((field) => {
      if (field.key === 'isSapHetHan' || field.key === 'isQuaHan') {
        if ('hạn hết gia hạn quá hạn nội trú'.includes(searchLower)) {
          results.push({
            key: field.key,
            label: field.label,
            value: field.value,
            display: field.displayLabel,
          });
        }
      } else {
        results.push({
          key: field.key,
          label: field.label,
          value: inputValue,
          display: `${field.label}: "${inputValue}"`,
        });
      }
    });

    return results;
  }, [inputValue]);

  const handleSelect = (_: any, newValue: any) => {
    if (newValue && typeof newValue !== 'string') {
      const updated = { ...activeFilters };

      // ✅ Ngăn conflict: Xóa filter đối lập khi chọn mới
      if (newValue.key === 'isSapHetHan' && updated['isQuaHan']) {
        delete updated['isQuaHan'];
      }
      if (newValue.key === 'isQuaHan' && updated['isSapHetHan']) {
        delete updated['isSapHetHan'];
      }

      updated[newValue.key] = newValue.value;
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
            placeholder="Tìm theo MSSV, Tên, Mã phòng hoặc Tình trạng hạn học phí..."
            size="small"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearchIcon sx={{ color: 'primary.main', ml: 0.5, fontSize: 20 }} />
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
                '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' },
              },
              '& .MuiInputBase-input': { paddingY: '4px !important', height: '1.2rem' },
            }}
          />
        )}
        renderOption={(props, option: any) => (
          <Box component="li" {...props} sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body2" fontWeight={700} color="primary">
              {option.label}:
            </Typography>
            <Typography variant="body2">{option.display || option.value}</Typography>
          </Box>
        )}
      />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', minHeight: 1 }}>
        {Object.entries(activeFilters).map(([key, value]) => {
          const field = filterFields.find((f) => f.key === key);
          const label =
            field?.key === 'isSapHetHan' || field?.key === 'isQuaHan'
              ? field.displayLabel
              : `${field?.label}: ${value}`;
          return (
            <Chip
              key={key}
              label={label}
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
            sx={{ height: 26, fontSize: '0.75rem', fontWeight: 700 }}
          />
        )}
      </Box>
    </Stack>
  );
};
