import { Stack } from '@mui/material';
import {
  ControlledDoubleTextField,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const TieuChuanXetHocBongForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={4}>
        <ControlledDoubleTextField
          name1="hocLucDiem10Tu"
          name2="hocLucDiem10Den"
          control={control}
          label="Học lực (Điểm 10)*"
          props1={{ type: 'number' }}
          props2={{ type: 'number' }}
          hasDivider
        />
        <ControlledDoubleTextField
          name1="hocLucDiem4Tu"
          name2="hocLucDiem4Den"
          control={control}
          label="Học lực (Điểm 4)"
          props1={{ type: 'number' }}
          props2={{ type: 'number' }}
          hasDivider
        />
        <ControlledDoubleTextField
          name1="hanhKiemTu"
          name2="hanhKiemDen"
          control={control}
          label="Hạnh kiểm*"
          props1={{ type: 'number' }}
          props2={{ type: 'number' }}
          hasDivider
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} label="Học bổng" required name="hocBong" />
        <ControlledTextField control={control} label="Nhóm" required name="nhom" />
        <ControlledTextField control={control} label="Số tiền" name="soTien" type="number" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          label="% Số tiền"
          name="phanTramSoTien"
          type="number"
        />
        <ControlledTextField control={control} label="STT" required name="stt" type="number" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          label="Ghi chú"
          name="ghiChu"
          multiline
          minRows={2}
        />
      </Stack>
    </Stack>
  );
};
