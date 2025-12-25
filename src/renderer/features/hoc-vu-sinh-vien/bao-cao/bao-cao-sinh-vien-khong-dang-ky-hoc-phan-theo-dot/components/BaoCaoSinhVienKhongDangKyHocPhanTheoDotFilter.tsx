import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  ChuyenNganhSelection,
  CoSoSelection,
  HocKySelection,
  KhoaHocSelection,
  KhoaSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
  TrangThaiSinhVienSelection,
} from '@renderer/components/selections';
import { LopHocSelection } from '@renderer/components/selections/LopHocSelection';
import { useForm } from 'react-hook-form';

interface Props {
  onApply: (filters: any) => void;
}

export const BaoCaoSinhVienKhongDangKyHocPhanTheoDotFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<any>({
    defaultValues: {
      idDot: '',
      idCoSo: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      idKhoa: '',
      idNganh: '',
      idChuyenNganh: '',
      idLopHoc: '',
      idTrangThaiSV: '',
      maSinhVien: '',
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
      idKhoa: '',
      idNganh: '',
      idChuyenNganh: '',
      idLopHoc: '',
      idTrangThaiSV: '',
      maSinhVien: '',
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
          <KhoaHocSelection control={control} name="idKhoaHoc" required />
        </Grid>
        <Grid size={4}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={4}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={4}>
          <KhoaSelection control={control} name="idKhoa" label="Khoa" />
        </Grid>
        <Grid size={4}>
          <NganhSelection control={control} name="idNganh" />
        </Grid>
        <Grid size={4}>
          <ChuyenNganhSelection control={control} name="idChuyenNganh" />
        </Grid>
        <Grid size={4}>
          <LopHocSelection control={control} name="idLopHoc" label="Lớp học" />
        </Grid>
        <Grid size={4}>
          <TrangThaiSinhVienSelection control={control} name="idTrangThaiSV" label="Trạng thái SV" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};

