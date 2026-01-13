import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { useForm } from 'react-hook-form';
import { ChiSoDienNuocFilterState, chiSoDienNuocDefaultFilters } from '../type';

const thangOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Tháng ${i + 1}`,
}));
const currentYear = new Date().getFullYear();
const namOptions = Array.from({ length: 5 }, (_, i) => ({
  value: currentYear - i,
  label: `${currentYear - i}`,
}));

interface Props {
  onApply: (filters: ChiSoDienNuocFilterState) => void;
}

export const ChiSoDienNuocFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<ChiSoDienNuocFilterState>({
    defaultValues: chiSoDienNuocDefaultFilters,
  });

  const { control } = filterMethods;

  return (
    <FilterDrawerBottom
      onApply={onApply}
      onClear={() => {
        filterMethods.reset(chiSoDienNuocDefaultFilters);
        onApply(chiSoDienNuocDefaultFilters);
      }}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà" />
        </Grid>
        <Grid size={6}>
          <PhongSelection control={control} name="phongId" label="Phòng" />
        </Grid>
        <Grid size={4}>
          <ControlledSelect control={control} name="thang" label="Tháng" options={thangOptions} />
        </Grid>
        <Grid size={4}>
          <ControlledSelect control={control} name="nam" label="Năm" options={namOptions} />
        </Grid>
        <Grid size={4}>
          <ControlledSelect
            control={control}
            name="daChot"
            label="Trạng thái"
            options={[
              { value: 'true', label: 'Đã chốt' },
              { value: 'false', label: 'Chưa chốt' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
