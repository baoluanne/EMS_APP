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
import { PhanChuyenNganhFilterState } from '../types';

export const defaultFilters = {
  idCoSo: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idNganh: undefined,
  idChuyenNganh: undefined,
};

interface Props {
  onApply: (filters: PhanChuyenNganhFilterState) => void;
}

export const PhanChuyenNganhFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<PhanChuyenNganhFilterState>({
    defaultValues: defaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultFilters);
  };
  return (
    <FilterDrawerBottom<PhanChuyenNganhFilterState>
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
          <ChuyenNganhSelection control={control} name="idChuyenNganh" labelWidth={135} />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
