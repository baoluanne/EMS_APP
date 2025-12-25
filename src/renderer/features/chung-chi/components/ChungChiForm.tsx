import { InputAdornment, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { LoaiChungChiSelection } from '@renderer/components/selections/LoaiChungChiSelection';
import { useFormContext } from 'react-hook-form';

export const ChungChiForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="tenLoaiChungChi"
          label="Mã loại chứng chỉ" required
          labelWidth={150}
        />
        <LoaiChungChiSelection control={control} required name="idLoaiChungChi" labelWidth={130} />
        <ControlledTextField control={control} name="kyHieu" label="Ký hiệu" labelWidth={90} />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="giaTri"
          label="Giá trị"
          type="number"
          labelWidth={150}
        />
        <ControlledTextField
          control={control}
          name="hocPhi"
          label="Học phí"
          type="number"
          labelWidth={130}
        />
        <ControlledTextField
          control={control}
          name="lePhiThi"
          label="Lệ phí thi"
          type="number"
          labelWidth={90}
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          name="thoiHan"
          label="Thời hạn "
          type="number"
          labelWidth={150}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">(Tháng)</InputAdornment>,
            },
          }}
        />
        <ControlledTextField
          control={control}
          name="diemQuyDinh"
          label="Điểm quy định"
          type="number"
          labelWidth={130}
        />
        <Stack flex={1} />
      </Stack>
      <ControlledTextField
        control={control}
        name="ghiChu"
        label="Ghi chú"
        labelWidth={90}
        multiline
        minRows={2}
      />
    </Stack>
  );
};
