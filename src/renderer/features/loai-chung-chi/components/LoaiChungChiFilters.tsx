import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { LoaiChungChiSelection } from '@renderer/components/selections';
import { useForm } from 'react-hook-form';

export interface ILoaiChungChiFilters {
  idLoaiChungChi?: string;
}

export const loaiChungChiDefaultFilters = {
  idLoaiChungChi: undefined,
};

interface Props {
  onApply: (filters: ILoaiChungChiFilters) => void;
}

export const LoaiChungChiFilters = ({ onApply }: Props) => {
  const filterMethods = useForm<ILoaiChungChiFilters>({
    defaultValues: loaiChungChiDefaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(loaiChungChiDefaultFilters);
  };
  return (
    <FilterDrawerBottom<ILoaiChungChiFilters>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <LoaiChungChiSelection control={control} name="idLoaiChungChi" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
