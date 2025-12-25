import { Stack } from '@mui/material';
import {
  ControlledCheckbox,
  ControlledMultipleTextField,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import {
  KieuLamTronSelection,
  KieuMonHocSelection,
  QuyCheTinChiSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const QuyUocForm = () => {
  const { control } = useFormContext();

  return (
    <Stack sx={{ overflow: 'auto' }} py={1} gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="tenQuyUoc" label="Quy ước" required />
        <QuyCheTinChiSelection control={control} name="idQuyChe_TinChi" required />
        <KieuMonHocSelection control={control} name="idKieuMon" required />
        <KieuLamTronSelection control={control} name="idKieuLamTron" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="chuyenCan" label="Chuyên cần" />
        <ControlledTextField
          control={control}
          name="tieuLuan_BTL"
          label="Tiểu luận/Bài tiểu luận"
        />
        <ControlledTextField control={control} name="soCotDiemTH" label="Số cột điểm TH" />
        <ControlledTextField control={control} name="cuoiKy" label="Cuối kỳ" />
      </Stack>
      <Stack>
        <ControlledMultipleTextField
          control={control}
          name="thuongXuyen"
          label="Thường xuyên"
          numberOfFields={5}
          type="number"
        />
      </Stack>
      <Stack direction="row">
        <ControlledCheckbox control={control} name="isKhongTinhTBC" label="Không tính TBC" />
        <ControlledCheckbox control={control} name="isChiDiemCuoiKy" label="Chỉ điểm cuối kỳ" />
        <ControlledCheckbox control={control} name="isChiDanhGia" label="Chỉ đánh giá" />
        <ControlledCheckbox control={control} name="isSuDung" label="Sử dụng" />
        <ControlledCheckbox control={control} name="isHSLTTH_TC" label="Hệ số LT/TH theo tín chỉ" />
        <ControlledCheckbox
          control={control}
          name="isDiemRangBuocCK"
          label="Ràng buộc điểm cuối kỳ"
        />
      </Stack>
      <Stack direction="row">
        <ControlledTextField control={control} name="diemTBC" label="TBC" sx={{ width: 1 / 4 }} />
      </Stack>
    </Stack>
  );
};
