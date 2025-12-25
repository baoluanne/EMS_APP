import { Box, Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { HinhThucThuSelection } from '@renderer/components/selections/HinhThucThuSelection';
import { useFormContext } from 'react-hook-form';

export const LoaiKhoanThuNgoaiHocPhiForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2} alignItems="center">
        <ControlledTextField
          control={control}
          name="maLoaiKhoanThu"
          label="Mã loại khoản thu"
          required
        />
        <ControlledTextField
          control={control}
          name="tenLoaiKhoanThu"
          label="Tên loại khoản thu"
          required
        />
      </Stack>

      <Stack direction="row" gap={2} alignItems="center">
        <ControlledTextField control={control} name="stt" label="STT" type="number" />
        <HinhThucThuSelection control={control} name="hinhThucThu" required />
      </Stack>
      <Stack direction="row" gap={2} alignItems="center"> 
        <Box sx={{ width: '52%' }}>
          <ControlledTextField control={control} name="maTKNganHang" label="Mã tài khoản NH" />
        </Box>
        <Box sx={{ width: '25%' }}>
          <ControlledCheckbox
            control={control}
            name="xuatHoaDonDienTu"
            label="Xuất hóa đơn điện tử"
          />
        </Box>
        <Box sx={{ width: '25%' }}>
          <ControlledCheckbox control={control} name="phanBoDoanThu" label="Phân bổ doanh thu" />
        </Box>
      </Stack>
    </Stack>
  );
};
