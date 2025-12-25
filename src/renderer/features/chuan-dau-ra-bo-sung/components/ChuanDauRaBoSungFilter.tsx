import { Grid } from '@mui/material';
import { ChuanDauRaBoSungFilterState } from '../types';
import { FilterComponentProps } from '@renderer/shared/types';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  TenNganhSelection,
} from '@renderer/components/selections';

interface ChuanDauRaBoSungFilterProps extends FilterComponentProps<ChuanDauRaBoSungFilterState> {}

export const ChuanDauRaBoSungFilter = ({ filter, setFilter }: ChuanDauRaBoSungFilterProps) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={4} alignItems="center">
      <Grid size={4}>
        <CoSoSelection
          onChange={(val) => setFilter({ ...filter, idCoSo: val })}
          value={filter.idCoSo}
        />
      </Grid>
      <Grid size={4}>
        <BacDaoTaoSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Grid>
      <Grid size={4}>
        <TenNganhSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Grid>
      <Grid size={4}>
        <KhoaHocSelection
          onChange={(val) => setFilter({ ...filter, idKhoaHoc: val })}
          value={filter.idKhoaHoc}
        />
      </Grid>
      <Grid size={4}>
        <LoaiDaoTaoSelection
          onChange={(val) => setFilter({ ...filter, idLoaiDaoTao: val })}
          value={filter.idLoaiDaoTao}
        />
      </Grid>
    </Grid>
  );
};
