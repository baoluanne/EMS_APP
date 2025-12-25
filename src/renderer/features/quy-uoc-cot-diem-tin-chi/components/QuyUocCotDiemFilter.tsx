import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  KieuLamTronSelection,
  KieuMonHocSelection,
  QuyCheSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { quyUocCotDiemTienChiDefaultFilters } from '../configs';
import { QuyUocCotDiemTinChiFilter } from '../types';

type Props = {
  onApply: (filters: QuyUocCotDiemTinChiFilter) => void;
  onClear: () => void;
};

export const QuyUocCotDiemFilters = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<QuyUocCotDiemTinChiFilter>({
    defaultValues: quyUocCotDiemTienChiDefaultFilters,
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(quyUocCotDiemTienChiDefaultFilters);
    onClear();
  };
  return (
    <FilterDrawerBottom<QuyUocCotDiemTinChiFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={3}>
          <QuyCheSelection control={control} name="idQuyChe" />
        </Grid>
        <Grid size={3}>
          <KieuMonHocSelection control={control} name="idKieuMon" />
        </Grid>
        <Grid size={3}>
          <KieuLamTronSelection control={control} name="idKieuLamTron" />
        </Grid>

        <Grid size={3}>
          <ControlledTextField control={control} name="quyUoc" label="Quy ước" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
