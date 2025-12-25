import { Stack } from '@mui/material';
import {
  ControlledDoubleTextField,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const TieuChuanXetDanhHieuForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={4}>
        <ControlledDoubleTextField
          name1="hocLuc10Tu"
          name2="hocLuc10Den"
          control={control}
          label="Học lực (Điểm 10)*"
          props1={{ type: 'number' }}
          props2={{ type: 'number' }}
        />
        <ControlledDoubleTextField
          name1="hanhKiemTu"
          name2="hanhKiemDen"
          control={control}
          label="Hạnh kiểm*"
          props1={{ type: 'number' }}
          props2={{ type: 'number' }}
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledDoubleTextField
          name1="hocLuc4Tu"
          name2="hocLuc4Den"
          control={control}
          label="Học lực (Điểm 4)"
          props1={{ type: 'number' }}
          props2={{ type: 'number' }}
        />
        <ControlledTextField
          control={control}
          label="STT"
          name="stt"
          type="number"
          labelWidth={130}
        />
      </Stack>
      <Stack direction="row" gap={4}>
        <ControlledTextField
          control={control}
          label="Nhóm danh hiệu"
          name="nhomDanhHieu"
          flex={0.5}
          labelWidth={130}
        />
        <ControlledTextField
          control={control}
          label="Ghi chú"
          name="ghiChu"
          multiline
          minRows={2}
          flex={1}
        />
      </Stack>
    </Stack>
  );
};
