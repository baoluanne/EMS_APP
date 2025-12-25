import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LopHocSelection,
  NganhSelection,
  QuyetDinhSelection,
} from '@renderer/components/selections';
import { UseFormReturn } from 'react-hook-form';
import { SinhVienMienMonHocFilter } from '../validations';
import { defaultSinhVienMienMonHocFilterValues } from '../types';

type Props = {
  onApply: (filters: SinhVienMienMonHocFilter) => void;
  methods: UseFormReturn<SinhVienMienMonHocFilter>;
};

export const DanhSachMienMonHocFilters = ({ onApply, methods }: Props) => {
  const { control } = methods;
  const handleClear = () => {
    methods.reset(defaultSinhVienMienMonHocFilterValues);
  };

  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={methods}>
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
          <NganhSelection control={control} name="idNganh" />
        </Grid>
        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
        <Grid size={4}>
          <LopHocSelection control={control} name="idLopHoc" />
        </Grid>
        <Grid size={4}>
          <QuyetDinhSelection control={control} name="idQuyetDinh" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="hoDem" label="Họ" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="ten" label="Tên" />
        </Grid>
        <Grid size={4}>
          <ControlledDateRangePicker
            control={control}
            startName="startNgayTao"
            endName="endNgayTao"
            startLabel="Từ ngày tạo"
            endLabel="Đến ngày tạo"
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
