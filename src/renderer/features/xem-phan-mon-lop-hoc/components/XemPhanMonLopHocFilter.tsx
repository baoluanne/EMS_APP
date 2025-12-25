import { Stack } from '@mui/material';
import {
  ChuyenNganhSelection,
  KhoaHocSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { LopHocSelection } from '@renderer/components/selections/LopHocSelection';
import { FilterComponentProps } from '@renderer/shared/types';
import { XemPhanMonLopHocFilters } from '../types';

interface XemPhanMonLopHocFilterProps extends FilterComponentProps<XemPhanMonLopHocFilters> {}

export const XemPhanMonLopHocFilter = ({ filter, setFilter }: XemPhanMonLopHocFilterProps) => {
  return (
    <Stack gap={2}>
      <KhoaHocSelection
        onChange={(val) => setFilter({ idKhoaHoc: val })}
        value={filter.idKhoaHoc}
      />
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
