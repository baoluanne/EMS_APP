import { Grid, MenuItem } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection'; // Component bạn đã sửa trước đó

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
      maGiuong: data.maGiuong?.trim() ? data.maGiuong.trim() : undefined,
      phongKtxId: data.phongKtxId || undefined, // ID không cần trim
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
            placeholder="Nhập mã giường"
          />
        </Grid>
        <Grid size={4}>
          <PhongSelection control={control} name="phongKtxId" label="Thuộc phòng" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="trangThai"
            label="Trạng thái"
            select
            placeholder="Chọn trạng thái"
          >
            <MenuItem value="">
              <em>-- Tất cả --</em>
            </MenuItem>
            <MenuItem value="TRONG">Trống</MenuItem>
            <MenuItem value="DA_CO_NGUOI">Đã có người</MenuItem>
            <MenuItem value="BAO_TRI">Bảo trì</MenuItem>
            <MenuItem value="NGUNG_HOAT_DONG">Ngừng hoạt động</MenuItem>
          </ControlledTextField>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
