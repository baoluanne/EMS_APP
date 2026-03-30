import { useCallback, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { FormDetailsModal } from '@renderer/components/modals';
import { LoaiThietBiSelection } from '@renderer/components/selections/equipManagement/LoaiThietBiSelection';
import { NhaCungCapSelection } from '@renderer/components/selections/equipManagement/NhaCungCapFilter';
import { TrangThaiThietBiEnum, TrangThaiThietBiOptions } from '../enums';
import {
  nhapHangLoatSchema,
  NhapHangLoat,
} from '@renderer/features/equip-management/danh-sach-thiet-bi/validation';
import { useMutation } from '@renderer/shared/mutations';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DEFAULT_QUANTITY = 10;
const CODE_PADDING_LENGTH = 4;

// ============================================================================
// Helper Functions
// ============================================================================

function getDefaultFormValues(): Partial<NhapHangLoat> {
  return {
    soLuong: DEFAULT_QUANTITY,
    tenThietBi: '',
    namSanXuat: new Date().getFullYear().toString(),
    ngayMua: new Date().toISOString().split('T')[0],
    trangThai: TrangThaiThietBiEnum.TrongKho,
  };
}

function createDeviceEntities(data: NhapHangLoat) {
  return Array.from({ length: data.soLuong }).map((_, index) =>
    createSingleDeviceEntity(data, index),
  );
}

function createSingleDeviceEntity(data: NhapHangLoat, index: number) {
  return {
    tenThietBi: data.tenThietBi,
    loaiThietBiId: data.loaiThietBiId,
    nhaCungCapId: data.nhaCungCapId,
    model: data.model ?? undefined,
    thongSoKyThuat: data.thongSoKyThuat ?? undefined,
    nguyenGia: data.nguyenGia,
    giaTriKhauHao: data.giaTriKhauHao,
    namSanXuat: data.namSanXuat ? Number(data.namSanXuat) : undefined,
    ngayMua: formatPurchaseDate(data.ngayMua),
    ngayHetHanBaoHanh: formatPurchaseDate(data.ngayHetHanBaoHanh),
    trangThai: data.trangThai ?? TrangThaiThietBiEnum.TrongKho,
    ghiChu: data.ghiChu ?? undefined,
    hinhAnhUrl: data.hinhAnh ?? undefined,
    maThietBi: generateDeviceCode(data.prefixMaThietBi, index),
  };
}

function formatPurchaseDate(date?: string | null): string | null {
  if (!date) return null;

  const datePart = date.includes('T') ? date.split('T')[0] : date;

  return `${datePart}T00:00:00Z`;
}

function generateDeviceCode(prefix: string | null | undefined, index: number): string | null {
  if (!prefix) return null;

  const sequence = String(index + 1).padStart(CODE_PADDING_LENGTH, '0');
  return `${prefix}${sequence}`;
}

export const NhapHangLoatModal = ({ open, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: createMultiple } = useMutation<any>('ThietBi/multiple');

  const formMethods = useForm<NhapHangLoat>({
    resolver: zodResolver(nhapHangLoatSchema),
    defaultValues: getDefaultFormValues(),
  });

  const onSubmit = useCallback(
    async (data: NhapHangLoat) => {
      setLoading(true);
      try {
        const entities = createDeviceEntities(data);
        await createMultiple(entities);

        toast.success(`Đã tạo thành công ${data.soLuong} thiết bị`);
        onSuccess();
        onClose();
        formMethods.reset();
      } catch (error: any) {
        toast.error(error?.message || 'Lỗi khi nhập hàng loạt');
      } finally {
        setLoading(false);
      }
    },
    [createMultiple, onSuccess, onClose, formMethods],
  );

  if (!open) return null;

  return (
    <FormDetailsModal
      title="Nhập hàng loạt thiết bị"
      onClose={onClose}
      onSave={formMethods.handleSubmit(onSubmit)}
      isRefetching={loading}
      maxWidth="sm" // Cập nhật thành md để rộng hơn, đủ chỗ chứa form chia cột
      saveTitle="Xác nhận tạo"
    >
      <FormProvider {...formMethods}>
        <Stack spacing={2}>
          <DeviceTypeSection control={formMethods.control} />
          <QuantityAndCodeSection control={formMethods.control} />
          <ModelAndSpecsSection control={formMethods.control} />
          <DatesAndStatusSection control={formMethods.control} />
          <PriceSection control={formMethods.control} />
          <NotesAndImageSection control={formMethods.control} />
        </Stack>
      </FormProvider>
    </FormDetailsModal>
  );
};

// ============================================================================
// Form Sections
// ============================================================================

function DeviceTypeSection({ control }: { control: any }) {
  return (
    <Stack spacing={2}>
      <LoaiThietBiSelection control={control} name="loaiThietBiId" label="Loại thiết bị" />
      <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />
    </Stack>
  );
}

function QuantityAndCodeSection({ control }: { control: any }) {
  return (
    <Stack direction="row" spacing={2}>
      <ControlledTextField name="tenThietBi" control={control} label="Tên thiết bị chung" />
      <ControlledTextField name="soLuong" control={control} label="Số lượng" type="number" />
      <ControlledTextField name="prefixMaThietBi" control={control} label="Tiền tố mã (VD: PC-)" />
    </Stack>
  );
}

function ModelAndSpecsSection({ control }: { control: any }) {
  return (
    <Stack direction="row" spacing={2}>
      <ControlledTextField name="model" control={control} label="Model" />
      <ControlledTextField name="thongSoKyThuat" control={control} label="Thông số kĩ thuật" />
    </Stack>
  );
}

function DatesAndStatusSection({ control }: { control: any }) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <ControlledTextField
          name="namSanXuat"
          control={control}
          label="Năm sản xuất"
          type="number"
        />
        <ControlledDatePicker name="ngayMua" control={control} label="Ngày mua" />
      </Stack>
      <Stack direction="row" spacing={2}>
        <ControlledDatePicker
          name="ngayHetHanBaoHanh"
          control={control}
          label="Ngày hết hạn bảo hành"
        />
        <FilterSelect
          label="Trạng thái"
          options={TrangThaiThietBiOptions.map((opt) => ({
            label: opt.label,
            value: opt.value.toString(),
          }))}
          name="trangThai"
          control={control}
        />
      </Stack>
    </Stack>
  );
}

function PriceSection({ control }: { control: any }) {
  return (
    <Stack direction="row" spacing={2}>
      <ControlledTextField name="nguyenGia" control={control} label="Nguyên giá" type="number" />
      <ControlledTextField
        name="giaTriKhauHao"
        control={control}
        label="Giá trị khấu hao"
        type="number"
      />
    </Stack>
  );
}

function NotesAndImageSection({ control }: { control: any }) {
  return (
    <Stack spacing={2}>
      <ControlledTextField name="ghiChu" control={control} label="Ghi chú" multiline rows={2} />
      <ControlledTextField name="hinhAnh" control={control} label="Hình ảnh (URL)" />
    </Stack>
  );
}
