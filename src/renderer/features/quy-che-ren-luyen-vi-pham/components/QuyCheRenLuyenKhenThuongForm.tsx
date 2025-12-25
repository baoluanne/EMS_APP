import { Grid, Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { LoaiHanhViSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const QuyCheRenLuyenViPhamForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="maHanhVi" label="Mã hành vi" required />
        <ControlledTextField control={control} name="tenHanhVi" label="Tên hành vi" required />
        <ControlledTextField control={control} name="diemTru" label="Điểm trừ" type="number" />
      </Stack>
      <Stack direction="row" gap={4}>
        <Grid flex={1}>
          <LoaiHanhViSelection control={control} name="idLoaiHanhVi" />
        </Grid>
        <ControlledTextField control={control} name="noiDung" label="Nội dung" />
        <ControlledTextField
          control={control}
          name="diemTruToiDa"
          type="number"
          label="Điểm trừ tối đa"
        />
      </Stack>

      <Stack direction="row" gap={4}>
        <ControlledCheckbox
          control={control}
          name="isViPhamNoiTru"
          label="Vi Phạm Nội Chú"
          containerSx={{ flex: undefined }}
        />
        <ControlledCheckbox
          control={control}
          name="isKhongSuDung"
          label="Không sử dụng"
          containerSx={{ flex: undefined }}
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField control={control} name="mucDo" label="Mức Độ" type="number" />
        <Stack flex={2} />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="ghiChu"
          label="Ghi Chú"
          multiline
          minRows={2}
        />
      </Stack>
    </Stack>
  );
};
