import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChungChiSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiChungChiSelection,
  LoaiDaoTaoSelection,
} from '@renderer/components/selections';
import { chuanDauRaDefaultFilters } from '@renderer/features/chuan-dau-ra/components';
import { ChuanDauRaFilterState } from '@renderer/features/chuan-dau-ra/types';
import { useForm } from 'react-hook-form';
import { ChuanDauRaBoSungFilterState } from '../types';

export const chuanDauRaBoSungDefaultFilters = {
  ...chuanDauRaDefaultFilters,
  idChuyenNganh: undefined,
};

interface Props {
  onApply: (filters: ChuanDauRaFilterState) => void;
}

export const ChuanDauRaBoSungFilterDetail = ({ onApply }: Props) => {
  const filterMethods = useForm<ChuanDauRaBoSungFilterState>({
    defaultValues: chuanDauRaBoSungDefaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(chuanDauRaBoSungDefaultFilters);
  };
  return (
    <FilterDrawerBottom<ChuanDauRaBoSungFilterState>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSo" />
        </Grid>
        <Grid size={4}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>
        <Grid size={4}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={4}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={4}>
          <LoaiChungChiSelection control={control} name="idLoaiChungChi" />
        </Grid>
        <Grid size={4}>
          <ChungChiSelection control={control} name="idChungChi" />
        </Grid>
        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
