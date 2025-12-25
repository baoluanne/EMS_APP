import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { useFormContext, useWatch } from 'react-hook-form';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';
import { NamHocHocKySelection } from '@renderer/components/selections/NamHocHocKySelection';

import { LopHocSelection } from '@renderer/components/selections/LopHocSelection';
export const ChinhSachMienGiamForm = () => {
  const { control } = useFormContext();

  const apDungCho = useWatch({ control, name: 'apDungCho' });

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <ControlledTextField
          name="tenChinhSach"
          control={control}
          label="Tên chính sách"
          required
        />
      </Grid>
      <Grid size={4}>
        <FilterSelect
          label="Hình thức giảm"
          options={[
            { label: 'Theo phần trăm (%)', value: 'PhanTram' },
            { label: 'Số tiền cố định (VNĐ)', value: 'SoTien' },
          ]}
          control={control}
          name="loaiChinhSach"
          required
        />
      </Grid>
      <Grid size={4}>
        <ControlledTextField
          name="giaTri"
          control={control}
          label="Giá trị miễn giảm"
          type="number"
          required
          inputProps={{ min: 0 }}
          helperText="Nhập số % hoặc số tiền cụ thể"
        />
      </Grid>
      <Grid size={4}>
        <NamHocHocKySelection
          control={control}
          name="namHocHocKyId"
          label="Năm học - Học kỳ"
          required
        />
      </Grid>
      <Grid size={6}>
        <FilterSelect
          label="Phạm vi áp dụng"
          options={[
            { label: 'Toàn trường', value: 'TatCa' },
            { label: 'Theo Lớp học', value: 'Lop' },
            { label: 'Đối tượng chính sách', value: 'DoiTuong' },
          ]}
          control={control}
          name="apDungCho"
          required
        />
      </Grid>
      {apDungCho === 'Lop' && (
        <Grid size={6}>
          <LopHocSelection control={control} name="doiTuongId" label="Chọn lớp áp dụng" required />
        </Grid>
      )}
      <Grid size={6}>
        <ControlledDatePicker name="ngayBatDau" control={control} label="Ngày bắt đầu" />
      </Grid>

      <Grid size={6}>
        <ControlledDatePicker name="ngayKetThuc" control={control} label="Ngày kết thúc" />
      </Grid>
      <Grid size={12}>
        <ControlledTextField
          name="ghiChu"
          control={control}
          label="Ghi chú / Mô tả chi tiết"
          multiline
          rows={3}
        />
      </Grid>
    </Grid>
  );
};
