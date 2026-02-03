import { useCallback, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FormDetailsModal } from '@renderer/components/modals';
import { LoaiThietBiSelection } from '@renderer/components/selections/equipManagement/LoaiThietBiSelection';
import { NhaCungCapSelection } from '@renderer/components/selections/equipManagement/NhaCungCapFilter';
import { TrangThaiThietBiEnum } from '@renderer/features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';
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
// Helper Functions (Outside component to avoid dependency issues)
// ============================================================================

function getDefaultFormValues(): Partial<NhapHangLoat> {
  return {
    soLuong: DEFAULT_QUANTITY,
    tenThietBi: '',
    namSanXuat: new Date().getFullYear().toString(),
    ngayMua: new Date().toISOString().split('T')[0],
    trangThai: TrangThaiThietBiEnum.MoiNhap,
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
    namSanXuat: Number(data.namSanXuat),
    ngayMua: formatPurchaseDate(data.ngayMua),
    trangThai: TrangThaiThietBiEnum.MoiNhap,
    ghiChu: data.ghiChu ?? undefined,
    maThietBi: generateDeviceCode(data.prefixMaThietBi, index),
  };
}

function formatPurchaseDate(date?: string | null): string | null {
  return date ? `${date}T00:00:00Z` : null;
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
      maxWidth="sm"
      saveTitle="Xác nhận tạo"
    >
      <FormProvider {...formMethods}>
        <Stack spacing={2}>
          <DeviceTypeSection control={formMethods.control} />
          <DeviceInfoSection control={formMethods.control} />
          <QuantityAndCodeSection control={formMethods.control} />
          <PriceAndModelSection control={formMethods.control} />
          <NotesSection control={formMethods.control} />
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
    <>
      <LoaiThietBiSelection control={control} name="loaiThietBiId" label="Loại thiết bị" />
      <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />
    </>
  );
}

function DeviceInfoSection({ control }: { control: any }) {
  return <ControlledTextField name="tenThietBi" control={control} label="Tên thiết bị chung" />;
}

function QuantityAndCodeSection({ control }: { control: any }) {
  return (
    <Stack direction="row" spacing={2}>
      <ControlledTextField name="soLuong" control={control} label="Số lượng" type="number" />
      <ControlledTextField name="prefixMaThietBi" control={control} label="Tiền tố mã (VD: PC-)" />
    </Stack>
  );
}

function PriceAndModelSection({ control }: { control: any }) {
  return (
    <Stack direction="row" spacing={2}>
      <ControlledTextField name="model" control={control} label="Model" />
      <ControlledTextField name="nguyenGia" control={control} label="Nguyên giá" type="number" />
    </Stack>
  );
}

function NotesSection({ control }: { control: any }) {
  return <ControlledTextField name="ghiChu" control={control} label="Ghi chú" multiline rows={2} />;
}
