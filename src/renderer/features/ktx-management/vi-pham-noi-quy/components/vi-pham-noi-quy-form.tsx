import { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useWatch } from 'react-hook-form';
import { LoaiViPhamConst, LoaiViPhamNoiQuy } from '../validation';
import { SinhVienCuTruSelection } from '@renderer/components/selections/SinhVienCuTruSelection';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';

export const ViPhamNoiQuyForm = () => {
  const { control, register, setValue } = useFormContext();
  const selectedLoai = useWatch({ control, name: 'loaiViPham' });

  // Tự động gán điểm trừ khi chọn loại vi phạm
  useEffect(() => {
    if (selectedLoai && LoaiViPhamConst[selectedLoai as LoaiViPhamNoiQuy]) {
      setValue('diemTru', LoaiViPhamConst[selectedLoai as LoaiViPhamNoiQuy].diem);
    }
  }, [selectedLoai, setValue]);

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <input type="hidden" {...register('id')} />
      <Grid container spacing={2}>
        <Grid size={12}>
          <SinhVienCuTruSelection control={control} name="sinhVienId" label="Sinh viên vi phạm" />
        </Grid>
        <Grid size={12}>
          <ControlledSelect
            label="Loại vi phạm"
            control={control}
            name="loaiViPham"
            options={Object.entries(LoaiViPhamConst).map(([val, item]) => ({
              label: item.label,
              value: Number(val),
            }))}
            helperText={''}
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            label="Mã biên bản (Hệ thống tự sinh)"
            control={control}
            name="maBienBan"
            helperText={''}
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField label="Điểm trừ" control={control} name="diemTru" type="number" />
        </Grid>
        <Grid size={6}>
          <ControlledDatePicker label="Ngày vi phạm" control={control} name="ngayViPham" />
        </Grid>
        <Grid size={6}>
          <ControlledTextField label="Hình thức xử lý" control={control} name="hinhThucXuLy" />
        </Grid>
        <Grid size={12}>
          <ControlledTextField
            label="Nội dung chi tiết"
            control={control}
            name="noiDungViPham"
            multiline
            minRows={3}
            helperText={''}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
