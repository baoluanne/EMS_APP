import { Grid } from '@mui/material';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { ChuongTrinhKhungTinChiFilters, defaultChuongTrinhKhungTinChiFilters } from '../types';
import { useForm } from 'react-hook-form';
import { FilterDrawerBottom } from '@renderer/components/modals';

interface Props {
  onApply: (filters: ChuongTrinhKhungTinChiFilters) => void;
  onClear?: () => void;
}
export const QuanLyChuongTrinhKhungTinChiFilter = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<ChuongTrinhKhungTinChiFilters>({
    defaultValues: defaultChuongTrinhKhungTinChiFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultChuongTrinhKhungTinChiFilters);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<ChuongTrinhKhungTinChiFilters>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container rowSpacing={2} columnSpacing={4}>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSoDaoTao" />
        </Grid>

        <Grid size={4}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>

        <Grid size={4}>
          <NganhSelection control={control} name="idNganhHoc" />
        </Grid>

        <Grid size={4}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>

        <Grid size={4}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>

        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
