import Grid from '@mui/material/Grid';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import { LoaiKhoanThuSelection } from '@renderer/components/selections/LoaiKhoanThuSelection';
import { DonViTinhOptions } from '@renderer/shared/enums/donViTinh.enum';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const DanhMucKhoanThuNgoaiHocPhiForm = () => {
  const { control, setValue, getValues } = useFormContext();

  useEffect(() => {
    const donViTinh = getValues('donViTinh');
    if (donViTinh !== undefined && typeof donViTinh === 'number') {
      setValue('donViTinh', DonViTinhOptions[donViTinh].value);
    }
  }, [getValues, setValue]);

  return (
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="maKhoanThu" label="Mã khoản thu" required fullWidth />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          control={control}
          name="tenKhoanThu"
          label="Tên khoản thu" required
          fullWidth
        />
      </Grid>

      {/* Row 2 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          control={control}
          name="soTien"
          label="Số tiền"
          type="number"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledSelect
          control={control}
          name="donViTinh"
          label="Đơn vị tính"
          options={DonViTinhOptions}
        />
      </Grid>

      {/* Row 3 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          control={control}
          name="thueVAT"
          label="Thuế VAT (%)"
          type="number"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <ControlledCheckbox control={control} name="gomThueVAT" label="Gồm VAT" />
      </Grid>

      {/* Row 4 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <LoaiKhoanThuSelection control={control} name="idLoaiKhoanThu" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="stt" label="STT" type="number" fullWidth />
      </Grid>

      {/* Row 5 */}
      <Grid size={{ xs: 12 }}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
