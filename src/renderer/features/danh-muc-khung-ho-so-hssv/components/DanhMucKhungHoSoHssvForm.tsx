import { Stack } from '@mui/material';
import { ControlledTextField, ControlledCheckbox } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import {
  BacDaoTaoSelection,
  LoaiDaoTaoSelection,
  KhoaHocSelection,
  LoaiSinhVienSelection,
  TieuChiTuyenSinhSelection,
  HoSoHssvSelection,
} from '@renderer/components/selections';

export const DanhMucKhungHoSoHssvForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <BacDaoTaoSelection control={control} name="idBacDaoTao" required />
        <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" required />
      </Stack>
      <Stack direction="row" gap={2}>
        <LoaiSinhVienSelection control={control} name="idLoaiSinhVien" />
        <ControlledCheckbox control={control} name="isBatBuoc" label="Bắt buộc" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="stt" label="Số thứ tự" type="number" />
        <HoSoHssvSelection control={control} name="idHoSoHSSV" required />
      </Stack>
      <Stack direction="row" gap={2}>
        <TieuChiTuyenSinhSelection control={control} name="idTieuChiTuyenSinh" />
        <KhoaHocSelection control={control} name="idKhoaHoc" />
      </Stack>
      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
    </Stack>
  );
};
