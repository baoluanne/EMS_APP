import { Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DinhDangDiemSoForm = () => {
  const { control } = useFormContext();

  return (
    <HorizontalFilterCollapse title="Định dạng điểm số (số chữ số thập phân)">
      <Stack gap={2.5}>
        <Stack direction="row" gap={2}>
          <ControlledTextField control={control} label="Điểm thường kỳ" name="dddS_DiemThuongKy" type="number" />
          <ControlledTextField control={control} label="Điểm TB môn" name="dddS_DiemTBMon" type="number" />
          <ControlledTextField
            control={control}
            label="Điểm thi tốt nghiệp"
            name="dddS_DiemThiTotNghiep"
            type="number"
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <ControlledTextField control={control} label="Điểm TB thường kỳ" name="dddS_DiemTBTK" />
          <ControlledTextField control={control} label="Điểm TB học kỳ" name="dddS_DiemTBHK" type="number" />
          <ControlledTextField control={control} label="Điểm TB thi TN" name="dddS_DiemTBTN" type="number" />
        </Stack>
        <Stack direction="row" gap={2}>
          <ControlledTextField control={control} label="Điểm kết thúc môn" name="dddS_DiemKTMon" type="number" />
          <ControlledTextField control={control} label="Điểm TB chung" name="dddS_DiemTBChung" type="number" />
          <ControlledTextField control={control} label="Điểm toàn khóa" name="dddS_DiemToanKhoa" type="number" />
        </Stack>
      </Stack>
    </HorizontalFilterCollapse>
  );
};
