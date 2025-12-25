import { Grid, Stack } from '@mui/material';
import { DebouncedTextField, FilterSelect } from '@renderer/components/fields';
import { BacDaoTaoSelection, KhoaSelection } from '@renderer/components/selections';
import { FilterComponentProps } from '@renderer/shared/types';
import { QuanLyQuyUocCachTinhDiemMonHocFilters } from '../types';

interface QuanLyQuyUocCachTinhDiemMonHocFilterProps
  extends FilterComponentProps<QuanLyQuyUocCachTinhDiemMonHocFilters> {}

export const QuanLyQuyUocCachTinhDiemMonHocFilter = ({
  filter,
  setFilter,
}: QuanLyQuyUocCachTinhDiemMonHocFilterProps) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid size={3}>
        <BacDaoTaoSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Grid>

      <Grid size={3}>
        <KhoaSelection onChange={(val) => setFilter({ idKhoa: val })} value={filter.idKhoa} />
      </Grid>
      <Grid size={3}>
        <DebouncedTextField label="Môn học" onChange={(val) => setFilter({ tenMonHoc: val })} />
      </Grid>

      <Grid size={3}>
        <Stack flex={1}>
          <FilterSelect
            label="Loại môn"
            options={[
              { label: 'Lý thuyết', value: 'true' },
              { label: 'Thực hành', value: 'false' },
            ]}
            onChange={(val) => setFilter({ isLyThuyet: val.target.value })}
            value={filter.isLyThuyet}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
