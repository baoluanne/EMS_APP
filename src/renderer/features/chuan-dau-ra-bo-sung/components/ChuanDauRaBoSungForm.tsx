import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import {
  BacDaoTaoSelection,
  ChungChiSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiChungChiSelection,
  LoaiDaoTaoSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const ChuanDauRaBoSungForm = () => {
  const { control } = useFormContext();
  return (
    <Grid container rowSpacing={1} columnSpacing={4}>
      <Grid size={4}>
        <CoSoSelection control={control} name="idCoSoDaoTao" labelWidth={135} required />
      </Grid>
      <Grid size={4}>
        <KhoaHocSelection control={control} name="idKhoaHoc" labelWidth={135} required />
      </Grid>
      <Grid size={4}>
        <BacDaoTaoSelection control={control} name="idBacDaoTao" labelWidth={135} required />
      </Grid>
      <Grid size={4}>
        <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" labelWidth={135} required />
      </Grid>
      <Grid size={4}>
        <ChuyenNganhSelection control={control} name="idChuyenNganh" labelWidth={135} required />
      </Grid>
      <Grid size={4}>
        <LoaiChungChiSelection control={control} name="idLoaiChungChi" labelWidth={135} required />
      </Grid>
      <Grid size={4}>
        <ChungChiSelection control={control} name="idChungChi" labelWidth={135} required />
      </Grid>
      <Grid size={12}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          labelWidth={90}
          multiline
          minRows={2}
        />
      </Grid>
    </Grid>
  );
};
