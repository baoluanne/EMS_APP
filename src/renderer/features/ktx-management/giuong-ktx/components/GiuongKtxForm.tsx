import { MenuItem, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';

export const GiuongKtxForm = () => {
  const { control, register } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <PhongSelection control={control} name="phongKtxId" label="Phòng" />

      <ControlledTextField
        label="Mã giường"
        control={control}
        name="maGiuong"
        placeholder="VD: 101-G1"
      />

      <ControlledTextField
        label="Trạng thái"
        control={control}
        name="trangThai"
        select
        type="number"
      >
        <MenuItem value={0}>Trống</MenuItem>
        <MenuItem value={1}>Đã có người</MenuItem>
        <MenuItem value={2}>Bảo trì</MenuItem>
      </ControlledTextField>
    </Stack>
  );
};
