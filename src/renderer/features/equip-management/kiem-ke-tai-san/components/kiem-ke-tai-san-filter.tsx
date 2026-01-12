import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { KiemKeTaiSanFilterState } from '../type';
import { FilterSelect } from '@renderer/components/fields';

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
  const getLocalDateFormat = (date: Date | string | null | undefined) => {
    if (!date) return undefined;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleApply = (data: KiemKeTaiSanFilterState) => {
    const cleanedData: KiemKeTaiSanFilterState = {
      tenDotKiemKe: data.tenDotKiemKe?.trim() || undefined,
      ngayBatDau: getLocalDateFormat(data.ngayBatDau),
      ngayKetThuc: getLocalDateFormat(data.ngayKetThuc),
      daHoanThanh: data.daHoanThanh || undefined,
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
          <ControlledDatePicker control={control} name="ngayBatDau" label="Ngày bắt đầu" />
        </Grid>
        <Grid size={6}>
          <ControlledDatePicker control={control} name="ngayKetThuc" label="Ngày kết thúc" />
        </Grid>
        <Grid size={6}>
          <FilterSelect
            control={control}
            name="daHoanThanh"
            label="Đã hoàn thành"
            options={[
              { label: 'Có', value: 'true' },
              { label: 'Không', value: 'false' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
