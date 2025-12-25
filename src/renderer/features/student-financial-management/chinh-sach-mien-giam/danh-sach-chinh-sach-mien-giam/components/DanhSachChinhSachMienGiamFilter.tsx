import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { NamHocHocKySelection } from '@renderer/components/selections/NamHocHocKySelection';

const defaultFilters = {
  tenChinhSach: '',
  namHocHocKyId: '',
  apDungCho: '',
  loaiChinhSach: '',
};

export const ChinhSachMienGiamFilter = ({ onApply }: { onApply: (f: any) => void }) => {
  const methods = useForm({ defaultValues: defaultFilters });
  const { control } = methods;

  const handleClear = () => methods.reset(defaultFilters);

  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={methods}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <ControlledTextField control={control} name="tenChinhSach" label="Tên chính sách" />
        </Grid>

        <Grid size={3}>
          <NamHocHocKySelection control={control} name="namHocHocKyId" label="Năm học - Học kỳ" />
        </Grid>

        <Grid size={3}>
          <FilterSelect
            label="Phạm vi áp dụng"
            control={control}
            name="apDungCho"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Toàn trường', value: 'TatCa' },
              { label: 'Lớp học', value: 'Lop' },
              { label: 'Ngành học', value: 'Nganh' },
              { label: 'Sinh viên cụ thể', value: 'SinhVien' },
            ]}
          />
        </Grid>

        <Grid size={3}>
          <FilterSelect
            label="Loại giá trị"
            control={control}
            name="loaiChinhSach"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Theo phần trăm (%)', value: 'PhanTram' },
              { label: 'Số tiền cố định', value: 'SoTien' },
            ]}
          />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
