import { Grid, Stack } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { TrangThaiSinhVienSelection } from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';
import { CapNhatTrangThaiSinhVienFormListSinhVien } from './CapNhatTrangThaiSinhVienFormListSinhVien';
import { LoaiQuyetDinhSelection } from '@renderer/components/selections/LoaiQuyetDinhSelection';

interface CapNhatTrangThaiSinhVienFormProps {
  selectedRowIds: GridRowSelectionModel;
}

export const CapNhatTrangThaiSinhVienForm = ({
  selectedRowIds,
}: CapNhatTrangThaiSinhVienFormProps) => {
  const { control } = useFormContext();

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TrangThaiSinhVienSelection control={control} name="trangThaiMoi" />
        </Grid>

        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="soQuyetDinh"
            label="Số quyết định"
            required
          />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker
            control={control}
            name="ngayRaQuyetDinh"
            label="Ngày ra quyết định *"
          />
        </Grid>

        <Grid size={6}>
          <LoaiQuyetDinhSelection control={control} name="idLoaiQuyetDinh" required disabled />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker control={control} name="ngayHetHan" label="Ngày hết hạn" />
        </Grid>

        <Grid size={12}>
          <ControlledTextField control={control} name="ghiChu" label="Ghi chú" multiline rows={3} />
        </Grid>

        <Grid size={12}>
          <ControlledDatePicker control={control} name="ngayTao" label="Ngày tạo" />
        </Grid>
      </Grid>

      <CapNhatTrangThaiSinhVienFormListSinhVien selectedRowIds={selectedRowIds} />
    </Stack>
  );
};
