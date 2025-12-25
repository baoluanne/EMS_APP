import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';

export interface ToaNhaFilterState {
  tenToaNha?: string;
  loaiToaNha?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const toaNhaDefaultFilters: ToaNhaFilterState = {
  tenToaNha: undefined,
  loaiToaNha: undefined,
};

interface Props {
  onApply: (filters: ToaNhaFilterState) => void;
  onReset: () => void;
}

export const ToaNhaFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<ToaNhaFilterState>({
    defaultValues: toaNhaDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(toaNhaDefaultFilters);
    onReset();
  };

  const handleApply = (data: ToaNhaFilterState) => {
    const cleanedData: ToaNhaFilterState = {
      tenToaNha: data.tenToaNha?.trim() ? data.tenToaNha.trim() : undefined,
      loaiToaNha: data.loaiToaNha?.trim() ? data.loaiToaNha.trim() : undefined,
    };

    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<ToaNhaFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="tenToaNha"
            label="Tên tòa nhà"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="loaiToaNha"
            label="Loại tòa nhà"
            placeholder="Nam, Nữ, Hỗn hợp..."
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
