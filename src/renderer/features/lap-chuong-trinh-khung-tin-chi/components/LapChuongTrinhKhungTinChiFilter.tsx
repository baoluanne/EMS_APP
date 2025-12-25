import { Grid } from '@mui/material';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { ChuongTrinhKhungTinChi } from '@renderer/features/chuong-trinh-khung-tin-chi/validation';

export const LapChuongTrinhKhungTinChiFilter = () => {
  const { control } = useFormContext<ChuongTrinhKhungTinChi>();
  return (
    <Grid container rowSpacing={2} columnSpacing={4}>
      <Grid size={4}>
        <CoSoSelection control={control} name="idCoSoDaoTao" required />
      </Grid>

      <Grid size={4}>
        <BacDaoTaoSelection control={control} name="idBacDaoTao" required />
      </Grid>

      <Grid size={4}>
        <NganhSelection control={control} name="idNganhHoc" required />
      </Grid>

      <Grid size={4}>
        <KhoaHocSelection control={control} name="idKhoaHoc" required />
      </Grid>

      <Grid size={4}>
        <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" required />
      </Grid>

      <Grid size={4}>
        <ChuyenNganhSelection control={control} name="idChuyenNganh" required />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          type="text"
          placeholder="Điền vào đây"
        />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          control={control}
          label="Ghi chú tiếng Anh"
          placeholder="Điền vào đây"
          type="text"
          name="ghiChuTiengAnh"
        />
      </Grid>
      <Grid size={4}>
        <ControlledCheckbox control={control} name="isBlock" label="Đã khóa" />
      </Grid>
    </Grid>
  );
};
