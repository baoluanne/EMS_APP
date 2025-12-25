// src/renderer/features/student-financial-management/quan-ly-cong-no/hoan-tien-sinh-vien/components/DanhSachPhieuChiForm.tsx
import { Grid } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { FilterSelect } from '@renderer/components/fields';
export const DanhSachPhieuChiForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <SinhVienSelection control={control} name="sinhVienId" label="Sinh viên" required />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          name="soTien"
          control={control}
          label="Số tiền hoàn (VNĐ)"
          type="number"
          required
        />
      </Grid>

      <Grid size={12}>
        <ControlledTextField
          name="lyDoChi"
          control={control}
          label="Lý do hoàn tiền"
          multiline
          rows={4}
          required
        />
      </Grid>

      <Grid size={12}>
        <FilterSelect
          control={control}
          name="hinhThucChi"
          label="Hình thức hoàn"
          options={[
            { label: 'Tiền mặt', value: 'TienMat' },
            { label: 'Chuyển khoản', value: 'ChuyenKhoan' },
            { label: 'Thẻ tín dụng', value: 'TheTinDung' },
            { label: 'Khác', value: 'Khac' },
          ]}
          required
        />
      </Grid>
    </Grid>
  );
};
