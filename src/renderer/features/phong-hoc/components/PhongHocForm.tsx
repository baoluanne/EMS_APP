import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import {
  DayNhaSelection,
  MayChieuSelection,
  TinhChatMonHocSelection,
} from '@renderer/components/selections';
import { LoaiPhongSelection } from '@renderer/components/selections/LoaiPhongSelection';
import { useFormContext } from 'react-hook-form';

export const PhongHocForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maPhong" label="Mã phòng" required />
        <ControlledTextField control={control} name="tenPhong" label="Tên phòng" required />
        <DayNhaSelection control={control} name="idDayNha" required />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="soBan" label="Số bản" type="number" />
        <ControlledTextField control={control} name="soChoNgoi" label="Số chỗ ngồi" type="number" />
        <ControlledTextField control={control} name="soChoThi" label="Số chỗ thi" type="number" />
      </Stack>
      <Stack direction="row" gap={2}>
        <LoaiPhongSelection control={control} name="idLoaiPhong" required />
        <TinhChatMonHocSelection control={control} name="idTCMonHoc" />
        <MayChieuSelection control={control} name="isNgungDungMayChieu" />
      </Stack>

      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" multiline minRows={2} />
    </Stack>
  );
};
