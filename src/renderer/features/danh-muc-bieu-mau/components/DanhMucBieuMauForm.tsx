import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import { KhoaSelection, LoaiFileSelection } from '@renderer/components/selections';

export const DanhMucBieuMauForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maBieuMau" label="Mã biểu mẫu" required />
        <ControlledTextField control={control} name="tenBieuMau" label="Tên biểu mẫu" required />
      </Stack>

      <Stack direction="row" gap={2}>
        <LoaiFileSelection control={control} name="loaiFile" required />
        <KhoaSelection control={control} name="idKhoaQuanLy" label="Khoa quản lý" required />
      </Stack>

      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" fullWidth />
    </Stack>
  );
};
