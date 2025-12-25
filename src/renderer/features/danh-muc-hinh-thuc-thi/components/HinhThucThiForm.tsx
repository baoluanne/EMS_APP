import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { DanhMucBieuMauSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const HinhThucThiForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          name="maHinhThucThi"
          label="Mã hình thức thi"
          required
        />
        <ControlledTextField
          control={control}
          name="tenHinhThucThi"
          label="Tên hình thức thi"
          required
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="soGiangVien" label="Số giảng viên" />
        <ControlledTextField control={control} name="heSoChamThi" label="Hệ số chấm thi" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="stt" label="Số thứ tự" />
        <DanhMucBieuMauSelection control={control} name="idBieuMauDanhSachDuThi" required />
      </Stack>
      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
    </Stack>
  );
};
