import { Grid } from '@mui/material';
import { DebouncedTextField } from '@renderer/components/fields';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { FilterComponentProps } from '@renderer/shared/types';
import { ChuongTrinhKhungTinChiFilters } from '../types';

interface ChuongTrinhKhungTinChiFilterProps
  extends FilterComponentProps<ChuongTrinhKhungTinChiFilters> {}

export const ChuongTrinhKhungTinChiFilter = ({
  filter,
  setFilter,
}: ChuongTrinhKhungTinChiFilterProps) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={4}>
      <Grid size={4}>
        <CoSoSelection onChange={(val) => setFilter({ idCoSo: val })} value={filter.idCoSo} />
      </Grid>

      <Grid size={4}>
        <BacDaoTaoSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Grid>

      <Grid size={4}>
        <NganhSelection
          onChange={(val) => setFilter({ idNganhHoc: val })}
          value={filter.idNganhHoc}
        />
      </Grid>

      <Grid size={4}>
        <KhoaHocSelection
          onChange={(val) => setFilter({ idKhoaHoc: val })}
          value={filter.idKhoaHoc}
        />
      </Grid>

      <Grid size={4}>
        <LoaiDaoTaoSelection
          onChange={(val) => setFilter({ idLoaiDaoTao: val })}
          value={filter.idLoaiDaoTao}
        />
      </Grid>

      <Grid size={4}>
        <ChuyenNganhSelection
          onChange={(val) => setFilter({ idChuyenNganh: val })}
          value={filter.idChuyenNganh}
        />
      </Grid>

      <Grid size={12}>
        <DebouncedTextField
          label="Ghi chú"
          onChange={(val) => setFilter({ ghiChu: val })}
          placeholder="Điền vào đây"
        />
      </Grid>

      <Grid size={12}>
        <DebouncedTextField
          label="Ghi chú tiếng Anh"
          onChange={(val) => setFilter({ ghiChuTiengAnh: val })}
          placeholder="Điền vào đây"
        />
      </Grid>
    </Grid>
  );
};
