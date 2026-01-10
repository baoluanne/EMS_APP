import { Stack } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
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
  const { control } = useFormContext();

  return (
    <Stack spacing={2}>
      <input type="hidden" {...useFormContext().register('id')} />

      <LoaiThietBiSelection control={control} name="loaiThietBiId" label="Loại thiết bị" />
      <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />

      <Stack direction="row" spacing={2}>
        <ControlledTextField name="maThietBi" control={control} label="Mã thiết bị" />
        <ControlledTextField name="tenThietBi" control={control} label="Tên thiết bị" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <ControlledTextField name="model" control={control} label="Model" />
        <ControlledTextField name="serialNumber" control={control} label="Serial Number" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <ControlledTextField name="thongSoKyThuat" control={control} label="Thông số kĩ thuật" />
        <ControlledTextField
          name="namSanXuat"
          control={control}
          label="Năm sản xuất"
          type="number"
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Controller
          name="ngayMua"
          control={control}
          render={({ field }) => (
            <ControlledTextField
              name="ngayMua"
              control={control}
              label="Ngày mua"
              type="date"
              value={formatDateForDisplay(field.value) || ''}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="ngayHetHanBaoHanh"
          control={control}
          render={({ field }) => (
            <ControlledTextField
              name="ngayHetHanBaoHanh"
              control={control}
              label="Ngày hết hạn bảo hành"
              type="date"
              value={formatDateForDisplay(field.value) || ''}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <ControlledTextField name="nguyenGia" control={control} label="Nguyên giá" type="number" />
        <ControlledTextField
          name="giaTriKhauHao"
          control={control}
          label="Giá trị khấu hao"
          type="number"
        />
      </Stack>
      <FilterSelect
        label="Trạng thái"
        options={TrangThaiThietBiOptions.map((opt) => ({
          label: opt.label,
          value: opt.value.toString(),
        }))}
        name="trangThai"
        control={control}
      />
      <ControlledTextField name="ghiChu" control={control} label="Ghi chú" multiline rows={3} />

      <ControlledTextField name="hinhAnh" control={control} label="Hình ảnh (URL)" />
    </Stack>
  );
};
