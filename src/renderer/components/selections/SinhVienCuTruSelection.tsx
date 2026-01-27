import { useMemo, useState, useEffect, useRef } from 'react';
import { CircularProgress, Autocomplete, TextField } from '@mui/material';
import { Control, useController } from 'react-hook-form';
import { z } from 'zod';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  isFilter?: boolean;
}

export const SinhVienCuTruSelection = ({
  control,
  name,
  label = 'Sinh viên cư trú',
  required = false,
  disabled = false,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { field } = useController({ name, control });

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [inputValue]);

  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'CutruKtx',
    endpoint: `pagination?TrangThai=0&Keyword=${encodeURIComponent(debouncedInputValue)}`,
    schema: z.object({}),
    defaultValues: {},
  });

  const options = useMemo(() => {
    if (!data) return [];
    const list = (data as any)?.result || [];
    return list.map((item: any) => ({
      label: `${item.sinhVien?.maSinhVien} - ${item.sinhVien?.hoDem} ${item.sinhVien?.ten}`.trim(),
      value: item.sinhVienId?.toString() || '',
      rawData: item,
    }));
  }, [data]);

  const selectedValue = useMemo(() => {
    if (!field.value) return null;

    if (typeof field.value === 'object') {
      const id = field.value.sinhVienId || field.value.id;
      return options.find((opt) => opt.value === id?.toString()) || null;
    }

    return options.find((opt) => opt.value === field.value.toString()) || null;
  }, [options, field.value]);

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      options={options}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      filterOptions={(x) => x}
      value={selectedValue}
      onInputChange={(_, val, reason) => {
        if (reason === 'input') setInputValue(val);
        else if (reason === 'clear') {
          setInputValue('');
          setDebouncedInputValue('');
        }
      }}
      onChange={(_, newValue) => {
        if (!newValue) {
          field.onChange('');
          return;
        }
        field.onChange(newValue.rawData);
      }}
      loading={isRefetching}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          size="small"
          placeholder="Nhập mã hoặc tên để tìm..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isRefetching ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
