import { MenuItem, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

export const GiuongKtxForm = () => {
  const { control, register } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <PhongSelection control={control} name="phongKtxId" label="Thuộc phòng" />

      <ControlledTextField label="Mã giường" control={control} name="maGiuong" helperText="" />

      <ControlledTextField
        label="Trạng thái"
        control={control}
        name="trangThai"
        select
        helperText=""
      >
        <MenuItem value="Trong">Trống</MenuItem>
        <MenuItem value="BaoTri">Bảo trì</MenuItem>
        <MenuItem value="CoSV">Đã có sinh viên</MenuItem>
      </ControlledTextField>

      <ControlledTextField
        label="Ghi chú"
        control={control}
        name="ghiChu"
        multiline
        minRows={3}
        helperText=""
      />
    </Stack>
  );
};
