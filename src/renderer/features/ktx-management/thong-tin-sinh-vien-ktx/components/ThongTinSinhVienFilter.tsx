import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { useForm } from 'react-hook-form';
import type { ThongTinSvKtxFilterState } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/type';
import {
  KtxTrangThaiSvOptions,
  thongTinSvKtxDefaultFilters,
} from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/type';

interface Props {
  onApply: (filters: ThongTinSvKtxFilterState) => void;
  onReset?: () => void;
}

export const ThongTinSvKtxFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<ThongTinSvKtxFilterState>({
    defaultValues: thongTinSvKtxDefaultFilters,
  });

  const { control, reset } = filterMethods;

  const handleClear = () => {
    reset(thongTinSvKtxDefaultFilters);

    onReset?.();

    onApply(thongTinSvKtxDefaultFilters);
  };

  const handleApplyFilter = (data: ThongTinSvKtxFilterState) => {
    const cleanedData: ThongTinSvKtxFilterState = {};

    if (data.maSinhVien?.trim()) cleanedData.maSinhVien = data.maSinhVien.trim();
    if (data.hoTen?.trim()) cleanedData.hoTen = data.hoTen.trim();
    if (data.maPhong?.trim()) cleanedData.maPhong = data.maPhong.trim();
    if (data.maGiuong?.trim()) cleanedData.maGiuong = data.maGiuong.trim();
    if (data.trangThai !== undefined && data.trangThai !== '' && data.trangThai !== null) {
      cleanedData.trangThai = data.trangThai;
    }

    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<ThongTinSvKtxFilterState>
      onApply={handleApplyFilter}
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

        <Grid size={4}>
          <ControlledTextField
            control={control}
            name="maGiuong"
            label="Mã giường"
            placeholder="Tìm theo giường..."
          />
        </Grid>
        <Grid size={4}>
          <FilterSelect
            name="trangThai"
            control={control}
            label="Trạng thái sinh viên"
            options={KtxTrangThaiSvOptions}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
