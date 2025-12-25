import { Stack } from '@mui/material';
import {
  ControlledCheckbox,
  ControlledMultipleTextField,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import {
  KieuLamTronSelection,
  KieuMonHocSelection,
  QuyCheSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const QuyUocForm = () => {
  const { control } = useFormContext();

  return (
    <Stack sx={{ overflow: 'auto' }} py={1} gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="tenQuyUoc" label="Quy ước" required />
        <QuyCheSelection control={control} name="idQuyChe_NienChe" required />
        <KieuMonHocSelection control={control} name="idKieuMon" required />
        <KieuLamTronSelection control={control} name="idKieuLamTron" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="chuyenCan" label="Chuyên cần" />
        <ControlledTextField control={control} name="heSoTH" label="Thực hành" />
        <ControlledTextField control={control} name="heSoTBTK" label="Hệ số TBTK" />
        <ControlledTextField control={control} name="heSoCK" label="HS CK" />
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
      <Stack>
        <Stack direction="row">
          <ControlledCheckbox control={control} name="isChiDiemCuoiKy" label="Chỉ điểm cuối kỳ" />
          <ControlledCheckbox control={control} name="isChiDanhGia" label="Chỉ đánh giá" />
          <ControlledCheckbox control={control} name="isSuDung" label="Sử dụng" />
          <ControlledCheckbox
            control={control}
            name="isApDungQuyCheNghe"
            label="Áp dụng quy chế nghề"
          />
          <ControlledCheckbox control={control} name="isApDungQuyCheMonVH" label="Áp dụng môn VH" />
        </Stack>
        <Stack direction="row">
          <ControlledCheckbox control={control} name="isKhongTinhTBC" label="Không tính TBC" />
          <ControlledCheckbox
            control={control}
            name="heSoTheoLTTH_TC"
            label="Hệ số LT/TH theo tín chỉ"
          />
          <ControlledCheckbox control={control} name="heSoTheoDVHT" label="Hệ số theo ĐVHT" />
          <ControlledCheckbox control={control} name="isXetDuThiGK" label="Xét dự thi GK" />
          <ControlledCheckbox
            control={control}
            name="isKhongApDungHSCD"
            label="Không áp dụng HS cột điểm"
          />
        </Stack>
      </Stack>

      <Stack direction="row">
        <ControlledTextField control={control} name="diemTBC" label="TBC" sx={{ width: 1 / 4 }} />
      </Stack>
    </Stack>
  );
};
