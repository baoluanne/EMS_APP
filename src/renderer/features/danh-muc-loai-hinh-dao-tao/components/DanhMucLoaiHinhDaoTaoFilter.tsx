import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';

export interface DanhMucLoaiHinhDaoTaoFilterState {
  keyword?: string;
}

export const danhMucLoaiHinhDaoTaoDefaultFilter = {
  keyword: undefined,
};

interface Props {
  onApply: (filters: DanhMucLoaiHinhDaoTaoFilterState) => void;
  onClear: () => void;
}

export const DanhMucLoaiHinhDaoTaoFilter = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<DanhMucLoaiHinhDaoTaoFilterState>({
    defaultValues: danhMucLoaiHinhDaoTaoDefaultFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(danhMucLoaiHinhDaoTaoDefaultFilter);
    onClear();
  };
  return (
    <FilterDrawerBottom<DanhMucLoaiHinhDaoTaoFilterState>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid size={12}>
          <ControlledTextField control={control} name="keyword" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
