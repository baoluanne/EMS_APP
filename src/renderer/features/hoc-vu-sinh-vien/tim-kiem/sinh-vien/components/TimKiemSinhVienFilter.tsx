import { UseFormReturn } from 'react-hook-form';
import { TimKiemSinhVienFilterType } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien/validations';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  GioiTinhSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LopHocSelection,
  NganhSelection,
  TrangThaiSinhVienSelection,
} from '@renderer/components/selections';
import { defaultThongTinTimKiemSVFilterState } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien/types';

interface Props {
  onApply: (filters: TimKiemSinhVienFilterType) => void;
  methods: UseFormReturn<TimKiemSinhVienFilterType>;
  isRefetching?: boolean;
}

export const TimKiemSinhVienFilter = ({ onApply, methods, isRefetching }: Props) => {
  const { control, reset } = methods;
  const handleClear = () => {
    reset(defaultThongTinTimKiemSVFilterState);
  };
  return (
    <FilterDrawerBottom<TimKiemSinhVienFilterType>
      onApply={onApply}
      onClear={handleClear}
      methods={methods}
      isRefetching={isRefetching}
    >
      <Grid size={12}>
        <Stack spacing={2}>
          <Grid container spacing={1}>
            <Grid size={4}>
              <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
            </Grid>
            <Grid size={4}>
              <Grid container spacing={1}>
                <ControlledTextField control={control} name="hoDem" label="Họ tên" />
                <ControlledTextField control={control} name="ten" />
              </Grid>
            </Grid>
            <Grid size={4}>
              <GioiTinhSelection control={control} name="gioiTinh" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={4}>
              <Grid container spacing={1}>
                <ControlledDateRangePicker
                  control={control}
                  startName="ngaySinhTu"
                  endName="ngaySinhDen"
                  startLabel="Ngày sinh"
                  endLabel=""
                />
              </Grid>
            </Grid>
            <Grid size={4}>
              <ControlledTextField label="Địa chỉ" control={control} name="diaChiLienLac" />
            </Grid>
            <Grid size={4}>
              <CoSoSelection control={control} name="idCoSo" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={4}>
              <KhoaHocSelection control={control} name="idKhoaHoc" />
            </Grid>
            <Grid size={4}>
              <BacDaoTaoSelection control={control} name="idBacDaoTao" />
            </Grid>
            <Grid size={4}>
              <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={4}>
              <NganhSelection control={control} name="idNganh" />
            </Grid>
            <Grid size={4}>
              <ChuyenNganhSelection control={control} name="idChuyenNganh" />
            </Grid>
            <Grid size={4}>
              <LopHocSelection control={control} name="idLopHoc" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={4}>
              <TrangThaiSinhVienSelection control={control} name="trangThai" />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </FilterDrawerBottom>
  );
};
