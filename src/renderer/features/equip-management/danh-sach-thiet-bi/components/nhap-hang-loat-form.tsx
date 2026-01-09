import { Grid, TextField } from '@mui/material';
import { LoaiThietBiSelection } from '@renderer/components/selections/equipManagement/LoaiThietBiSelection';
import { NhaCungCapSelection } from '@renderer/components/selections/equipManagement/NhaCungCapFilter';
import { useFormContext, Controller } from 'react-hook-form';

export const NhapHangLoatForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          name="soLuong"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Số lượng" type="number" fullWidth required />
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          name="tenThietBi"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Tên thiết bị (chung)" fullWidth required />
          )}
        />
      </Grid>
      <Grid size={6}>
        <LoaiThietBiSelection
          control={control}
          name="loaiThietBiId"
          label="Loại thiết bị"
          required
        />
      </Grid>
      <Grid size={6}>
        <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />
      </Grid>
      <Grid size={6}>
        <Controller
          name="model"
          control={control}
          render={({ field }) => <TextField {...field} label="Model (chung)" fullWidth />}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          name="thongSoKyThuat"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Thông số kỹ thuật (chung)" fullWidth />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          name="nguyenGia"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Nguyên giá" type="number" fullWidth />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          name="prefixMaThietBi"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Prefix mã thiết bị (tùy chọn)"
              placeholder="Ví dụ: MT-"
              fullWidth
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
