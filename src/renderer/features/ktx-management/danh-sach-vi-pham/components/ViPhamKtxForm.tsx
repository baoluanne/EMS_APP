import { Stack, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import { SinhVienDangOKtxSelection } from '@renderer/components/selections/ktx/SinhVienDangOKtxSelection';

export const ViPhamKtxForm = () => {
  const { control, watch } = useFormContext();
  const isEditMode = !!watch('id');

  const danhSachLoiViPham = [
    { value: 'Nấu ăn trong phòng', label: 'Nấu ăn trong phòng' },
    { value: 'Sử dụng thiết bị điện công suất lớn', label: 'Sử dụng thiết bị điện công suất lớn' },
    { value: 'Gây mất trật tự sau 23h', label: 'Gây mất trật tự sau 23h' },
    { value: 'Không vệ sinh phòng ở sạch sẽ', label: 'Không vệ sinh phòng ở sạch sẽ' },
    { value: 'Vi phạm giờ giấc (về muộn)', label: 'Vi phạm giờ giấc (về muộn)' },
  ];

  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <SinhVienDangOKtxSelection
            control={control}
            name="sinhVienId"
            label="Sinh viên vi phạm"
            disabled={isEditMode}
          />
        </Grid>
        <Grid size={12}>
          <ControlledSelect
            control={control}
            name="noiDungViPham"
            label="Nội dung vi phạm"
            options={danhSachLoiViPham}
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField control={control} name="hinhThucXuLy" label="Hình thức xử lý" />
        </Grid>
        <Grid size={3}>
          <ControlledTextField control={control} name="diemTru" label="Điểm trừ" type="number" />
        </Grid>
        <Grid size={3}>
          <ControlledTextField
            control={control}
            name="ngayViPham"
            label="Ngày vi phạm"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
