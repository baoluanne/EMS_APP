import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';
import { LoaiThietBiSelection } from '@renderer/components/selections/equipManagement/LoaiThietBiSelection';
import { DanhSachThietBiFilterState } from '../type';
import { NhaCungCapSelection } from '@renderer/components/selections/equipManagement/NhaCungCapFilter';

// eslint-disable-next-line react-refresh/only-export-components
export const danhSachThietBiDefaultFilters: DanhSachThietBiFilterState = {
  id: undefined,
  loaiThietBiId: undefined,
  nhaCungCapId: undefined,
  maThietBi: undefined,
  tenThietBi: undefined,
  model: undefined,
  serialNumber: undefined,
};

interface Props {
  onApply: (filters: DanhSachThietBiFilterState) => void;
  onReset: () => void;
}
export const DanhSachThietBiFilter = ({ onApply, onReset }: Props) => {
  const filterMethods = useForm<DanhSachThietBiFilterState>({
    defaultValues: danhSachThietBiDefaultFilters,
  });

  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(danhSachThietBiDefaultFilters);
    onReset();
  };
  const handleApply = (data: DanhSachThietBiFilterState) => {
    const cleanedData: DanhSachThietBiFilterState = {
      loaiThietBiId: data.loaiThietBiId?.trim() ? data.loaiThietBiId.trim() : undefined,
      nhaCungCapId: data.nhaCungCapId?.trim() ? data.nhaCungCapId.trim() : undefined,
      maThietBi: data.maThietBi?.trim() ? data.maThietBi.trim() : undefined,
      tenThietBi: data.tenThietBi?.trim() ? data.tenThietBi.trim() : undefined,
      model: data.model?.trim() ? data.model.trim() : undefined,
      serialNumber: data.serialNumber?.trim() ? data.serialNumber.trim() : undefined,
    };

    onApply(cleanedData);
  };
  return (
    <FilterDrawerBottom<DanhSachThietBiFilterState>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <LoaiThietBiSelection control={control} name="loaiThietBiId" label="Loại thiết bị" />
        </Grid>
        <Grid size={6}>
          <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="maThietBi"
            label="Mã thiết bị"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="tenThietBi"
            label="Tên thiết bị"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="model"
            label="Model"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
        <Grid size={6}>
          <ControlledTextField
            control={control}
            name="serialNumber"
            label="Serial Number"
            placeholder="Nhập để tìm kiếm"
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
