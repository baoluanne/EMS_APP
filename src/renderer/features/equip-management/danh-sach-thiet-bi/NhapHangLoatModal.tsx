import { useCallback, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { FormDetailsModal } from '@renderer/components/modals';
import { LoaiThietBiSelection } from '@renderer/components/selections/equipManagement/LoaiThietBiSelection';
import { NhaCungCapSelection } from '@renderer/components/selections/equipManagement/NhaCungCapFilter';
import {
  TrangThaiThietBiOptions,
  TrangThaiThietBiEnum,
} from '@renderer/features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';
import {
  nhapHangLoatSchema,
  NhapHangLoat,
} from '@renderer/features/equip-management/danh-sach-thiet-bi/validation';

interface NhapHangLoatResultDto {
  soLuongTaoThanhCong: number;
  danhSachIdThietBi: string[];
  danhSachMaThietBi: string[];
  thoiGianTao: string;
}

interface NhapHangLoatModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (resultData: NhapHangLoatResultDto) => void;
  onSubmitBulk?: (data: any) => Promise<NhapHangLoatResultDto>;
  refetch?: (() => void) | (() => Promise<any>);
}

const defaultValues = {
  id: undefined,
  soLuong: 10,
  tenThietBi: '',
  loaiThietBiId: '',
  nhaCungCapId: '',
  model: '',
  thongSoKyThuat: '',
  nguyenGia: undefined,
  namSanXuat: new Date().getFullYear().toString(),
  ngayMua: new Date().toISOString().split('T')[0],
  ngayHetHanBaoHanh: undefined,
  giaTriKhauHao: undefined,
  trangThai: TrangThaiThietBiEnum.MoiNhap,
  ghiChu: '',
};

export const NhapHangLoatModal = ({
  open,
  onClose,
  onSuccess,
  onSubmitBulk,
  refetch,
}: NhapHangLoatModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<NhapHangLoat>({
    resolver: zodResolver(nhapHangLoatSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { control } = formMethods;

  const formatDateForSave = (dateString: string | null | undefined): string | null => {
    if (!dateString) return null;
    if (dateString.includes('T')) return dateString;
    return `${dateString}T00:00:00Z`;
  };

  const onSubmit = useCallback(
    async (data: NhapHangLoat) => {
      try {
        setIsSubmitting(true);

        const transformedData = {
          ...data,
          soLuong: Number(data.soLuong),
          ngayMua: formatDateForSave(data.ngayMua),
          ngayHetHanBaoHanh: formatDateForSave(data.ngayHetHanBaoHanh),
          trangThai:
            data.trangThai !== null && data.trangThai !== undefined
              ? Number(data.trangThai)
              : TrangThaiThietBiEnum.MoiNhap,
        };
        let result: NhapHangLoatResultDto;

        if (onSubmitBulk) {
          result = await onSubmitBulk(transformedData);
        } else {
          result = {
            soLuongTaoThanhCong: transformedData.soLuong,
            danhSachIdThietBi: [],
            danhSachMaThietBi: [],
            thoiGianTao: new Date().toISOString(),
          };
        }

        if (result) {
          formMethods.reset(defaultValues);

          if (onSuccess) {
            setTimeout(async () => {
              if (refetch) {
                const refetchResult = refetch();
                if (refetchResult instanceof Promise) {
                  await refetchResult;
                }
              }
              onSuccess(result);
            }, 500);
          }

          onClose();
        }
      } catch (error: any) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmitBulk, formMethods, onSuccess, refetch, onClose],
  );

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      formMethods.reset(defaultValues);
      onClose();
    }
  }, [isSubmitting, formMethods, onClose]);

  //   const handleReset = useCallback(() => {
  //     formMethods.reset(defaultValues);
  //   }, [formMethods]);

  if (!open) return null;

  return (
    <FormDetailsModal
      title="Nhập hàng loạt thiết bị"
      onClose={handleClose}
      onSave={formMethods.handleSubmit(onSubmit)}
      isRefetching={isSubmitting}
      maxWidth="sm"
      saveTitle="Tạo thiết bị"
      cancelTitle="Hủy"
    >
      <FormProvider {...formMethods}>
        <Stack spacing={2}>
          <LoaiThietBiSelection control={control} name="loaiThietBiId" label="Loại thiết bị" />
          <NhaCungCapSelection control={control} name="nhaCungCapId" label="Nhà cung cấp" />

          <Stack direction="row" spacing={2}>
            <ControlledTextField
              name="tenThietBi"
              control={control}
              label="Tên thiết bị"
              helperText=""
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <ControlledTextField
              name="soLuong"
              control={control}
              label="Số lượng"
              type="number"
              inputProps={{ min: 1, max: 1000 }}
              helperText=""
            />
            <ControlledTextField
              name="prefixMaThietBi"
              control={control}
              label="Tiền tố mã thiết bị"
              placeholder="VD: PC-, PROJECTOR-..."
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <ControlledTextField name="model" control={control} label="Model" />
            <ControlledTextField
              name="thongSoKyThuat"
              control={control}
              label="Thông số kỹ thuật"
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <ControlledTextField
              name="namSanXuat"
              control={control}
              label="Năm sản xuất"
              type="number"
            />
            <ControlledTextField
              name="nguyenGia"
              control={control}
              label="Nguyên giá"
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
            disabled
          />
          <ControlledTextField name="ghiChu" control={control} label="Ghi chú" multiline rows={2} />
        </Stack>
      </FormProvider>
    </FormDetailsModal>
  );
};
