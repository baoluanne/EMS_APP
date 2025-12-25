import { Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { UseFormReturn } from 'react-hook-form';

import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  HinhThucThiSelection,
  HocKySelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  LoaiMonHocSelection,
  LopHocSelection,
  NganhSelection,
} from '@renderer/components/selections';

import { defaultThongTinTimKiemLHPState } from '../types';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { TrangThaiLopHocPhanSelection } from '@renderer/components/selections/TrangThaiLopHocPhanSelection';
import { TimKiemLHPType } from '../validations';
import { LoaiLopLHPSelection } from '@renderer/components/selections/LoaiLopLHPSelection';
import { LoaiMonLTTHSelection } from '@renderer/components/selections/LoaiMonLTTHSelection';

interface Props {
  onApply: (filters: TimKiemLHPType) => void;
  methods: UseFormReturn<TimKiemLHPType>;
  isRefetching?: boolean;
}

export const TimKiemLopHocPhanFilter = ({ onApply, methods, isRefetching }: Props) => {
  const { control, reset, getValues } = methods;
  const handleClear = () => {
    const defaultIdHocKy = getValues('idHocKy');
    reset({ ...defaultThongTinTimKiemLHPState, idHocKy: defaultIdHocKy });
  };
  return (
    <FilterDrawerBottom<TimKiemLHPType>
      onApply={onApply}
      onClear={handleClear}
      methods={methods}
      isRefetching={isRefetching}
    >
      <Grid size={12}>
        <Stack spacing={2}>
          {/* Mã LHP - Đợt - Học kỳ - Khoa chủ quản */}
          <Grid container spacing={1}>
            <Grid size={4}>
              <ControlledTextField control={control} name="maLHP" label="Mã LHP" />
            </Grid>
            <Grid size={4}>
              <HocKySelection control={control} name="idHocKy" required disabled />
            </Grid>
            <Grid size={4}>
              <KhoaSelection control={control} name="idKhoaChuQuan" label="Khoa chủ quản" />
            </Grid>
          </Grid>
          {/* Cơ sở - Khóa học - Bậc đào tạo */}
          <Grid container spacing={1}>
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
          {/* Loại đào tạo - Ngành - Chuyên ngành */}
          <Grid container spacing={1}>
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
          {/* Lớp danh nghĩa - Lớp ban đầu - Môn học */}
          <Grid container spacing={1}>
            <Grid size={4}>
              <LopHocSelection control={control} name="idLopDanhNghia" label="Lớp danh nghĩa" />
            </Grid>
            <Grid size={4}>
              <ControlledTextField control={control} name="lopBanDau" label="Lớp ban đầu" />
            </Grid>
            <Grid size={4}>
              <ControlledTextField control={control} name="tenMonHoc" label="Môn học" />
            </Grid>
          </Grid>
          {/* Loại lớp LHP - Loại môn học - Hình thức thi */}
          <Grid container spacing={1}>
            <Grid size={4}>
              <LoaiLopLHPSelection control={control} name="loaiLHP" />
            </Grid>
            <Grid size={4}>
              <LoaiMonHocSelection control={control} name="idLoaiMonHoc" />
            </Grid>
            <Grid size={4}>
              <HinhThucThiSelection control={control} name="idHinhThucThi" />
            </Grid>
          </Grid>
          {/* Loại môn LT/TH - Trạng thái LHP - Ngày học cuối */}
          <Grid container spacing={1}>
            <Grid size={6}>
              <LoaiMonLTTHSelection control={control} name="loaiMonLTTH" />
            </Grid>
            <Grid size={6}>
              <TrangThaiLopHocPhanSelection control={control} name="trangThaiLHP" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={8}>
              <ControlledDateRangePicker
                control={control}
                startName="ngayHocCuoiTu"
                endName="ngayHocCuoiDen"
                startLabel="Ngày học cuối"
                endLabel=""
              />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </FilterDrawerBottom>
  );
};
