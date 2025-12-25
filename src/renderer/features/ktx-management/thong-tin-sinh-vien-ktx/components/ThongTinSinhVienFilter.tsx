import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';

export interface ThongTinSvKtxFilterState {
  maSinhVien?: string;
  hoTen?: string;
  maPhong?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const thongTinSvKtxDefaultFilters: ThongTinSvKtxFilterState = {
  maSinhVien: undefined,
  hoTen: undefined,
  maPhong: undefined,
};

interface Props {
  onApply: (filters: ThongTinSvKtxFilterState) => void;
}

export const ThongTinSvKtxFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<ThongTinSvKtxFilterState>({
    defaultValues: thongTinSvKtxDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(thongTinSvKtxDefaultFilters);
    onApply(thongTinSvKtxDefaultFilters);
  };

  const handleApply = (data: ThongTinSvKtxFilterState) => {
    const cleanedData: ThongTinSvKtxFilterState = {};
    if (data.maSinhVien?.trim()) cleanedData.maSinhVien = data.maSinhVien.trim();
    if (data.hoTen?.trim()) cleanedData.hoTen = data.hoTen.trim();
    if (data.maPhong?.trim()) cleanedData.maPhong = data.maPhong.trim();
    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<ThongTinSvKtxFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="maSinhVien"
            label="Mã sinh viên"
            placeholder="Tìm theo mã..."
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="hoTen"
            label="Họ tên"
            placeholder="Tìm theo tên..."
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="maPhong"
            label="Mã phòng"
            placeholder="Tìm theo phòng..."
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
