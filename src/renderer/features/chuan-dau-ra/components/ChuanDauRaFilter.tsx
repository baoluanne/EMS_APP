import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
} from '@renderer/components/selections';
import { ChungChiSelection } from '@renderer/components/selections/ChungChiSelection';
import { LoaiChungChiSelection } from '@renderer/components/selections/LoaiChungChiSelection';
import { useForm } from 'react-hook-form';
import { ChuanDauRaFilterState } from '../types';

export const chuanDauRaDefaultFilters = {
  idCoSo: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idLoaiChungChi: undefined,
  idChungChi: undefined,
};

interface Props {
  onApply: (filters: ChuanDauRaFilterState) => void;
}

export const ChuanDauRaFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<ChuanDauRaFilterState>({
    defaultValues: chuanDauRaDefaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(chuanDauRaDefaultFilters);
  };
  return (
    <FilterDrawerBottom<ChuanDauRaFilterState>
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
      </Grid>
    </FilterDrawerBottom>
  );
};
