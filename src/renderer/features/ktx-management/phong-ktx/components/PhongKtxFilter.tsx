import { Grid, MenuItem } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';

export interface PhongKtxFilterState {
  maPhong?: string;
  toaNhaId?: string;
  trangThai?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const phongKtxDefaultFilters: PhongKtxFilterState = {
  maPhong: undefined,
  toaNhaId: undefined,
  trangThai: undefined,
};

interface Props {
  onApply: (filters: PhongKtxFilterState) => void;
  onReset: () => void;
}

export const PhongKtxFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<PhongKtxFilterState>({
    defaultValues: phongKtxDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(phongKtxDefaultFilters);
    onReset();
  };

  const handleApply = (data: PhongKtxFilterState) => {
    onApply({
      maPhong: data.maPhong?.trim() || undefined,
      toaNhaId: data.toaNhaId || undefined,
      trangThai: data.trangThai || undefined,
    });
  };

  return (
    <FilterDrawerBottom<PhongKtxFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
      title="Bộ lọc Phòng KTX"
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="maPhong"
            label="Mã phòng"
            placeholder="Tìm mã phòng..."
          />
        </Grid>
        <Grid size={4}>
          <ToaNhaSelection control={control} name="toaNhaId" label="Thuộc tòa nhà" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="trangThai" label="Trạng thái" select>
            <MenuItem value="">-- Tất cả --</MenuItem>
            <MenuItem value="HOAT_DONG">Hoạt động</MenuItem>
            <MenuItem value="NGUNG_HOAT_DONG">Ngừng hoạt động</MenuItem>
          </ControlledTextField>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
