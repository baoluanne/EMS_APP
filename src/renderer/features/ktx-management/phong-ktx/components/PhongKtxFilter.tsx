import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
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

const trangThaiOptions = [
  { value: '', label: '-- Tất cả --' },
  { value: 'HOAT_DONG', label: 'Hoạt động' },
  { value: 'NGUNG_HOAT_DONG', label: 'Ngừng hoạt động' },
];

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
    const cleanedData: PhongKtxFilterState = {
      maPhong: data.maPhong?.trim() ? data.maPhong.trim() : undefined,
      toaNhaId: data.toaNhaId?.trim() ? data.toaNhaId.trim() : undefined,
      trangThai: data.trangThai?.trim() ? data.trangThai.trim() : undefined,
    };

    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<PhongKtxFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledTextField
            control={control}
            name="maPhong"
            label="Mã phòng"
            placeholder="Nhập mã phòng..."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà" />
        </Grid>

        <Grid size={{ xs: 12 }}>
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
