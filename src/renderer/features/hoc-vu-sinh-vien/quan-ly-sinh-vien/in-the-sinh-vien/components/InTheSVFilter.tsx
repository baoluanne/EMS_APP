import { Grid } from '@mui/material';
import { ControlledRadioGroup, ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  HocKySelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LopHocSelection,
  NganhSelection,
  NhomSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { InTheSVState } from '../types';

const defaultFilters: InTheSVState = {
  idCoSoDaoTao: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idNganhHoc: undefined,
  idChuyenNganh: undefined,

  idLopHoc: undefined,
  maSinhVien: undefined,
  hoDem: undefined,
  ten: undefined,

  isCoHinh: '',
  isInThe: '',

  idNhom: undefined,
  idDot: undefined,

  ngayImportHinhTu: undefined,
  ngayImportHinhDen: undefined,
  ngayNhapHocTu: undefined,
  ngayNhapHocDen: undefined,
};

interface Props {
  onApply: (filters: InTheSVState) => void;
}

export const InTheSVFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<InTheSVState>({
    defaultValues: defaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultFilters);
  };
  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={2} columnSpacing={4}>
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
          <NganhSelection control={control} name="idNganhHoc" />
        </Grid>
        <Grid size={4}>
          <LopHocSelection control={control} name="idLopHoc" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="hoDem" label="Họ đệm" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="ten" label="Tên" />
        </Grid>
        <Grid size={4}>
          <ControlledRadioGroup
            control={control}
            name="isCoHinh"
            options={[
              { value: '', label: 'Tất cả' },
              { value: 'true', label: 'Có hình' },
              { value: 'false', label: 'Chưa có hình' },
            ]}
          />
        </Grid>
        <Grid size={4}>
          <ControlledRadioGroup
            control={control}
            name="isCoHinh"
            options={[
              { value: '', label: 'Tất cả' },
              { value: 'true', label: 'In thẻ' },
              { value: 'false', label: 'Chưa in thẻ' },
            ]}
          />
        </Grid>
        <Grid size={4}>
          <NhomSelection control={control} name="nhom" />
        </Grid>
        <Grid size={4}>
          <ControlledDateRangePicker
            startName="ngayImportHinhTu"
            endName="ngayImportHinhDen"
            startLabel="Từ ngày import hình"
            endLabel="Đến ngày import hình"
            control={control}
            minDate={new Date(2000, 0, 1)}
            maxDate={new Date()}
          />
        </Grid>
        <Grid size={4}>
          <ControlledDateRangePicker
            startName="ngayNhapHocTu"
            endName="ngayNhapHocDen"
            startLabel="Từ ngày nhập học"
            endLabel="Đến ngày nhập học"
            control={control}
            minDate={new Date(2000, 0, 1)}
            maxDate={new Date()}
          />
        </Grid>{' '}
        <Grid size={4}>
          <HocKySelection control={control} name="idNhom" label="Đợt" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
