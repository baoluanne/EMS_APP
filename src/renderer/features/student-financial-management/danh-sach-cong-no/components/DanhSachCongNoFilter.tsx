// @renderer/features/student-financial-management/danh-sach-cong-no/components/DanhSachCongNoFilter.tsx

import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { NamHocSelection } from '@renderer/components/selections/NamHocSelection';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';

type DanhSachCongNoFilterState = {
  maSinhVien?: string;
  hoTen?: string;
  namHocHocKyId?: string;
  hanNopFrom?: string | null;
  hanNopTo?: string | null;
};

const defaultFilters: DanhSachCongNoFilterState = {
  maSinhVien: undefined,
  hoTen: undefined,
  namHocHocKyId: undefined,
  hanNopFrom: undefined,
  hanNopTo: undefined,
};

interface Props {
  onApply: (filters: DanhSachCongNoFilterState) => void;
}

export const DanhSachCongNoFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<DanhSachCongNoFilterState>({
    defaultValues: defaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(defaultFilters);
  };

  return (
    <FilterDrawerBottom<DanhSachCongNoFilterState>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>

        <Grid size={4}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" />
        </Grid>

        <Grid size={4}>
          <NamHocSelection control={control} name="namHocHocKyId" />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker control={control} name="hanNopFrom" label="Hạn nộp từ ngày" />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker control={control} name="hanNopTo" label="Hạn nộp đến ngày" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
