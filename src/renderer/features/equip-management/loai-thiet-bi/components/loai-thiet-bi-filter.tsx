import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { LoaiThietBiFilterState } from '../type';

// eslint-disable-next-line react-refresh/only-export-components
export const loaiThietBiDefaultFilters: LoaiThietBiFilterState = {
  id: undefined,
  maLoai: undefined,
  tenLoai: undefined,
  moTa: undefined,
};

interface Props {
  onApply: (filters: LoaiThietBiFilterState) => void;
  onReset: () => void;
}
export const LoaiThietBiFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<LoaiThietBiFilterState>({
    defaultValues: loaiThietBiDefaultFilters,
  });

  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(loaiThietBiDefaultFilters);
    onReset();
  };
  const handleApply = (data: LoaiThietBiFilterState) => {
    const cleanedData: LoaiThietBiFilterState = {
      maLoai: data.maLoai?.trim() ? data.maLoai.trim() : undefined,
      tenLoai: data.tenLoai?.trim() ? data.tenLoai.trim() : undefined,
    };

    onApply(cleanedData);
  };
  return (
    <FilterDrawerBottom<LoaiThietBiFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="maLoai"
            label="Mã loại thiết bị"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="tenLoai"
            label="Tên loại thiết bị"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="moTa"
            label="Mô tả"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
