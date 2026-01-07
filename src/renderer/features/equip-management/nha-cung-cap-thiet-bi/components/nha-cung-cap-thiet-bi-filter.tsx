import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { NhaCungCapFilterState } from '../type';

// eslint-disable-next-line react-refresh/only-export-components
export const nhaCungCapDefaultFilters: NhaCungCapFilterState = {
  id: undefined,
  tenNhaCungCap: undefined,
  dienThoai: undefined,
  email: undefined,
  diaChi: undefined,
  ghiChu: undefined,
};

interface Props {
  onApply: (filters: NhaCungCapFilterState) => void;
  onReset: () => void;
}

export const NhaCungCapFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<NhaCungCapFilterState>({
    defaultValues: nhaCungCapDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(nhaCungCapDefaultFilters);
    onReset();
  };

  const handleApply = (data: NhaCungCapFilterState) => {
    const cleanedData: NhaCungCapFilterState = {
      tenNhaCungCap: data.tenNhaCungCap?.trim() ? data.tenNhaCungCap.trim() : undefined,
      dienThoai: data.dienThoai?.toString().trim() ? data.dienThoai.toString().trim() : undefined,
      email: data.email?.trim() ? data.email.trim() : undefined,
      diaChi: data.diaChi?.trim() ? data.diaChi.trim() : undefined,
    };

    onApply(cleanedData);
  };

  return (
    <FilterDrawerBottom<NhaCungCapFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="tenNhaCungCap"
            label="Tên nhà cung cấp"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="dienThoai"
            label="Điện thoại"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="email"
            label="Email"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="diaChi"
            label="Địa chỉ"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
