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

interface PhongOption {
  id: string;
  maPhong: string;
  tenToaNha: string;
}

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
}

export const PhongSelection = ({ control, name, label = 'Phòng', required = false }: Props) => {
  const { data: phongList = [], isLoading } = useQuery<PhongOption[]>({
    queryKey: ['phong-ktx-selection'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5031/api/phong-ktx`);
      const raw = response.data;

      let list: any[] = [];
      if (raw.result && Array.isArray(raw.result)) list = raw.result;
      else if (raw.data && Array.isArray(raw.data)) list = raw.data;
      else if (Array.isArray(raw)) list = raw;

      return list
        .map((item: any) => ({
          id: item.id?.toString() || '',
          maPhong: item.maPhong || 'Không mã',
          tenToaNha: item.tenToaNha || item.TenToaNha || 'Không rõ tòa',
        }))
        .filter((item) => item.id);
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
            ) : phongList.length === 0 ? (
              <MenuItem disabled>Không có phòng nào</MenuItem>
            ) : (
              // <-- PHẦN QUAN TRỌNG: DÙNG ARRAY THAY VÌ FRAGMENT
              [
                <MenuItem key="placeholder" value="">
                  <em>-- Chọn phòng --</em>
                </MenuItem>,
                ...phongList.map((phong) => (
                  <MenuItem key={phong.id} value={phong.id}>
                    {phong.maPhong} - {phong.tenToaNha}
                  </MenuItem>
                )),
              ]
            )}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
