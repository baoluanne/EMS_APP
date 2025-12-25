import { Grid } from '@mui/material';
import { DebouncedTextField } from '@renderer/components/fields';
import {
  KhoaSelection,
  LoaiMonHocSelection,
  LoaiTietHocSelection,
} from '@renderer/components/selections';
import { FilterComponentProps } from '@renderer/shared/types';
import React, { useCallback } from 'react';
import { AddMonHocBacDaoTaoFilter } from '../types';

interface AddMonHocBacDaoTaoFilterProps extends FilterComponentProps<AddMonHocBacDaoTaoFilter> {}

export const AddMonHocBacDaoTaoFilters: React.FC<AddMonHocBacDaoTaoFilterProps> = ({
  filter,
  setFilter,
}) => {
  const handleChangeMonHoc = useCallback(
    (val: string) => {
      if (val !== filter.monHoc) {
        setFilter({ monHoc: val });
      }
    },
    [filter.monHoc, setFilter],
  );

  const handleChangeMaTuQuan = useCallback(
    (val: string) => {
      if (val !== filter.maTuQuan) {
        setFilter({ monHoc: val });
      }
    },
    [filter.maTuQuan, setFilter],
  );
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <KhoaSelection
          onChange={(val) => setFilter({ idKhoaChuQuan: val })}
          value={filter.idKhoaChuQuan ?? ''}
        />
      </Grid>
      <Grid size={6}>
        <LoaiMonHocSelection
          onChange={(val) => setFilter({ idLoaiMonHoc: val })}
          value={filter.idLoaiMonHoc ?? ''}
        />
      </Grid>

      <Grid size={12}>
        <DebouncedTextField label="Môn học" onChange={handleChangeMonHoc} />
      </Grid>

      <Grid size={6}>
        <DebouncedTextField label="Mã tự quản" onChange={handleChangeMaTuQuan} />
      </Grid>

      <Grid size={6}>
        <LoaiTietHocSelection
          onChange={(val) => setFilter({ idLoaiTietHoc: val })}
          value={filter.idLoaiTietHoc ?? ''}
        />
      </Grid>
    </Grid>
  );
};
