import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { NganhSelection } from '@renderer/components/selections';
import { useForm } from 'react-hook-form';

interface ChuyenNganhFilter {
  idNganhHoc?: string;
  keyword?: string;
}

type Props = {
  onApply: (filters: ChuyenNganhFilter) => void;
  onClear?: () => void;
};

export const chuyenNganhDefaultValuesFilter = {
  idNganhHoc: undefined,
  keyword: undefined,
};

export const ChuyenNganhFilter = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<ChuyenNganhFilter>({
    defaultValues: chuyenNganhDefaultValuesFilter,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(chuyenNganhDefaultValuesFilter);
    onClear?.();
  };
  return (
    <FilterDrawerBottom<ChuyenNganhFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <NganhSelection control={control} name="idNganhHoc" />
        </Grid>

        <Grid size={6}>
          <ControlledTextField control={control} name="keyword" label="Tìm kiếm" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
