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
import { keHoachDaoTaoNienCheDefaultFilters } from '../configs';
import { IKeHoachDaoTaoNienCheFilters } from '../types';

type Props = {
  onApply: (filters: IKeHoachDaoTaoNienCheFilters) => void;
  onClear: () => void;
};

export const KeHoachDaoTaoNienCheFilters = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<IKeHoachDaoTaoNienCheFilters>({
    defaultValues: keHoachDaoTaoNienCheDefaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(keHoachDaoTaoNienCheDefaultFilters);
    onClear();
  };
  return (
    <FilterDrawerBottom<IKeHoachDaoTaoNienCheFilters>
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

        {/* <Grid size={4}>
          <ControlledTextField control={control} name="hocKy" label="Học Kỳ" />
        </Grid> */}
      </Grid>
    </FilterDrawerBottom>
  );
};
