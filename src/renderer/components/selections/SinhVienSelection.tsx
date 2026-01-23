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
}

const dummySchema = z.object({});

export const SinhVienSelection = ({
  control,
  name,
  label = 'Sinh viên',
  required = false,
  disabled = false,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { field } = useController({ name, control });

  // Debounce input value
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300); // 300ms delay

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue]);

  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'SinhVien',
    endpoint: `tim-kiem-sinh-vien?${debouncedInputValue}`,
    schema: dummySchema,
    defaultValues: {},
  });

  const options = useMemo(() => {
    if (!data) return [];
    const list = (data as any)?.result || (data as any)?.data || [];

    return list.map((item: any) => ({
      label: `${item.maSinhVien} - ${item.hoDem || ''} ${item.ten || ''} `.trim(),
      value: (item.id || item.Id)?.toString() || '',
    }));
  }, [data]);

  const selectedValue = useMemo(() => {
    return options.find((opt) => opt.value === field.value) || null;
  }, [options, field.value]);

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      options={options}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={selectedValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.value : '');
      }}
      loading={isRefetching}
      noOptionsText="Không tìm thấy sinh viên"
      loadingText="Đang tìm kiếm..."
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          size="small"
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
