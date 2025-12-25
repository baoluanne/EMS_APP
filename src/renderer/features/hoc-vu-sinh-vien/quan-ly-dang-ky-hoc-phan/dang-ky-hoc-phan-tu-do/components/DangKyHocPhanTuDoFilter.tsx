import { Grid, Stack } from '@mui/material';
import {
  ControlledDatePicker,
  ControlledRadioGroup,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  HocKySelection,
  HocPhanHocSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  LopHocPhanSelection,
  LopHocSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { SearchButton } from '@renderer/features/common';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import { useDisclosure } from '@renderer/shared/hooks';
import { useForm } from 'react-hook-form';

interface Filters {
  maSinhVien: string;
  hoTen: string;

  ngaySinh: Date | null;

  idLopHoc?: number;
  idDot?: number;
  idKhoaHoc?: number;
  idCoSoDaoTao?: number;
  idBacDaoTao?: number;
  idLoaiDaoTao?: number;
  idNganh?: number;
  idHocPhanHoc?: number;
  idLopHocPhan?: number;

  gioiTinh?: 'nam' | 'nu';
  trangThai?: 'dangKyMoi' | 'hocLai' | 'hocCaiThien';
}

const defaultFilters: Filters = {
  maSinhVien: '',
  hoTen: '',
  ngaySinh: null,

  idLopHoc: undefined,
  idDot: undefined,
  idKhoaHoc: undefined,
  idCoSoDaoTao: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idNganh: undefined,
  idHocPhanHoc: undefined,
  idLopHocPhan: undefined,

  gioiTinh: undefined,
  trangThai: undefined,
};

interface Props {
  onApply: (filters: any) => void;
}

export const DangKyHocPhanTuDoFilter = ({ onApply }: Props) => {
  const { isOpen, toggle } = useDisclosure();

  const filterMethods = useForm<Filters>({
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
          <Stack direction="row">
            <ControlledTextField
              control={control}
              name="maSinhVien"
              label="Mã sinh viên"
              required
            />
            <SearchButton onClick={toggle} />
            {isOpen && <TimKiemSinhVienModal onClose={toggle} onSelect={() => {}} />}
          </Stack>
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" required />
        </Grid>
        <Grid size={4}>
          <ControlledDatePicker control={control} name="ngaySinh" label="Ngày sinh" />
        </Grid>
        <Grid size={4}>
          <LopHocSelection control={control} name="idLopHoc" />
        </Grid>
        <Grid size={4}>
          <ControlledRadioGroup
            control={control}
            name="gioiTinh"
            options={[
              { label: 'Nam', value: 'name' },
              { label: 'Nữ', value: 'nu' },
            ]}
          />
        </Grid>
        <Grid size={4}>
          <ControlledRadioGroup
            control={control}
            name="trangThai"
            options={[
              { label: 'Đăng ký mới', value: 'dangKyMoi' },
              { label: 'Học lại', value: 'hocLai' },
              { label: 'Học cải thiện', value: 'hocCaiThien' },
            ]}
          />
        </Grid>
        <Grid size={4}>
          <HocKySelection control={control} name="idDot" label="Đợt" />
        </Grid>
        <Grid size={4}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>
        <Grid size={4}>
          <CoSoSelection control={control} name="idCoSoDaoTao" />
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
          <HocPhanHocSelection control={control} name="idHocPhanHoc" />
        </Grid>
        <Grid size={4}>
          <LopHocPhanSelection control={control} name="idLopHocPhan" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
