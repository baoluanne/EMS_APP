import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { ToaNhaFilterState } from '../type';
import { LOAI_TOA_NHA_OPTIONS } from '../LoaiToaNhaEnums';
import { Grid, MenuItem } from '@mui/material';

// Định nghĩa default filters
// eslint-disable-next-line react-refresh/only-export-components
export const toaNhaDefaultFilters: ToaNhaFilterState = {
  tenToaNha: undefined,
  loaiToaNha: undefined,
  ghiChu: undefined,
  soTang: undefined,
};

// Định nghĩa Props bị thiếu
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
      tenToaNha: data.tenToaNha?.trim() || undefined,
      ghiChu: data.ghiChu?.trim() || undefined,
      soTang: data.soTang !== undefined && data.soTang !== null ? Number(data.soTang) : undefined,
      loaiToaNha:
        data.loaiToaNha !== undefined && data.loaiToaNha !== null
          ? Number(data.loaiToaNha)
          : undefined,
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
        <Grid size={3}>
          <ControlledTextField
            control={control}
            name="tenToaNha"
            label="Tên tòa nhà"
            placeholder="Nhập tên tòa nhà để tìm kiếm"
          />
        </Grid>
        <Grid size={3}>
          <ControlledTextField
            select
            control={control}
            name="loaiToaNha"
            label="Loại tòa nhà"
            placeholder="Chọn loại tòa nhà"
          >
            <MenuItem value="">Tất cả</MenuItem>
            {LOAI_TOA_NHA_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </ControlledTextField>
        </Grid>
        <Grid size={3}>
          <ControlledTextField
            control={control}
            name="soTang"
            label="Số Tầng"
            placeholder="Nhập số tầng để tìm kiếm"
          />
        </Grid>
        <Grid size={3}>
          <ControlledTextField
            control={control}
            name="ghiChu"
            label="Ghi Chú"
            placeholder="Nhập ghi chú để tìm kiếm"
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
