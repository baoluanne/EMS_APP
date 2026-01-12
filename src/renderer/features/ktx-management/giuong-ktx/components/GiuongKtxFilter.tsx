import { Grid, MenuItem } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

export interface GiuongKtxFilterState {
  maGiuong?: string;
  phongKtxId?: string;
  trangThai?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const giuongKtxDefaultFilters: GiuongKtxFilterState = {
  maGiuong: undefined,
  phongKtxId: undefined,
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
      phongKtxId: data.phongKtxId || undefined,
      trangThai: data.trangThai || undefined,
    };
    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<GiuongKtxFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
      title="Bộ lọc Giường KTX"
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="maGiuong"
            label="Mã giường"
            placeholder="Nhập mã giường..."
          />
        </Grid>
        <Grid size={6}>
          <PhongSelection control={control} name="phongKtxId" label="Thuộc phòng" />
        </Grid>
        <Grid size={6}>
          <ControlledTextField control={control} name="trangThai" label="Trạng thái" select>
            <MenuItem value="">-- Tất cả --</MenuItem>
            <MenuItem value="Trong">Trống</MenuItem>
            <MenuItem value="CoSV">Đã có người</MenuItem>
            <MenuItem value="BaoTri">Bảo trì</MenuItem>
          </ControlledTextField>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
