import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

interface TaiSanOption {
  id: string;
  tenTaiSan: string;
  maTaiSan: string;
  tinhTrang: string;
  phongKtxId?: string;
}

interface TaiSanSelectionProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  phongKtxId?: string;
}

export const TaiSanSelection = <T extends FieldValues>({
  control,
  name,
  label = 'Tài sản KTX',
  required = false,
  phongKtxId,
}: TaiSanSelectionProps<T>) => {
  const { data: taiSanList = [], isLoading } = useQuery({
    queryKey: ['tai-san-ktx-by-phong', phongKtxId],
    queryFn: async () => {
      if (!phongKtxId) return [];
      const response = await fetch(`/api/tai-san-ktx?phongKtxId=${phongKtxId}`);
      if (!response.ok) return [];
      const result = await response.json();
      return result.data || [];
    },
    enabled: !!phongKtxId,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete<TaiSanOption, false, false, false>
          {...field}
          options={taiSanList}
          getOptionLabel={(option) => option.tenTaiSan || ''}
          loading={isLoading}
          disabled={!phongKtxId}
          onChange={(_, value) => field.onChange(value?.id || '')}
          value={taiSanList.find((item: TaiSanOption) => item.id === field.value) || null}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={
                !phongKtxId ? 'Vui lòng chọn phòng KTX trước' : (error?.message as string) || ''
              }
              required={required}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {option.tenTaiSan}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Mã: {option.maTaiSan}
                </Typography>
              </Box>
            </Box>
          )}
          noOptionsText={phongKtxId ? 'Không có tài sản' : 'Chọn phòng trước'}
          loadingText="Đang tải tài sản..."
        />
      )}
    />
  );
};