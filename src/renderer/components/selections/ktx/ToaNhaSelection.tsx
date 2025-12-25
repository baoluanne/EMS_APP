import { useQuery } from '@tanstack/react-query';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { Control, Controller } from 'react-hook-form';

interface ToaNhaOption {
  id: string;
  tenToaNha: string;
}

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
}

export const ToaNhaSelection = ({ control, name, label = 'Tòa nhà', required = false }: Props) => {
  const { data: toaNhaList = [], isLoading } = useQuery<ToaNhaOption[]>({
    queryKey: ['toa-nha-ktx-selection'],
    queryFn: async () => {
      console.log('Đang load tòa nhà từ backend (HTTP)');
      const response = await axios.get(`http://localhost:5031/api/toa-nha-ktx/pagination`, {
        params: { page: 1, pageSize: 200 },
      });

      console.log('Response raw:', response.data);

      const raw = response.data;

      let list: any[] = [];

      if (raw.result && Array.isArray(raw.result)) {
        list = raw.result;
      } else if (raw.data && Array.isArray(raw.data)) {
        list = raw.data;
      } else if (Array.isArray(raw)) {
        list = raw;
      } else {
        console.warn('Không tìm thấy mảng tòa nhà:', raw);
        return [];
      }

      const mapped = list
        .map((item: any) => ({
          id: item.id?.toString() || '',
          tenToaNha: item.tenToaNha || 'Không tên',
        }))
        .filter((item) => item.id);

      console.log('Danh sách tòa nhà load được:', mapped);
      return mapped;
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel required={required}>{label}</InputLabel>
          <Select {...field} label={label} disabled={isLoading}>
            {isLoading ? (
              <MenuItem disabled>
                <CircularProgress size={20} /> Đang tải...
              </MenuItem>
            ) : toaNhaList.length === 0 ? (
              <MenuItem disabled>Không có tòa nhà nào</MenuItem>
            ) : (
              toaNhaList.map((toaNha) => (
                <MenuItem key={toaNha.id} value={toaNha.id}>
                  {toaNha.tenToaNha}
                </MenuItem>
              ))
            )}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
