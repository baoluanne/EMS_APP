import { Stack } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { KhoaSelection } from '@renderer/components/selections';
import { FilterSelect } from '@renderer/components/fields';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { useFormContext } from 'react-hook-form';

type KhoiNganh = { id: string; tenKhoiNganh: string };

export const DanhMucNganhDaoTaoForm = () => {
  const { control } = useFormContext();
  const { data: khoiNganhData } = useListQuery<KhoiNganh[]>('KhoiNganh');
  const khoiNganhOptions: Option[] = (khoiNganhData ?? []).map((item) => ({
    label: item.tenKhoiNganh,
    value: item.id!,
  }));
  return (
    <Stack gap={2}>
      {/* Row 1 */}
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="maNganh" label="Mã ngành" required />
        <ControlledTextField control={control} name="tenNganh" label="Tên ngành" required />
      </Stack>

      {/* Row 2 */}
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng anh" />
        <ControlledTextField control={control} name="maTuyenSinh" label="Mã tuyển sinh" />
      </Stack>

      {/* Row 3 */}
      <Stack direction="row" gap={2} alignItems="center">
        <KhoaSelection name="idKhoa" control={control} required />
        <Stack direction="row" gap={2} flex={1} alignItems="center">
          <ControlledTextField control={control} name="khoiThi" label="Khối thi" />
          <ControlledTextField control={control} name="stt" label="STT" sx={{ flex: 1 }} />
          <ControlledCheckbox
            control={control}
            name="isVisible"
            label="Hiển thị"
            sx={{ flex: 0.1 }}
          />
        </Stack>
      </Stack>

      {/* Row 4 */}
      <Stack direction="row" gap={2}>
        <ControlledTextField control={control} name="tenVietTat" label="Tên viết tắt" />
        <ControlledTextField control={control} name="kyTuMaSV" label="Ký tự Mã SV" />
      </Stack>

      {/* Row 5 */}
      <Stack direction="row" gap={2}>
        <Stack flex={1}>
          <FilterSelect
            label="Khối ngành"
            options={khoiNganhOptions}
            name="idKhoiNganh"
            control={control}
          />
        </Stack>
        <ControlledTextField control={control} name="ghiChu" label="Ghi chú" flex={1} />
      </Stack>
    </Stack>
  );
};
