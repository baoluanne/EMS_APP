import { Grid, TextField } from '@mui/material';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { FilterComponentProps } from '@renderer/shared/types';
import { TaoKeHoachDaoTaoNienCheFilters } from '../types';

interface TaoKeHoachDaoTaoNienCheFilterProps
  extends FilterComponentProps<TaoKeHoachDaoTaoNienCheFilters> {}

export const TaoKeHoachDaoTaoNienCheFilterForm = ({
  filter,
  setFilter,
}: TaoKeHoachDaoTaoNienCheFilterProps) => {
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
        <TextField
          label="Học Kỳ"
          value={filter.hocKy ?? ''}
          fullWidth
          size="small"
          onChange={(e) =>
            setFilter({
              hocKy: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          variant="outlined"
          sx={{
            flex: 1,
            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
              padding: '0 !important',
              margin: '0 !important',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
