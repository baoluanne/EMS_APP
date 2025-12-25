import { Stack } from '@mui/material';
import { ControlledTextField, ControlledCheckbox } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DanhMucLoaiThuPhiMonHocForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          name="maLoaiThuPhi"
          label="Mã loại thu phí"
          required
        />
        <ControlledTextField
          control={control}
          name="tenLoaiThuPhi"
          label="Tên loại thu phí"
          required
        />
      </Stack>

      <Stack direction="row" gap={2} alignItems="center">
        <ControlledTextField control={control} name="stt" label="Số thứ tự" type="number" />
        <ControlledCheckbox
          control={control}
          name="capSoHoaDonDienTu"
          label="Cấp số hóa đơn điện tử"
        />
      </Stack>

      <ControlledTextField control={control} name="congThucQuyDoi" label="Công thức quy đổi" />

      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />

      <ControlledTextField control={control} name="maTKNganHang" label="Mã tài khoản NH" />
    </Stack>
  );
};
