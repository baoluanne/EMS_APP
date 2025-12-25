import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { LyDoXinPhong } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

export const LyDoXinPhongForm = () => {
  const { control } = useFormContext<LyDoXinPhong>();
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={4}>
        <Stack direction="row" gap={4} width={4 / 5}>
          <ControlledTextField
            control={control}
            name="maLoaiXinPhong"
            label="Mã loại xin phòng"
            required
            labelWidth={150}
          />
          <ControlledTextField
            control={control}
            name="tenLoaiXinPhong"
            label="Tên loại xin phòng"
            required
            labelWidth={150}
          />
        </Stack>
        <Stack width={1 / 5}>
          <ControlledTextField
            control={control}
            labelWidth={150}
            type="number"
            name="soThuTu"
            label="Số thứ tự"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
