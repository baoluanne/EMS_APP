import { Grid } from '@mui/material';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { FilterFormProps } from '@renderer/shared/types';
import { useForm } from 'react-hook-form';
import { ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter } from '../types';

export const defaultThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter = {
  thoiGianFrom: undefined,
  thoiGianTo: undefined,
  idCoSo: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idKhoa: undefined,
  idNganh: undefined,
  idChuyenNganh: undefined,
};

export const ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilters = ({
  onApply,
  onClear,
}: FilterFormProps<ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter>) => {
  const filterMethods = useForm<ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter>({
    defaultValues: defaultThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhanFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid size={4}>
        <ControlledDateRangePicker
          control={control}
          startName="thoiGianFrom"
          endName="thoiGianTo"
          startLabel="Thời gian từ ngày"
          endLabel="Đến ngày"
        />
      </Grid>
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
          <KhoaSelection control={control} name="idKhoa" />
        </Grid>
        <Grid size={4}>
          <NganhSelection control={control} name="idNganh" />
        </Grid>
        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
