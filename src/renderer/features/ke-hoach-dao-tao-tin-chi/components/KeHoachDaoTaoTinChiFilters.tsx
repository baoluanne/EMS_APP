import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  HocKySelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { IKeHoachDaoTaoTinChiFilters } from '../types';
import { keHoachDaoTaoTinChiDefaultFilters } from '../configs/filter.config';

type Props = {
  onApply: (filters: IKeHoachDaoTaoTinChiFilters) => void;
  onClear: () => void;
};

export const KeHoachDaoTaoTinChiFilters = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<IKeHoachDaoTaoTinChiFilters>({
    defaultValues: keHoachDaoTaoTinChiDefaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(keHoachDaoTaoTinChiDefaultFilters);
    onClear();
  };
  return (
    <FilterDrawerBottom<IKeHoachDaoTaoTinChiFilters>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <HocKySelection control={control} name="idHocKy" />
        </Grid>

        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSoDaoTao" />
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
          <NganhSelection control={control} name="idNganhHoc" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
