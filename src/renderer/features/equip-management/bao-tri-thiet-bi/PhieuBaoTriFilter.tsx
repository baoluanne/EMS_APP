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
import { PhieuBaoTriFilterState } from './validation';

const filterFields = [
  { key: 'maPhieu', label: 'Mã phiếu' },
  { key: 'trangThaiText', label: 'Trạng thái' },
];

interface Props {
  onApply: (filters: PhieuBaoTriFilterState) => void;
  onReset: () => void;
}

export const PhieuBaoTriFilter = ({ onApply, onReset }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const options = useMemo(() => {
    if (!inputValue) return [];
    const results: any[] = [];
    const dateRegex = /^(\d{1,2})\/(\d{1,2})(\/(\d{4}))?$/;

    if (dateRegex.test(inputValue)) {
      results.push({ key: 'tuNgay', label: 'Từ ngày', value: inputValue, display: `Từ ngày: "${inputValue}"`, isDate: true });
      results.push({ key: 'denNgay', label: 'Đến ngày', value: inputValue, display: `Đến ngày: "${inputValue}"`, isDate: true });
    }

    filterFields.forEach((field) => {
      results.push({ key: field.key, label: field.label, value: inputValue, display: `${field.label}: "${inputValue}"` });
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
            placeholder="Tìm theo Mã phiếu, Trạng thái, hoặc gõ ngày (vd: 24/02)..."
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
              '& .MuiInputBase-input': { paddingY: '4px !important', height: '1.2rem' },
            }}
          />
        )}
        renderOption={(props, option: any) => (
          <Box component="li" {...props} sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body2" fontWeight={700} color={option.isDate ? 'secondary.main' : 'primary'}>
              {option.label}:
            </Typography>
            <Typography variant="body2">&quot;{option.value}&quot;</Typography>
          </Box>
        )}
      />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', minHeight: 1 }}>
        {Object.entries(activeFilters).map(([key, value]) => {
          let label = filterFields.find((f) => f.key === key)?.label || key;
          if (key === 'tuNgay') label = 'Từ ngày';
          if (key === 'denNgay') label = 'Đến ngày';
          if (!value) return null;
          return (
            <Chip
              key={key}
              label={`${label}: ${value}`}
              onDelete={() => handleDelete(key)}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 700, bgcolor: '#e3f2fd', borderRadius: 1.5, height: 26, fontSize: '0.75rem' }}
            />
          );
        })}
        {Object.keys(activeFilters).length > 0 && (
          <Chip
            label="Xóa tất cả"
            onClick={() => { setActiveFilters({}); onReset(); }}
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