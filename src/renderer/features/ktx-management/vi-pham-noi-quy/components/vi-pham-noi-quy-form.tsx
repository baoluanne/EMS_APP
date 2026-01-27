import { useEffect } from 'react';
import { Grid, Stack, Alert, Typography, Divider } from '@mui/material';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useWatch } from 'react-hook-form';
import { LoaiViPhamConst, LoaiViPhamNoiQuy } from '../validation';
import { SinhVienCuTruSelection } from '@renderer/components/selections/SinhVienCuTruSelection';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';

export const ViPhamNoiQuyForm = () => {
  const { control, register, setValue } = useFormContext();

  const selectedSinhVien = useWatch({ control, name: 'sinhVienId' });
  const selectedLoai = useWatch({ control, name: 'loaiViPham' });

  useEffect(() => {
    if (selectedLoai && LoaiViPhamConst[selectedLoai as LoaiViPhamNoiQuy]) {
      setValue('diemTru', LoaiViPhamConst[selectedLoai as LoaiViPhamNoiQuy].diem);
    }
  }, [selectedLoai, setValue]);

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <input type="hidden" {...register('id')} />

      {selectedSinhVien && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Sinh viên này đang cư trú tại:{' '}
            <strong>{selectedSinhVien?.phongKtx?.maPhong || 'Đang cập nhật...'}</strong>
          </Typography>
          <Typography variant="body2">
            Điểm vi phạm tích lũy học kỳ này:{' '}
            <strong>{selectedSinhVien?.tongDiemViPham ?? 0} điểm</strong>
          </Typography>
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid size={12}>
          <SinhVienCuTruSelection
            control={control}
            name="sinhVienId"
            label="Chọn sinh viên vi phạm (Chỉ hiện SV đang cư trú)"
          />
        </Grid>

        <Grid size={12}>
          <Divider>Thông tin biên bản</Divider>
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
          />
        </Grid>

        <Grid size={6}>
          <ControlledTextField
            label="Mã biên bản"
            control={control}
            name="maBienBan"
            placeholder="Hệ thống tự sinh"
            disabled
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
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
