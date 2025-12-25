import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { TrangThaiSinhVienSelection } from '@renderer/components/selections/TrangThaiSinhVienSelection';
import { FilterFormProps } from '@renderer/shared/types';
import { useForm } from 'react-hook-form';
import { defaultThongKeDanhSachInBieuMauFilter, ThongKeDanhSachInBieuMauFilter } from '../types';

export const ThongKeDanhSachInBieuMauFilters = ({
  onApply,
  onClear,
}: FilterFormProps<ThongKeDanhSachInBieuMauFilter>) => {
  const filterMethods = useForm<ThongKeDanhSachInBieuMauFilter>({
    defaultValues: defaultThongKeDanhSachInBieuMauFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultThongKeDanhSachInBieuMauFilter);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<ThongKeDanhSachInBieuMauFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <ControlledDateRangePicker
            control={control}
            startName="ngayInFrom"
            endName="ngayInTo"
            startLabel="Ngày in từ ngày"
            endLabel="Ngày in đến ngày"
          />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="maBieuMau" label="Mã biểu mẫu" />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" />
        </Grid>

        <Grid size={4}>
          <TrangThaiSinhVienSelection
            control={control}
            name="trangThaiSinhVien"
            label="Trạng thái sinh viên"
          />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="mayIn" label="Máy in" />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="nguoiIn" label="Người in" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
