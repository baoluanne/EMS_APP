import { Stack } from '@mui/material';
import {
  ControlledCheckbox,
  ControlledDoubleTextField,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';
import {
  HocViSelection,
  KhoaSelection,
  LoaiGiangVienSelection,
  ToBoMonSelection,
} from '@renderer/components/selections';
import { GiangVien } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

export const GiangVienForm = () => {
  const { control } = useFormContext<GiangVien>();

  return (
    <Stack gap={2}>
      <ControlledTextField name="maGiangVien" control={control} label="Mã giảng viên" required />
      <Stack direction="row" gap={4}>
        <ControlledTextField name="hoDem" control={control} label="Họ đệm" required />
        <ControlledTextField name="ten" control={control} label="Tên" required />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledDatePicker
          name="ngaySinh"
          control={control}
          label="Ngày sinh"
          labelWidth={100}
        />
        <ControlledTextField name="soDienThoai" control={control} label="Số điện thoại" />
      </Stack>
      <ControlledTextField name="diaChi" control={control} label="Địa chỉ" />
      <Stack direction="row" gap={4}>
        <ControlledTextField name="email" control={control} label="Email" />
        <LoaiGiangVienSelection name="idLoaiGiangVien" control={control} required />
      </Stack>
      <Stack direction="row" gap={4}>
        <HocViSelection name="idHocVi" control={control} labelWidth={135} />
        <KhoaSelection name="idKhoa" control={control} labelWidth={135} required />
      </Stack>
      <Stack direction="row" gap={4}>
        <ToBoMonSelection name="idToBoMon" control={control} labelWidth={135} />
        <ControlledTextField name="tenVietTat" control={control} label="Tên viết tắt" />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledDoubleTextField
          name1="hsgV_LT"
          name2="hsgV_TH"
          control={control}
          label="HSGV LT - TH"
          props1={{ type: 'number' }}
          props2={{ type: 'number' }}
        />
        <ControlledTextField name="phuongTien" control={control} label="Phương tiện" />
      </Stack>
      <Stack direction="row" gap={4}>
        <Stack flex={1} />
        <ControlledDatePicker
          name="ngayChamDutHopDong"
          control={control}
          label="Ngày chấm dứt hợp đồng"
          labelWidth={170}
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledCheckbox name="isChamDutHopDong" control={control} label="Chấm dứt hợp đồng" />
        <ControlledCheckbox name="isCoiThi" control={control} label="Coi thi" />
        <ControlledCheckbox name="isVisible" control={control} label="Hiển thị" />
        <ControlledCheckbox name="isKhongChamCong" control={control} label="Không chấm công" />
      </Stack>
    </Stack>
  );
};
