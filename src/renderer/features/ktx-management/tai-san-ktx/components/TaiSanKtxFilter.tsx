import { Grid, MenuItem } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { useForm } from 'react-hook-form';

export interface TaiSanKtxFilterState {
  tenTaiSan?: string;
  tinhTrang?: string;
  phongKtxId?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const taiSanKtxDefaultFilters: TaiSanKtxFilterState = {
  tenTaiSan: undefined,
  tinhTrang: undefined,
  phongKtxId: undefined,
};

interface Props {
  onApply: (filters: TaiSanKtxFilterState) => void;
  onReset: () => void;
}

export const TaiSanKtxFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<TaiSanKtxFilterState>({
    defaultValues: taiSanKtxDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(taiSanKtxDefaultFilters);
    onReset();
  };

  const handleApply = (data: TaiSanKtxFilterState) => {
    const cleanedData: TaiSanKtxFilterState = {
      tenTaiSan: data.tenTaiSan?.trim() ? data.tenTaiSan.trim() : undefined,
      tinhTrang: data.tinhTrang?.trim() ? data.tinhTrang.trim() : undefined,
      phongKtxId: data.phongKtxId?.trim() ? data.phongKtxId.trim() : undefined,
    };

    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<TaiSanKtxFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="tenTaiSan"
            label="Tên tài sản"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={4}>
          <PhongSelection control={control} name="phongKtxId" label="Phòng KTX" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="tinhTrang" label="Tình trạng" select>
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="Tot">Tốt</MenuItem>
            <MenuItem value="BinhThuong">Bình thường</MenuItem>
            <MenuItem value="CanSuaChua">Cần sửa chữa</MenuItem>
            <MenuItem value="Hong">Hỏng</MenuItem>
          </ControlledTextField>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
