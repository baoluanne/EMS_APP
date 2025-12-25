import { Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { NhomLoaiHanhViPropsSelection } from '@renderer/components/selections';
import { LoaiHanhViViPham } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

export const QuyCheRenLuyenPhanLoaiViPhamForm = () => {
  const { control } = useFormContext<LoaiHanhViViPham>();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="stt" label="Số thứ tự" />
        <ControlledTextField control={control} name="maLoaiHanhVi" label="Mã loại hành vi" required />
        <ControlledTextField control={control} name="tenLoaiHanhVi" label="Tên loại hành vi" required />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="diemTruToiDa"
          type="number"
          label="Điểm Trừ Tối Đa"
        />
        <NhomLoaiHanhViPropsSelection control={control} name="idNhomLoaiHanhVi" />
        <Stack flex={1} />
      </Stack>

      <Stack>
        <ControlledTextField control={control} name="ghiChu" label="Ghi Chú" />
        <ControlledCheckbox control={control} name="isDiemTruCaoNhat" label="Điểm trừ cao nhất" />
      </Stack>
    </Stack>
  );
};
