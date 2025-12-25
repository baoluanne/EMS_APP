import { Grid } from '@mui/material';
import { DebouncedTextField } from '@renderer/components/fields';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  HinhThucThiSelection,
  KhoaChuQuanLopSelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  LoaiLopSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { FilterComponentProps } from '@renderer/shared/types';
import { QuanLyLopHocPhanFilters } from '../types';

interface QuanLyLopHocPhanFilterProps extends FilterComponentProps<QuanLyLopHocPhanFilters> {}

export const QuanLyLopHocPhanFilter = ({ filter, setFilter }: QuanLyLopHocPhanFilterProps) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={4}>
      <Grid size={3}>
        <BacDaoTaoSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Grid>

      <Grid size={3}>
        <KhoaSelection
          onChange={(val) => setFilter({ idKhoaChuQuan: val })}
          value={filter.idKhoaChuQuan}
        />
      </Grid>

      <Grid size={3}>
        <CoSoSelection onChange={(val) => setFilter({ idCoSo: val })} value={filter.idCoSo} />
      </Grid>

      <Grid size={3}>
        <KhoaHocSelection
          onChange={(val) => setFilter({ idKhoaHoc: val })}
          value={filter.idKhoaHoc}
        />
      </Grid>

      <Grid size={3}>
        <BacDaoTaoSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Grid>

      <Grid size={3}>
        <LoaiDaoTaoSelection
          onChange={(val) => setFilter({ idLoaiDaoTao: val })}
          value={filter.idLoaiDaoTao}
        />
      </Grid>

      <Grid size={3}>
        <NganhSelection
          onChange={(val) => setFilter({ idNganhHoc: val })}
          value={filter.idNganhHoc}
        />
      </Grid>

      <Grid size={3}>
        <ChuyenNganhSelection
          onChange={(val) => setFilter({ idTrangThai: val })}
          value={filter.idTrangThai}
        />
      </Grid>

      <Grid size={3}>
        <DebouncedTextField
          label="Lớp dự kiến"
          onChange={(val) => setFilter({ loaiLop: val })}
          initValue={filter.loaiLop}
        />
      </Grid>

      <Grid size={3}>
        <DebouncedTextField
          label="Lớp dự kiến"
          onChange={(val) => setFilter({ lopDuKien: val })}
          initValue={filter.lopDuKien}
        />
      </Grid>

      <Grid size={3}>
        <DebouncedTextField
          label="Môn học/LHP"
          onChange={(val) => setFilter({ monHocLopHocPhan: val })}
          initValue={filter.monHocLopHocPhan}
        />
      </Grid>

      <Grid size={3}>
        <DebouncedTextField
          label="GV dự kiến"
          onChange={(val) => setFilter({ gvDuKien: val })}
          initValue={filter.gvDuKien}
        />
      </Grid>

      <Grid size={3}>
        {/*<TrangThaiSelection*/}
        {/*  onChange={(val) => setFilter({ idTrangThai: val })}*/}
        {/*  value={filter.idTrangThai}*/}
        {/*/>*/}
      </Grid>

      <Grid size={3}>
        <LoaiLopSelection
          onChange={(val) => setFilter({ idChuyenNganh: val })}
          value={filter.idChuyenNganh}
        />
      </Grid>

      <Grid size={3}>
        <HinhThucThiSelection
          onChange={(val) => setFilter({ idHinhThucThi: val })}
          value={filter.idHinhThucThi}
        />
      </Grid>

      <Grid size={3}>
        <KhoaChuQuanLopSelection
          onChange={(val) => setFilter({ idKhoaChuQuanLop: val })}
          value={filter.idKhoaChuQuanLop}
        />
      </Grid>
    </Grid>
  );
};
