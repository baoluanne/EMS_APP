import { MenuItem, TextField } from '@mui/material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export const DanhMucKhoanThuNgoaiHocPhiSelection = ({
  control,
  name,
  label = 'Khoản thu/Gói dịch vụ',
  disabled,
}: Props) => {
  const { data } = useCrudPagination<any>({
    entity: 'DanhMucKhoanThuNgoaiHocPhi',
    defaultState: { pageSize: 100 },
  });

  const options = (data as any)?.result || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          label={label}
          disabled={disabled}
          error={!!error}
          helperText={error?.message}
          size="small"
          value={field.value || ''}
        >
          <MenuItem value="">--- Chọn khoản thu ---</MenuItem>
          {options.map((item: any) => (
            <MenuItem key={item.id} value={item.id}>
              {item.maKhoanThu} - {item.tenKhoanThu} (
              {new Intl.NumberFormat('vi-VN').format(item.soTien)} ₫)
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
