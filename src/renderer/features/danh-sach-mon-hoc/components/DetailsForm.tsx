import { Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import {
  KhoaSelection,
  KhoiKienThucSelection,
  LoaiMonHocSelection,
  LoaiTietSelection,
  TinhChatMonHocSelection,
  ToBoMonSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';
import { MonHocForm } from '../validation';

export const DetailsForm = () => {
  const { control } = useFormContext<MonHocForm>();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maMonHoc" label="Mã môn học" required />
        <ControlledTextField control={control} name="tenMonHoc" label="Tên môn học" required />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maTuQuan" label="Mã tự quản" />
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng Anh" />
        <ControlledTextField control={control} name="tenVietTat" label="Tên viết tắt" />
      </Stack>
      <Stack direction="row" gap={2}>
        <LoaiMonHocSelection control={control} name="idLoaiMonHoc" required />
        <KhoaSelection control={control} name="idKhoa" required />
        <ToBoMonSelection control={control} name="idToBoMon" />
      </Stack>
      <Stack direction="row" gap={2}>
        <LoaiTietSelection control={control} name="idLoaiTiet" />
        <KhoiKienThucSelection control={control} name="idKhoiKienThuc" />
        <TinhChatMonHocSelection control={control} name="idTinhChatMonHoc" />
      </Stack>
      <Stack>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi chú"
          multiline
          minRows={2}
        />
        <ControlledCheckbox control={control} name="isKhongTinhTBC" label="Không tính TBC" />
      </Stack>
    </Stack>
  );
};
