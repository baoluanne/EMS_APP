import { Stack } from '@mui/material';
import {
  ControlledCheckbox,
  ControlledDoubleTextField,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import { MucDoSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const DieuKienXetThoiHocForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2.5}>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          label="Điểm thôi học mỗi HK"
          name="dktH_DiemThoiHocMoiHK"
          type="number"
        />
        <ControlledTextField
          control={control}
          label="Số học kỳ liên tiếp"
          name="dktH_HKLienTiep"
          type="number"
        />
        <ControlledTextField
          control={control}
          label="Số HK cảnh báo tối đa"
          name="dktH_SoHKCanhBaoMax"
          type="number"
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          label="Điểm học kì đầu <"
          name="dktH_DiemHKDau"
          type="number"
        />
        <ControlledTextField
          control={control}
          label="Điểm học kỳ liên tiếp <"
          name="dktH_DiemHKLienTiep"
          type="number"
        />
        <ControlledTextField
          control={control}
          label="Điểm học kỳ tiếp theo <"
          name="dktH_DiemHKTiepTheo"
          type="number"
        />
      </Stack>
      <Stack gap={1}>
        <Stack direction="row" gap={2} justifyContent="start">
          <ControlledCheckbox
            control={control}
            label="Xét tạm ngưng"
            name="dktH_IsXetTamNgung"
            containerSx={{ flex: 0 }}
            labelSx={{ width: 108 }}
          />

          <ControlledCheckbox
            control={control}
            label="Số lần vi phạm kỷ luật >="
            name="dktH_IsSoLanVP"
            containerSx={{ flex: 0 }}
            labelSx={{ width: 200 }}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <ControlledDoubleTextField
            control={control}
            label="Xét tạm ngưng"
            name1="dktH_XetTamNgungTu"
            name2="dktH_XetTamNgungDen"
            hasDivider
          />
          <ControlledTextField
            control={control}
            label="Số lần vi phạm kỷ luật >="
            name="dktH_SoLanVP"
            type="number"
          />
          <MucDoSelection control={control} label="Mức độ vi phạm KL >=" name="dktH_IdMucDoVP" />
        </Stack>
        <Stack direction="row" gap={2} justifyContent="start">
          <ControlledCheckbox
            control={control}
            label="Kiểm tra nợ học phí"
            name="dktH_IsKiemTraNoHP"
            containerSx={{ flex: 0 }}
            labelSx={{ width: 144 }}
          />

          <ControlledCheckbox
            control={control}
            label="Hiển thị ghi chú môn học rớt"
            name="dktH_IsShowGCMonHocRot"
            containerSx={{ flex: 0 }}
            labelSx={{ width: 206 }}
          />
          <ControlledCheckbox
            control={control}
            label="Hiển thị ghi chú môn học khác"
            name="dktH_IsShowGCMonHocKhac"
            containerSx={{ flex: 0 }}
            labelSx={{ width: 300 }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
