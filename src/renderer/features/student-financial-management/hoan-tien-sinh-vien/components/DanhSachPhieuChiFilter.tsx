// src/renderer/features/student-financial-management/hoan-tien-sinh-vien/components/DanhSachPhieuChiFilter.tsx
import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields'; // Thêm FilterSelect cho select
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';

const defaultFilters = {
  maSinhVien: '',
  hoTen: '',
  ngayChiFrom: '',
  ngayChiTo: '',
  hinhThucChi: '',
};

interface Props {
  onApply: (filters: any) => void;
}

export const DanhSachPhieuChiFilter = ({ onApply }: Props) => {
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
          <FilterSelect // SỬA: Dùng FilterSelect cho options
            control={control}
            name="hinhThucChi"
            label="Hình thức hoàn"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Tiền mặt', value: 'TienMat' },
              { label: 'Chuyển khoản', value: 'ChuyenKhoan' },
            ]}
          />
        </Grid>
        <Grid size={6}>
          <ControlledDatePicker control={control} name="ngayChiFrom" label="Ngày chi từ" />
        </Grid>
        <Grid size={6}>
          <ControlledDatePicker control={control} name="ngayChiTo" label="Ngày chi đến" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
