import { useMemo } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { FilterSelect } from '@renderer/components/fields';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  phongId?: string;
}

export const GiuongSelection = ({
  control,
  name,
  label = 'Giường',
  required = false,
  disabled = false,
  phongId,
}: Props) => {
  // 1. Sửa lỗi: Sử dụng isRefetching thay vì isLoading theo kiểu dữ liệu của hook
  const { data, isRefetching } = useCrudPagination<any>({
    entity: 'GiuongKtx',
    endpoint: `pagination?PhongId=${phongId || ''}&TrangThai=Trong`,
    enabled: !!phongId,
  });

  const options = useMemo(() => {
    if (!data) return [];

    let list: any[] = [];

    // 2. Sửa lỗi: Truy xuất đúng trường 'result' dựa trên thông báo lỗi TS
    // Thông báo lỗi xác nhận kiểu dữ liệu có { result: any[]; ... }
    if (Array.isArray(data)) {
      list = data;
    } else if (data && 'result' in data && Array.isArray(data.result)) {
      list = data.result;
    }

    return list.map((item) => ({
      label: `Giường ${item.maGiuong || item.MaGiuong}`,
      value: (item.id || item.Id)?.toString() || '',
    }));
  }, [data]);

  return (
    <Box sx={{ position: 'relative' }}>
      <FilterSelect
        label={label}
        options={options}
        name={name}
        control={control}
        required={required}
        // Kết hợp cả disabled từ props và trạng thái đang tải dữ liệu
        disabled={disabled || !phongId || isRefetching}
      />
      {isRefetching && (
        <CircularProgress
          size={20}
          sx={{
            position: 'absolute',
            right: 30,
            top: '25%',
          }}
        />
      )}
    </Box>
  );
};
