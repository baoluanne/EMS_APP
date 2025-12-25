import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { KhoaChuongTrinhKhungFilters } from '../types';

export const khoaChuongTrinhKhungDefaultFilter = {
  idCoSo: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idNganhHoc: undefined,
  idChuyenNganh: undefined,
};

interface Props {
  onApply: (filters: KhoaChuongTrinhKhungFilters) => void;
  onClear: () => void;
}

export const KhoaChuongTrinhKhungFilter = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<KhoaChuongTrinhKhungFilters>({
    defaultValues: khoaChuongTrinhKhungDefaultFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(khoaChuongTrinhKhungDefaultFilter);
    onClear();
  };
  return (
    <FilterDrawerBottom<KhoaChuongTrinhKhungFilters>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSo" />
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
