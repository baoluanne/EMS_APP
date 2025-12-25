import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  LopHocSelection,
  NganhSelection,
  TrangThaiSinhVienSelection,
} from '@renderer/components/selections';
import { FilterFormProps } from '@renderer/shared/types';
import { useForm } from 'react-hook-form';
import { NhatKyCapNhatTrangThaiSinhVienFilter } from '../types';

export const defaultNhatKyCapNhatTrangThaiSinhVienFilter = {
  ngayTaoFrom: undefined,
  ngayTaoTo: undefined,
  ngayQuyetDinhFrom: undefined,
  ngayQuyetDinhTo: undefined,
  maSinhVien: undefined,
  hoTen: undefined,
  nguoiCapNhat: undefined,
  soQuyetDinh: undefined,
  ghiChu: undefined,
};

export const NhatKyCapNhatTrangThaiSinhVienFilters = ({
  onApply,
  onClear,
}: FilterFormProps<NhatKyCapNhatTrangThaiSinhVienFilter>) => {
  const filterMethods = useForm<NhatKyCapNhatTrangThaiSinhVienFilter>({
    defaultValues: defaultNhatKyCapNhatTrangThaiSinhVienFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultNhatKyCapNhatTrangThaiSinhVienFilter);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<NhatKyCapNhatTrangThaiSinhVienFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSo" />
        </Grid>
        <Grid size={4}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>
        <Grid size={4}>
          <KhoaSelection control={control} name="idKhoa" />
        </Grid>
        <Grid size={4}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={4}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={4}>
          <NganhSelection control={control} name="idNganh" />
        </Grid>
        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
        <Grid size={4}>
          <LopHocSelection control={control} name="idLopHoc" />
        </Grid>
        <Grid size={4}>
          <TrangThaiSinhVienSelection control={control} name="trangThaiCu" label="Trạng thái cũ" />
        </Grid>
        <Grid size={4}>
          <TrangThaiSinhVienSelection
            control={control}
            name="trangThaiMoi"
            label="Trạng thái mới"
          />
        </Grid>
        <Grid size={4}>
          <ControlledDateRangePicker
            control={control}
            startName="ngayTaoFrom"
            endName="ngayTaoTo"
            startLabel="Ngày tạo từ ngày"
            endLabel="Ngày tạo đến ngày"
          />
        </Grid>
        <Grid size={4}>
          <ControlledDateRangePicker
            control={control}
            startName="ngayQuyetDinhFrom"
            endName="ngayQuyetDinhTo"
            startLabel="Ngày quyết định từ ngày"
            endLabel="Ngày quyết định đến ngày"
          />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="nguoiCapNhat" label="Người cập nhật" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="soQuyetDinh" label="Số quyết định" />
        </Grid>
        <Grid size={8}>
          <ControlledTextField control={control} name="ghiChu" label="Ghi chú" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
