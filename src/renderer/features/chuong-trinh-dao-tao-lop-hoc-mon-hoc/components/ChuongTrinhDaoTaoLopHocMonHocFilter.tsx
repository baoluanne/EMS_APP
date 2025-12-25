import { Stack } from '@mui/material';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  KhoaHocSelection,
  KhoaSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { LopHocSelection } from '@renderer/components/selections/LopHocSelection';
import { FilterComponentProps } from '@renderer/shared/types';
import { ChuongTrinhDaoTaoLopHocMonHocFilters } from '../types';

interface ChuongTrinhDaoTaoLopHocMonHocFilter
  extends FilterComponentProps<ChuongTrinhDaoTaoLopHocMonHocFilters> {}

export const ChuongTrinhDaoTaoLopHocMonHocFilter = ({
  filter,
  setFilter,
}: ChuongTrinhDaoTaoLopHocMonHocFilter) => {
  return (
    <Stack spacing={2} direction="row" flexWrap="wrap">
      <KhoaHocSelection
        onChange={(val) => setFilter({ idKhoaHoc: val })}
        value={filter.idKhoaHoc}
      />
      <BacDaoTaoSelection
        onChange={(val) => setFilter({ idBacDaoTao: val })}
        value={filter.idBacDaoTao}
      />
      <KhoaSelection onChange={(val) => setFilter({ idKhoa: val })} value={filter.idKhoa} />
      <NganhSelection
        onChange={(val) => setFilter({ idNganhHoc: val })}
        value={filter.idNganhHoc}
      />
      <ChuyenNganhSelection
        onChange={(val) => setFilter({ idChuyenNganh: val })}
        value={filter.idChuyenNganh}
      />
      <LopHocSelection name="idLopHoc" onChange={(val) => setFilter({ idLopHoc: val })} value={filter.idLopHoc} />
    </Stack>
  );
};
