import { Grid } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import {
  BacDaoTaoSelection,
  HinhThucThiSelection,
  LoaiHinhGiangDaySelection,
  LoaiTietSelection,
  MonHocSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';
import { MonHocBacDaoTaoForm } from '../validations';

export const MonHocBacDaoTaoDetailsForm = () => {
  const { control } = useFormContext<MonHocBacDaoTaoForm>();

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <ControlledTextField control={control} name="soTinChi" label="Số tín chỉ" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField control={control} name="dvhT_TC" label="ĐVHT TC" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField control={control} name="dvhT_HP" label="ĐVHT HP" type="number" />
      </Grid>

      <Grid size={4}>
        <ControlledTextField control={control} name="dvhT_Le" label="ĐVHT Lẻ" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField
          control={control}
          name="soTietLyThuyet"
          label="Số tiết lý thuyết"
          type="number"
        />
      </Grid>
      <Grid size={4}>
        <ControlledTextField
          control={control}
          name="soTietThucHanh"
          label="Số tiết thực hành"
          type="number"
        />
      </Grid>

      <Grid size={4}>
        <ControlledTextField control={control} name="lyThuyet" label="Lý thuyết" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField control={control} name="thucHanh" label="Thực hành" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField control={control} name="tuHoc" label="Tự học" type="number" />
      </Grid>

      <Grid size={4}>
        <ControlledTextField control={control} name="moRong" label="Mở rộng" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField control={control} name="soTietLTT" label="Số tiết LTT" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField
          control={control}
          name="soTietTHBT"
          label="Số tiết THBT"
          type="number"
        />
      </Grid>

      <Grid size={4}>
        <ControlledTextField
          control={control}
          name="soTietTuHoc"
          label="Số tiết tự học"
          type="number"
        />
      </Grid>
      <Grid size={4}>
        <ControlledTextField
          control={control}
          name="soGioThucTap"
          label="Số giờ thực tập"
          type="number"
        />
      </Grid>
      <Grid size={4}>
        <ControlledTextField
          control={control}
          name="soGioDoAnBTLon"
          label="Số giờ ĐA/Bài tập lớn"
          type="number"
        />
      </Grid>

      <Grid size={4}>
        <ControlledTextField control={control} name="soTietKT" label="Số tiết KT" type="number" />
      </Grid>
      <Grid size={4}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Grid>

      <Grid size={6}>
        <BacDaoTaoSelection control={control} name="idBacDaoTao" />
      </Grid>
      <Grid size={6}>
        <MonHocSelection control={control} name="idMonHoc" />
      </Grid>

      <Grid size={4}>
        <HinhThucThiSelection control={control} name="idHinhThucThi" />
      </Grid>
      <Grid size={4}>
        <LoaiHinhGiangDaySelection control={control} name="idLoaiHinhGiangDay" />
      </Grid>
      <Grid size={4}>
        <LoaiTietSelection control={control} name="idLoaiTiet" />
      </Grid>

      <Grid size={4}>
        <ControlledCheckbox control={control} name="isLyThuyet" label="Môn học lý thuyết" />
      </Grid>
      <Grid size={4}>
        <ControlledCheckbox
          control={control}
          name="isKhongTinhDiemTBC"
          label="Không tính điểm TBC"
        />
      </Grid>
    </Grid>
  );
};
