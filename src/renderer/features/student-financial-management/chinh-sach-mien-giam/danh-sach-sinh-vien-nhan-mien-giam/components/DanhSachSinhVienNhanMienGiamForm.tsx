import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { NamHocHocKySelection } from '@renderer/components/selections/NamHocHocKySelection';
import { ChinhSachMienGiamSelection } from '@renderer/components/selections/ChinhSachMienGiamSelection';
export const DanhSachSinhVienNhanMienGiamForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <SinhVienSelection control={control} name="sinhVienId" label="Sinh viên" required />
      </Grid>

      <Grid size={12}>
        <NamHocHocKySelection control={control} required name={''} />
      </Grid>
      <Grid size={12}>
        <ChinhSachMienGiamSelection
          control={control}
          name="chinhSachMienGiamId"
          label="Chính sách áp dụng"
          required
          filter={{ trangThai: 'DaDuyet' }}
        />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          name="soTien"
          control={control}
          label="Số tiền miễn giảm (VNĐ)"
          type="number"
          required
          helperText="Có thể chỉnh sửa nếu cần"
        />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          name="lyDo"
          control={control}
          label="Lý do chi tiết"
          multiline
          rows={4}
          required
        />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          name="fileDinhKem"
          control={control}
          label="File chứng minh (PDF, ảnh...)"
          type="file"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};
