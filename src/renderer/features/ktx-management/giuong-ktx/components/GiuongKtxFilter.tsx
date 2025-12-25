import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
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

const trangThaiOptions = [
  { value: '', label: '-- Tất cả --' },
  { value: 'Trong', label: 'Trống' },
  { value: 'CoSinhVien', label: 'Có sinh viên' },
  { value: 'BaoTri', label: 'Bảo trì' },
];

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
      phongId: data.phongId?.trim() ? data.phongId.trim() : undefined,
      trangThai: data.trangThai?.trim() ? data.trangThai.trim() : undefined,
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
        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledTextField
            control={control}
            name="maGiuong"
            label="Mã giường"
            placeholder="Nhập mã giường..."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <PhongSelection control={control} name="phongId" label="Phòng" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledSelect
            control={control}
            name="trangThai"
            label="Trạng thái"
            options={trangThaiOptions}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
