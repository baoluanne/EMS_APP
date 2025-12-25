import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { FilterFormProps } from '@renderer/shared/types';
import { useForm } from 'react-hook-form';
import { ThongKeTiepNhanHoSoSinhVienFilter } from '../types';
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
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import {
  HoSoHssvSelection,
  LoaiHoSoSelection,
  LoaiThongKeHoSoSelection,
} from '@renderer/components/selections/';

const defaultThongKeTiepNhanHoSoSinhVienFilter = {
  idCoSo: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idNganhHoc: undefined,
  idChuyenNganh: undefined,
  idLopHoc: undefined,
  maSinhVien: undefined,
  hoTen: undefined,
  idHoSo: undefined,
  idThongKe: undefined,
  loaiHoSo: undefined,
  trangThaiHoSo: [],
  ngayTiepNhanHoSoFrom: undefined,
  ngayTiepNhanHoSoTo: undefined,
};

export const ThongKeTiepNhanHoSoSinhVienFilters = ({
  onApply,
  onClear,
}: FilterFormProps<ThongKeTiepNhanHoSoSinhVienFilter>) => {
  const filterMethods = useForm<ThongKeTiepNhanHoSoSinhVienFilter>({
    defaultValues: defaultThongKeTiepNhanHoSoSinhVienFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultThongKeTiepNhanHoSoSinhVienFilter);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<ThongKeTiepNhanHoSoSinhVienFilter>
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
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={4}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={4}>
          <NganhSelection control={control} name="idNganhHoc" />
        </Grid>
        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
        <Grid size={4}>
          <LopHocSelection control={control} name="idLopHoc" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" />
        </Grid>
        <Grid size={4}>
          <HoSoHssvSelection control={control} name="idHoSo" entity="HoSoSV" />
        </Grid>
        <Grid size={4}>
          <LoaiThongKeHoSoSelection control={control} name="idThongKe" label="Thống kê" />
        </Grid>
        <Grid size={4}>
          <LoaiHoSoSelection control={control} name="loaiHoSo" label="Loại hồ sơ" required />
        </Grid>
        <Grid size={4}>
          <TrangThaiSinhVienSelection
            multiple={true}
            control={control}
            name="trangThaiHoSo"
            label="Trạng thái"
            required
          />
        </Grid>
        <Grid size={8}>
          <ControlledDateRangePicker
            control={control}
            startName="ngayTiepNhanHoSoFrom"
            endName="ngayTiepNhanHoSoTo"
            startLabel="Tiếp nhận hồ sơ từ ngày"
            endLabel="Đến ngày"
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
