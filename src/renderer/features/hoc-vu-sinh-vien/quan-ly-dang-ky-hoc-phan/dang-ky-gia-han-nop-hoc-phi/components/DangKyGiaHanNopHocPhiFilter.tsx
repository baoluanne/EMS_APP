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
  NganhSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';

interface Props {
  onApply: (filters: any) => void;
}

export const DangKyGiaHanNopHocPhiFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<any>({
    defaultValues: {
      idDot: '',
      idCoSo: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      idNganh: '',
      lopHoc: '',
      sinhVien: '',
      ngayHetHanTu: '',
      ngayHetHanDen: '',
      idTrangThai: '',
    },
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset({
      idDot: '',
      idCoSo: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      idNganh: '',
      lopHoc: '',
      sinhVien: '',
      ngayHetHanTu: '',
      ngayHetHanDen: '',
      idTrangThai: '',
    });
  };
  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={2} columnSpacing={4}>
        <Grid size={4}>
          <HocKySelection control={control} name="idDot" label="Đợt" required />
        </Grid>
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
          <ControlledTextField control={control} name="lopHoc" label="Lớp học" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="sinhVien" label="Sinh viên" />
        </Grid>
        <Grid size={4}>
          <ControlledDateRangePicker
            control={control}
            startName="ngayHetHanTu"
            endName="ngayHetHanDen"
            startLabel="Ngày hết hạn từ"
            endLabel="Ngày hết hạn đến"
          />
        </Grid>
        <Grid size={4}>
          <ControlledRadioGroup
            control={control}
            name="idTrangThai"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Đã duyệt', value: 'daDuyet' },
              { label: 'Chưa duyệt', value: 'chuaDuyet' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
