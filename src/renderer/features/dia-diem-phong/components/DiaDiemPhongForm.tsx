import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { CoSoSelection } from '@renderer/components/selections';
import { DiaDiemPhong } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

export const DiaDiemPhongForm = () => {
  const { control } = useFormContext<DiaDiemPhong>();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maDDPhong" label="Mã nhóm ĐĐ phòng" required />
        <ControlledTextField control={control} name="tenNhomDDPhong" label="Tên nhóm ĐĐ phòng" required />
        <CoSoSelection control={control} name="idCoSoDaoTao" required />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="diaChi" label="Địa chỉ" required />
        <ControlledTextField control={control} name="diaDiem" label="Địa điểm" required />
        <ControlledTextField control={control} name="banKinh" label="Bán kính (km)" type="number" />
      </Stack>

      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" multiline minRows={2} />
    </Stack>
  );
};
