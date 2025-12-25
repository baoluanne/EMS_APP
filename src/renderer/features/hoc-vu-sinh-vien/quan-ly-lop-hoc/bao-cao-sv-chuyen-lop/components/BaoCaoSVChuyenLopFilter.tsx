import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDateRangePicker from '@renderer/components/controlled-fields/ControlledDateRangePicker';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';

interface BaoCaoSVChuyenLopFilterForm {
  ngayChuyenLopFrom?: Date | null;
  ngayChuyenLopTo?: Date | null;
  maSVAndHoTenSV?: string;
  maLopHocCu?: string;
  maLopHocMoi?: string;
  phanLoaiChuyenLop?: 'chuyenLopTudo' | 'Chuyển lớp cùng ngành';
}

const defaultValues: BaoCaoSVChuyenLopFilterForm = {
  ngayChuyenLopFrom: null,
  ngayChuyenLopTo: null,
  maSVAndHoTenSV: '',
  maLopHocCu: '',
  maLopHocMoi: '',
  phanLoaiChuyenLop: undefined,
};

interface Props {
  onApply: (filters: BaoCaoSVChuyenLopFilterForm) => void;
}

export const BaoCaoSVChuyenLopFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<BaoCaoSVChuyenLopFilterForm>({ defaultValues });
  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(defaultValues);
  };
  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid size={6}>
          <ControlledDateRangePicker
            control={control}
            startName="ngayChuyenLopFrom"
            endName="ngayChuyenLopTo"
            startLabel="Từ ngày"
            endLabel="Đến ngày"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="maSVAndHoTenSV"
            label="Mã/Họ tên sinh viên"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField control={control} name="maLopHocCu" label="Mã lớp học cũ" />
        </Grid>
        <Grid size={6}>
          <ControlledTextField control={control} name="maLopHocMoi" label="Mã lớp học mới" />
        </Grid>
        <Grid size={6}>
          <ControlledSelect
            name="phanLoaiChuyenLop"
            control={control}
            label="Phân loại chuyển lớp"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Chuyển lớp tự do', value: '0' },
              { label: 'Chuyển lớp cùng ngành', value: '1' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
