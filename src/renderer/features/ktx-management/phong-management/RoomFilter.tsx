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

const filterFields = [
  { key: 'maPhong', label: 'Mã phòng' },
  { key: 'loaiPhong', label: 'Loại phòng' },
];

interface Props {
  onApply: (filters: any) => void;
  onReset: () => void;
}

export const RoomFilter = ({ onApply, onReset }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const options = useMemo(() => {
    if (!inputValue) return [];
    return filterFields.map((field) => ({
      key: field.key,
      label: field.label,
      value: inputValue,
      display: `${field.label}: "${inputValue}"`,
    }));
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
            placeholder="Tìm theo Mã phòng, Loại phòng..."
            size="small"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearchIcon sx={{ color: 'text.secondary', ml: 0.5, fontSize: 18 }} />
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
                '& fieldset': {
                  borderColor: '#e2e8f0',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
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
            <Typography variant="body2">&quot;{option.value}&quot;</Typography>
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
