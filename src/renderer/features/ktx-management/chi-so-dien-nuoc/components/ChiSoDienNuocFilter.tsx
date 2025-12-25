import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/phongSelection';
import { useForm } from 'react-hook-form';

const thangOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Tháng ${i + 1}`,
}));

const currentYear = new Date().getFullYear();
const namOptions = Array.from({ length: 10 }, (_, i) => ({
  value: currentYear - i,
  label: `${currentYear - i}`,
}));

export interface ChiSoDienNuocFilterState {
  toaNhaId?: string;
  phongId?: string;
  thang?: number;
  nam?: number;
  daChot?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const chiSoDienNuocDefaultFilters: ChiSoDienNuocFilterState = {
  toaNhaId: undefined,
  phongId: undefined,
  thang: undefined,
  nam: undefined,
  daChot: undefined,
};

interface Props {
  onApply: (filters: ChiSoDienNuocFilterState) => void;
}

export const ChiSoDienNuocFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<ChiSoDienNuocFilterState>({
    defaultValues: chiSoDienNuocDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(chiSoDienNuocDefaultFilters);
    onApply(chiSoDienNuocDefaultFilters);
  };

  const handleApply = (data: ChiSoDienNuocFilterState) => {
    const cleanedData: ChiSoDienNuocFilterState = {};

    if (data.toaNhaId?.trim()) cleanedData.toaNhaId = data.toaNhaId.trim();
    if (data.phongId?.trim()) cleanedData.phongId = data.phongId.trim();
    if (data.thang) cleanedData.thang = Number(data.thang);
    if (data.nam) cleanedData.nam = Number(data.nam);
    if (data.daChot !== undefined) cleanedData.daChot = data.daChot;

    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<ChiSoDienNuocFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <PhongSelection control={control} name="phongId" label="Phòng" />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <ControlledSelect
            control={control}
            name="thang"
            label="Tháng"
            options={[{ value: '', label: '-- Tất cả --' }, ...thangOptions]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <ControlledSelect
            control={control}
            name="nam"
            label="Năm"
            options={[{ value: '', label: '-- Tất cả --' }, ...namOptions]}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <ControlledSelect
            control={control}
            name="daChot"
            label="Trạng thái chốt"
            options={[
              { value: '', label: '-- Tất cả --' },
              { value: 'true', label: '✓ Đã chốt' },
              { value: 'false', label: '✗ Chưa chốt' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
