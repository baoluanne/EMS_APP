import { Grid } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { NganhSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const ChuyenNganhForm = () => {
  const { control } = useFormContext();
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid size={6}>
        <ControlledTextField control={control} name="maChuyenNganh" label="Mã chuyên ngành" required />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="tenChuyenNganh" label="Tên chuyên ngành" required />
      </Grid>

      <Grid size={6}>
        <NganhSelection control={control} required name="idNganhHoc" />
      </Grid>

      <Grid size={6}>
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng anh" />
      </Grid>

      <Grid size={4}>
        <ControlledTextField control={control} name="tenVietTat" label="Tên viết tắt" />
      </Grid>

      <Grid size={4}>
        <ControlledTextField control={control} name="stt" label="STT" type="number" />
      </Grid>

      <Grid size={4}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
      </Grid>

      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" multiline minRows={2} />
    </Grid>
  );
};
