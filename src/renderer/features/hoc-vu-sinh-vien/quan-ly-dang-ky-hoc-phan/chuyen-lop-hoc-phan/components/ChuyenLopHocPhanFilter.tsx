import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  HocKySelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
} from '@renderer/components/selections';
import { LopHocPhanSelection } from '@renderer/components/selections/TimLopHocPhan';
import { useForm } from 'react-hook-form';

interface Props {
  onApply: (filters: any) => void;
}

export const ChuyenLopHocPhanFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<any>({
    defaultValues: {
      idDot: '',
      idCoSo: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      idKhoaChuQuan: '',
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
      idKhoaChuQuan: '',
    });
  };
  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={2} columnSpacing={4}>
        <Grid size={4}>
          <HocKySelection control={control} name="idDot" label="Đợt" required />
        </Grid>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSo" required />
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
          <KhoaSelection control={control} name="idKhoaChuQuan" label="Khoa chủ quản môn học" />
        </Grid>
        <Grid size={4}>
          <LopHocPhanSelection
            control={control}
            name="idLopHocPhan"
            label="Lớp học phần"
            required
          />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="tenMonHoc" label="Tên môn học" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="maHoTenSV" label="Mã/ Họ tên SV" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
