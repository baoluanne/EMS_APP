import { Grid } from '@mui/material';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { FilterComponentProps } from '@renderer/shared/types';
import { TaoKeHoachDaoTaoTinChiFilters } from '../types';
import { DebouncedTextField } from '@renderer/components/fields';

interface TaoKeHoachDaoTaoTinChiFilterProps
  extends FilterComponentProps<TaoKeHoachDaoTaoTinChiFilters> { }

export const TaoKeHoachDaoTaoTinChiFilterForm = ({
  filter,
  setFilter,
}: TaoKeHoachDaoTaoTinChiFilterProps) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid size={4}>
        <CoSoSelection onChange={(val) => setFilter({ idCoSo: val })} value={filter.idCoSo} />
      </Grid>

      <Grid size={4}>
        <KhoaHocSelection
          onChange={(val) => setFilter({ idKhoaHoc: val })}
          value={filter.idKhoaHoc}
        />
      </Grid>

      <Grid size={4}>
        <BacDaoTaoSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Grid>

      <Grid size={4}>
        <LoaiDaoTaoSelection
          onChange={(val) => setFilter({ idLoaiDaoTao: val })}
          value={filter.idLoaiDaoTao}
        />
      </Grid>

      <Grid size={4}>
        <NganhSelection
          onChange={(val) => setFilter({ idNganhHoc: val })}
          value={filter.idNganhHoc}
        />
      </Grid>

      <Grid size={4}>
        <DebouncedTextField label='Học kỳ'
          onChange={(e) =>
            setFilter({
              hocKy: e ? Number(e) : undefined,
            })
          }
        />
      </Grid>
    </Grid>
  );
};
