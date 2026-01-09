import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { KiemKeTaiSanFilterState } from '../type';

// eslint-disable-next-line react-refresh/only-export-components
export const kiemKeTaiSanDefaultFilters: KiemKeTaiSanFilterState = {
  id: undefined,
  tenDotKiemKe: undefined,
  ngayBatDau: undefined,
  ngayKetThuc: undefined,
  daHoanThanh: undefined,
};

interface Props {
  onApply: (filters: KiemKeTaiSanFilterState) => void;
  onReset: () => void;
}
export const KiemKeTaiSanFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<KiemKeTaiSanFilterState>({
    defaultValues: kiemKeTaiSanDefaultFilters,
  });

  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(kiemKeTaiSanDefaultFilters);
    onReset();
  };
  const handleApply = (data: KiemKeTaiSanFilterState) => {
    const cleanedData: KiemKeTaiSanFilterState = {
      tenDotKiemKe: data.tenDotKiemKe?.trim() ? data.tenDotKiemKe.trim() : undefined,
      ngayBatDau: data.ngayBatDau?.trim() ? data.ngayBatDau.trim() : undefined,
      ngayKetThuc: data.ngayKetThuc?.trim() ? data.ngayKetThuc.trim() : undefined,
      daHoanThanh: data.daHoanThanh?.trim() ? data.daHoanThanh.trim() : undefined,
    };

    onApply(cleanedData);
  };
  return (
    <FilterDrawerBottom<KiemKeTaiSanFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="tenDotKiemKe"
            label="Tên đợt kiểm kê"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="ngayBatDau"
            label="Ngày bắt đầu"
            type="date"
            InputLabelProps={{ shrink: true }}
            placeholder="Chọn ngày"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="ngayKetThuc"
            label="Ngày kết thúc"
            type="date"
            InputLabelProps={{ shrink: true }}
            placeholder="Chọn ngày"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="daHoanThanh"
            label="Đã hoàn thành"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
