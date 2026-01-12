import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledDatePicker, ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { LoaiThietBiSelection } from '@renderer/components/selections/equipManagement/LoaiThietBiSelection';
import { NhaCungCapSelection } from '@renderer/components/selections/equipManagement/NhaCungCapFilter';
import { TrangThaiThietBiOptions } from '@renderer/features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';

export const DanhSachThietBiForm = () => {
  const { control, register } = useFormContext();

  return (
    <Stack spacing={2}>
      <input type="hidden" {...register('id')} />

      <LoaiThietBiSelection control={control} name="loaiThietBiId" label="Loại thiết bị" />
      <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />

      <Stack direction="row" spacing={2}>
        <ControlledTextField name="maThietBi" control={control} label="Mã thiết bị" helperText="" />
        <ControlledTextField
          name="tenThietBi"
          control={control}
          label="Tên thiết bị"
          helperText=""
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <ControlledTextField name="model" control={control} label="Model" helperText="" />
        <ControlledTextField
          name="serialNumber"
          control={control}
          label="Serial Number"
          helperText=""
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <ControlledTextField
          name="thongSoKyThuat"
          control={control}
          label="Thông số kĩ thuật"
          helperText=""
        />
        <ControlledTextField
          name="namSanXuat"
          control={control}
          label="Năm sản xuất"
          type="number"
          helperText=""
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <ControlledDatePicker name="ngayMua" control={control} label="Ngày mua" />
        <ControlledDatePicker
          name="ngayHetHanBaoHanh"
          control={control}
          label="Ngày hết hạn bảo hành"
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <ControlledTextField
          name="nguyenGia"
          control={control}
          label="Nguyên giá"
          type="number"
          helperText=""
        />
        <ControlledTextField
          name="giaTriKhauHao"
          control={control}
          label="Giá trị khấu hao"
          type="number"
          helperText=""
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

      <ControlledTextField
        name="ghiChu"
        control={control}
        label="Ghi chú"
        multiline
        rows={3}
        helperText=""
      />

      <ControlledTextField name="hinhAnh" control={control} label="Hình ảnh (URL)" helperText="" />
    </Stack>
  );
};
