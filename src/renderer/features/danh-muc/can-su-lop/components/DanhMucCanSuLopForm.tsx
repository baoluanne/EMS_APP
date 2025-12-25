import { Box, Stack } from '@mui/material';
import { ControlledTextField, ControlledCheckbox } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import { Option } from '@renderer/shared/types';
import { useListQuery } from '@renderer/shared/queries';
import { FilterSelect } from '@renderer/components/fields/FilterSelect';

type LoaiChucVu = { id: string; tenLoaiChucVu: string };

export const DanhMucCanSuLopForm = () => {
  const { control } = useFormContext();
  const { data: khoiNganhData } = useListQuery<LoaiChucVu[]>('LoaiChucVu');
  const loaiChucVuOptions: Option[] = (khoiNganhData ?? []).map((item) => ({
    label: item.tenLoaiChucVu,
    value: item.id!,
  }));
  return (
    <Stack gap={2}>
      {/* Row 1 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '40%' }}>
          <ControlledTextField control={control} name="maChucVu" label="Mã chức vụ" required />
        </Box>

        <Box sx={{ width: '40%' }}>
          <ControlledTextField control={control} name="tenChucVu" label="Tên chức vụ" required />
        </Box>

        <Box sx={{ width: '20%' }}>
          <ControlledCheckbox control={control} name="hoatDongDoan" label="Hoạt động đoàn" />
        </Box>
      </Stack>

      {/* Row 2 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '40%' }}>
          <FilterSelect
            label="Loại chức vụ"
            options={loaiChucVuOptions}
            name="idLoaiChucVu"
            control={control}
          />
        </Box>

        <Box sx={{ width: '40%' }}>
          <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng Anh" />
        </Box>

        <Box sx={{ width: '20%' }}>
          <ControlledTextField control={control} name="diemCong" label="Điểm cộng" type="number" />
        </Box>
      </Stack>

      {/* Row 3 */}
      <Stack direction="row" gap={2} alignItems="center">
        <Box sx={{ width: '82%' }}>
          <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
        </Box>

        <Box sx={{ width: '20%' }}>
          <ControlledTextField control={control} name="stt" label="STT" type="number" />
        </Box>
      </Stack>
    </Stack>
  );
};
