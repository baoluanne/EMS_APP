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
import { DanhSachThietBiFilterState } from '../type';

const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

interface Props {
  onApply: (filters: DanhSachThietBiFilterState) => void;
  onReset: () => void;
}

export const DanhSachThietBiFilter = ({ onApply, onReset }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<any>({});

  const filterFields = [
    { key: 'maThietBi', label: 'Mã thiết bị' },
    { key: 'tenThietBi', label: 'Tên thiết bị' },
    { key: 'viTri', label: 'Vị trí' },
    { key: 'trangThaiText', label: 'Trạng thái' },
    { key: 'model', label: 'Model' },
    { key: 'serialNumber', label: 'Serial Number' },
  ];

  const options = useMemo(() => {
    if (!inputValue) return [];
    const results: any[] = [];
    const cleanInput = removeAccents(inputValue);

    filterFields.forEach((field) => {
      if (field.key === 'viTri') {
        results.push({
          key: 'viTri',
          label: 'Vị trí',
          value: inputValue,
          display: `Vị trí: "${inputValue}"`,
        });

        if (removeAccents('Chưa phân bổ').includes(cleanInput)) {
          results.push({
            key: 'viTri',
            label: 'Vị trí',
            value: 'Chưa phân bổ',
            display: 'Vị trí: "Chưa phân bổ"',
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
      const updated = { ...activeFilters, [newValue.key]: newValue.value };
      setActiveFilters(updated);
      onApply(updated);
      setInputValue('');
    }
  };

  const handleDelete = (key: string) => {
    const updated = { ...activeFilters };
    delete updated[key];
    setActiveFilters(updated);
    if (Object.keys(updated).length === 0) onReset();
    else onApply(updated);
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
            placeholder="Tìm theo Mã, Tên, Vị trí, Trạng thái..."
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
                fontSize: '1rem',
                transition: 'all 0.2s',
                '& fieldset': {
                  borderColor: '#e2e8f0',
                },
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
            <Typography variant="body2" fontWeight={700} color="primary">
              {option.label}:
            </Typography>
            <Typography variant="body2">{`"${option.value}"`}</Typography>
          </Box>
        )}
      />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', minHeight: 1 }}>
        {Object.entries(activeFilters).map(([key, value]) => {
          const field = filterFields.find((f) => f.key === key);
          if (!value) return null;
          return (
            <Chip
              key={key}
              label={`${field?.label}: ${value}`}
              onDelete={() => handleDelete(key)}
              color="primary"
              variant="outlined"
              size="medium"
              sx={{ fontWeight: 600, bgcolor: '#e3f2fd' }}
            />
          );
        })}
        {Object.keys(activeFilters).length > 0 && (
          <Chip
            label="Xóa tất cả bộ lọc"
            onClick={() => {
              setActiveFilters({});
              onReset();
            }}
            size="medium"
            color="error"
            variant="filled"
          />
        )}
      </Box>
    </Stack>
  );
};
