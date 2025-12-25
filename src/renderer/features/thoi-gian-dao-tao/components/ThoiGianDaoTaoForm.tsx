import { Box, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import {
  BacDaoTaoSelection,
  BangTotNghiepSelection,
  KhoiNganhSelection,
  LoaiDaoTaoSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const ThoiGianDaoTaoForm = () => {
  const { control } = useFormContext();
  return (
    <Stack gap={2}>
      {/* Row 1 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '50%' }}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" required />
        </Box>

        <Box sx={{ width: '50%' }}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" required />
        </Box>
      </Stack>

      {/* Row 2 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '50%' }}>
          <KhoiNganhSelection name="idKhoiNganh" control={control} />
        </Box>

        <Box sx={{ width: '50%' }}>
          <ControlledTextField
            control={control}
            name="thoiGianKeHoach"
            label="Thời gian kế hoạch"
            type="number"
          />
        </Box>
      </Stack>

      {/* Row 3 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '50%' }}>
          <ControlledTextField
            control={control}
            name="thoiGianToiThieu"
            label="Thời gian tối thiểu"
            type="number"
          />
        </Box>

        <Box sx={{ width: '50%' }}>
          <ControlledTextField
            control={control}
            name="thoiGianToiDa"
            label="Thời gian tối đa"
            type="number"
          />
        </Box>
      </Stack>

      {/* Row 4 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '50%' }}>
          <ControlledTextField control={control} name="hanCheDKHP" label="Hạn chế DKHP" />
        </Box>

        <Box sx={{ width: '50%' }}>
          <ControlledTextField
            control={control}
            name="giayBaoTrungTuyen"
            label="Giấy báo trúng tuyển"
          />
        </Box>
      </Stack>

      {/* Row 5 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '50%' }}>
          <BangTotNghiepSelection control={control} name="idBangTotNghiep" />
        </Box>

        <Box sx={{ width: '50%' }}>
          <ControlledTextField
            control={control}
            name="heSoDaoTao"
            label="Hệ số đào tạo"
            type="number"
          />
        </Box>
      </Stack>

      {/* Row 6 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '50%' }}>
          <ControlledTextField control={control} name="kyTuMaSV" label="Ký tự mã sinh viên" />
        </Box>

        <Box sx={{ width: '50%' }}>
          <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
        </Box>
      </Stack>
    </Stack>
  );
};
