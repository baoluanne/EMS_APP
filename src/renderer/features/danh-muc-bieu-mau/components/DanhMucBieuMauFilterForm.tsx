import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { KhoaSelection } from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { DanhMucBieuMauFilterType } from '../types';
import { ControlledTextField } from '@renderer/components/controlled-fields';

type Props = {
  onApply: (filters: DanhMucBieuMauFilterType) => void;
  onClear?: () => void;
};
const defaultValuesFilter = {
  idKhoaQuanLy: undefined,
  keyword: undefined,
};
export const DanhMucBieuMauFilterForm = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<DanhMucBieuMauFilterType>({ defaultValues: defaultValuesFilter });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultValuesFilter);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<DanhMucBieuMauFilterType>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <ControlledTextField control={control} name="keyword" label="Tìm kiếm" />
        <KhoaSelection control={control} name="idKhoaQuanLy" label="Khoa quản lý" />
      </Grid>
    </FilterDrawerBottom>
  );
};
