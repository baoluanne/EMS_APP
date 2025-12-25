// src/renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-sinh-vien-nhan-mien-giam/components/DanhSachSinhVienNhanMienGiamFilter.tsx
import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields'; // DÙNG FilterSelect CHO TRẠNG THÁI
import { NamHocSelection } from '@renderer/components/selections/NamHocSelection';

const defaultFilters = {
  maSinhVien: '',
  hoTen: '',
  namHocId: '',
  trangThai: '',
};

interface Props {
  onApply: (filters: any) => void;
}

export const DanhSachSinhVienNhanMienGiamFilter = ({ onApply }: Props) => {
  const methods = useForm({ defaultValues: defaultFilters });
  const { control } = methods;

  const handleClear = () => methods.reset(defaultFilters);

  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={methods}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <ControlledTextField control={control} name="maSinhVien" label="Mã sinh viên" />
        </Grid>
        <Grid size={4}>
          <ControlledTextField control={control} name="hoTen" label="Họ tên" />
        </Grid>
        <Grid size={4}>
          <NamHocSelection control={control} name="namHocId" />
        </Grid>
        <Grid size={4}>
          <FilterSelect
            control={control}
            name="trangThai"
            label="Trạng thái"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Chờ duyệt', value: 'ChoDuyet' },
              { label: 'Đã duyệt', value: 'DaDuyet' },
              { label: 'Từ chối', value: 'TuChoi' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
