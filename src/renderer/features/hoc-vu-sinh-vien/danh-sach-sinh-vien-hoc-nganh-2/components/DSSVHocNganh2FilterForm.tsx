import { Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { UseFormReturn } from 'react-hook-form';
import { defaultDsSinhVienHocNganh2FilterState } from '@renderer/features/hoc-vu-sinh-vien/danh-sach-sinh-vien-hoc-nganh-2/types';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LopHocSelection,
  NganhSelection,
  TrangThaiSinhVienSelection,
} from '@renderer/components/selections';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { SinhVienHocNganh2Filter } from '../validations';

interface Props {
  onApply: (filters: SinhVienHocNganh2Filter) => void;
  methods: UseFormReturn<SinhVienHocNganh2Filter>;
}

export default function DSSVHocNganh2FilterForm({ onApply, methods }: Props) {
  const { control } = methods;
  return (
    <FilterDrawerBottom<SinhVienHocNganh2Filter>
      onApply={onApply}
      onClear={() => methods.reset(defaultDsSinhVienHocNganh2FilterState)}
      methods={methods}
    >
      <Grid container spacing={2}>
        <Grid container spacing={1} size={12}>
          <Grid size={4}>
            <CoSoSelection control={control} name="idCoSo" />
          </Grid>
          <Grid size={4}>
            <KhoaHocSelection control={control} name="idKhoaHoc" />
          </Grid>
          <Grid size={4}>
            <BacDaoTaoSelection control={control} name="idBacDaoTao" />
          </Grid>
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={4}>
            <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
          </Grid>
          <Grid size={4}>
            <NganhSelection control={control} name="idNganh" />
          </Grid>
          <Grid size={4}>
            <ChuyenNganhSelection control={control} name="idChuyenNganh" />
          </Grid>
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={4}>
            <LopHocSelection control={control} name="idLopHoc" />
          </Grid>
          <Grid size={4}>
            <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
          </Grid>
          <Grid size={4}>
            <Stack direction="row" spacing={1}>
              <ControlledTextField control={control} name="hoDem" label="Họ tên" />
              <ControlledTextField control={control} name="tenSV" />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={4}>
            <TrangThaiSinhVienSelection control={control} name="trangThai" />
          </Grid>
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
}
