import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';

export interface FilterValues {
  maSinhVien?: string;
  hoTen?: string;
  trangThai?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const donSinhVienDefaultFilters: FilterValues = {
  maSinhVien: undefined,
  hoTen: undefined,
  trangThai: undefined,
};

const trangThaiOptions = [
  { value: 'ChoPheDuyet', label: 'Chờ duyệt' },
  { value: 'DaDuyet', label: 'Đã duyệt' },
  { value: 'TuChoi', label: 'Từ chối' },
];

interface Props {
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
}

export const DonSinhVienFilter = ({ onFilter, onReset }: Props) => {
  const filterMethods = useForm<FilterValues>({
    defaultValues: donSinhVienDefaultFilters,
  });

  const { control } = filterMethods;

  const handleClear = () => {
    filterMethods.reset(donSinhVienDefaultFilters);
    onReset();
  };

  const handleApply = (data: FilterValues) => {
    const cleanedData: FilterValues = {
      maSinhVien: data.maSinhVien?.trim() ? data.maSinhVien.trim() : undefined,
      hoTen: data.hoTen?.trim() ? data.hoTen.trim() : undefined,
      trangThai: data.trangThai?.trim() ? data.trangThai.trim() : undefined,
    };

    onFilter(cleanedData);
  };

  return (
    <FilterDrawerBottom<FilterValues>
      onApply={handleApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <ControlledTextField
            control={control}
            name="maSinhVien"
            label="Mã sinh viên"
            placeholder="Tìm theo mã..."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <ControlledTextField
            control={control}
            name="hoTen"
            label="Họ tên"
            placeholder="Tìm theo tên..."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <ControlledSelect
            control={control}
            name="trangThai"
            label="Trạng thái"
            options={[{ value: '', label: '-- Tất cả --' }, ...trangThaiOptions]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
