import { MenuItem, Stack, TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { LoaiThietBiSelection } from '@renderer/components/selections/equipManagement/LoaiThietBiSelection';
import { NhaCungCapSelection } from '@renderer/components/selections/equipManagement/NhaCungCapFilter';
import { TrangThaiThietBiOptions } from '@renderer/features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';

const formatDateForDisplay = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
};

export const DanhSachThietBiForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />
      <LoaiThietBiSelection control={control} name="loaiThietBiId" label="Loại thiết bị" />
      <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />
      <TextField
        label="Mã thiết bị"
        fullWidth
        {...register('maThietBi')}
        error={!!errors.maThietBi?.message}
        helperText={errors.maThietBi?.message ? (errors.maThietBi.message as string) : ''}
      />
      <TextField
        label="Tên thiết bị"
        fullWidth
        {...register('tenThietBi')}
        error={!!errors.tenThietBi?.message}
        helperText={errors.tenThietBi?.message ? (errors.tenThietBi.message as string) : ''}
      />
      <TextField
        label="Model"
        fullWidth
        {...register('model')}
        error={!!errors.model?.message}
        helperText={errors.model?.message ? (errors.model.message as string) : ''}
      />
      <TextField
        label="Serial Number"
        fullWidth
        {...register('serialNumber')}
        error={!!errors.serialNumber?.message}
        helperText={errors.serialNumber?.message ? (errors.serialNumber.message as string) : ''}
      />
      <TextField
        label="Thông số kĩ thuật"
        fullWidth
        {...register('thongSoKyThuat')}
        error={!!errors.thongSoKyThuat?.message}
        helperText={errors.thongSoKyThuat?.message ? (errors.thongSoKyThuat.message as string) : ''}
      />
      <TextField
        label="Năm sản xuất"
        fullWidth
        type="number"
        {...register('namSanXuat', { valueAsNumber: true })}
        error={!!errors.namSanXuat?.message}
        helperText={errors.namSanXuat?.message ? (errors.namSanXuat.message as string) : ''}
      />
      <Controller
        name="ngayMua"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Ngày mua"
            type="date"
            fullWidth
            value={formatDateForDisplay(field.value) || ''}
            onChange={(e) => field.onChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors.ngayMua?.message}
            helperText={errors.ngayMua?.message ? (errors.ngayMua.message as string) : ''}
          />
        )}
      />
      <Controller
        name="ngayHetHanBaoHanh"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Ngày hết hạn bảo hành"
            type="date"
            fullWidth
            value={formatDateForDisplay(field.value) || ''}
            onChange={(e) => field.onChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors.ngayHetHanBaoHanh?.message}
            helperText={
              errors.ngayHetHanBaoHanh?.message ? (errors.ngayHetHanBaoHanh.message as string) : ''
            }
          />
        )}
      />
      <TextField
        label="Nguyên giá"
        type="number"
        fullWidth
        {...register('nguyenGia', { valueAsNumber: true })}
        error={!!errors.nguyenGia?.message}
        helperText={errors.nguyenGia?.message ? (errors.nguyenGia.message as string) : ''}
      />
      <TextField
        label="Giá trị khấu hao"
        type="number"
        fullWidth
        {...register('giaTriKhauHao', { valueAsNumber: true })}
        error={!!errors.giaTriKhauHao?.message}
        helperText={errors.giaTriKhauHao?.message ? (errors.giaTriKhauHao.message as string) : ''}
      />
      <TextField
        label="Ghi chú"
        fullWidth
        multiline
        rows={4}
        {...register('ghiChu')}
        error={!!errors.ghiChu?.message}
        helperText={errors.ghiChu?.message ? (errors.ghiChu.message as string) : ''}
      />
      <TextField
        label="Hình ảnh (URL)"
        fullWidth
        {...register('hinhAnh')}
        error={!!errors.hinhAnh?.message}
        helperText={errors.hinhAnh?.message ? (errors.hinhAnh.message as string) : ''}
      />
      <Controller
        name="trangThai"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Trạng thái"
            fullWidth
            value={field.value ?? ''}
            onChange={(e) => field.onChange(Number(e.target.value))}
            error={!!errors.trangThai?.message}
            helperText={errors.trangThai?.message ? (errors.trangThai.message as string) : ''}
          >
            {TrangThaiThietBiOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Stack>
  );
};
