import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';
import { NamHocHocKySelection } from '@renderer/components/selections/NamHocHocKySelection';

const defaultFilters = {
  maSinhVien: '',
  hoTen: '',
  namHocHocKyId: '',
  ngayThuFrom: null,
  ngayThuTo: null,
  hinhThucThanhToan: '',
};

interface Props {
  onApply: (filters: any) => void;
}

export const DanhSachPhieuThuFilter = ({ onApply }: Props) => {
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
          <ControlledTextField control={control} name="hoTen" label="Họ tên sinh viên" />
        </Grid>

        <Grid size={4}>
          {/* Thêm Selection Năm học học kỳ */}
          <NamHocHocKySelection control={control} name="namHocHocKyId" label="Học kỳ" />
        </Grid>

        <Grid size={4}>
          <FilterSelect
            control={control}
            name="hinhThucThanhToan"
            label="Hình thức thanh toán"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Tiền mặt', value: 'TienMat' },
              { label: 'Chuyển khoản', value: 'ChuyenKhoan' },
              { label: 'Thẻ tín dụng', value: 'TheTinDung' },
            ]}
          />
        </Grid>
        <Grid size={4}>
          <ControlledDatePicker control={control} name="ngayThuFrom" label="Ngày thu từ" />
        </Grid>
        <Grid size={4}>
          <ControlledDatePicker control={control} name="ngayThuTo" label="Ngày thu đến" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
