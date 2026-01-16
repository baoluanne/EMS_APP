import { Grid, MenuItem } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

export interface GiuongKtxFilterState {
  maGiuong?: string;
  phongId?: string;
  trangThai?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const giuongKtxDefaultFilters: GiuongKtxFilterState = {
  maGiuong: undefined,
  phongId: undefined,
  trangThai: undefined,
};

interface Props {
  onApply: (filters: GiuongKtxFilterState) => void;
  onReset: () => void;
}

export const GiuongKtxFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<GiuongKtxFilterState>({
    defaultValues: giuongKtxDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(giuongKtxDefaultFilters);
    onReset();
  };

  const handleApply = (data: GiuongKtxFilterState) => {
    const cleanedData: GiuongKtxFilterState = {
      maGiuong: data.maGiuong?.trim() || undefined,
      phongId: data.phongId || undefined,
      trangThai: data.trangThai || undefined,
    };
    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<GiuongKtxFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="maGiuong"
            label="Mã giường"
            placeholder="Nhập mã giường..."
          />
        </Grid>
        <Grid size={4}>
          <PhongSelection control={control} name="phongId" label="Phòng" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="trangThai" label="Trạng thái" select>
            <MenuItem value="">-- Tất cả --</MenuItem>
            <MenuItem value="0">Trống</MenuItem>
            <MenuItem value="1">Đã có người</MenuItem>
            <MenuItem value="2">Bảo trì</MenuItem>
          </ControlledTextField>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
