import { Grid } from '@mui/material';
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
import { useForm } from 'react-hook-form';
import { DanhSachLopHocFilterState } from '../types';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';

const defaultFilters: DanhSachLopHocFilterState = {
  id: undefined,
  idCoSoDaoTao: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idKhoa: undefined,
  idNganh: undefined,
  idChuyenNganh: undefined,
  tenLop: undefined,
  soHopDong: undefined,
  ngayHopDong: undefined,
  ngayRaQuyetDinh: undefined,
};

interface Props {
  onApply: (filters: DanhSachLopHocFilterState) => void;
}

export const DanhSachLopHocFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<DanhSachLopHocFilterState>({
    defaultValues: defaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultFilters);
  };
  return (
    <FilterDrawerBottom<DanhSachLopHocFilterState>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSoDaoTao" />
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
          <KhoaSelection name="idKhoa" control={control} />
        </Grid>
        <Grid size={4}>
          <NganhSelection control={control} name="idNganhHoc" />
        </Grid>
        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" labelWidth={135} />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="tenLop" label="Tên lớp học" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="soHopDong" label="Số hợp đồng" />
        </Grid>
        <Grid size={4}>
          <ControlledDatePicker name="ngayHopDong" control={control} label="Ngày hợp đồng" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField
            name="soQuyetDinhThanhLapLop"
            control={control}
            label="Số quyết định thành lập lớp"
          />
        </Grid>
        <Grid size={4}>
          <ControlledDatePicker
            name="ngayRaQuyetDinh"
            control={control}
            label="Ngày ra quyết định thành lập lớp"
          />
        </Grid>
        <Grid size={4} offset={8}>
          <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
