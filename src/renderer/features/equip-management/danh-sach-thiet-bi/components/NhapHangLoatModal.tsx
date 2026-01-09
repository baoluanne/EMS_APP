import { useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { FormDetailsModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { NhapHangLoatForm } from '@renderer/features/equip-management/danh-sach-thiet-bi/components/nhap-hang-loat-form';
import {
  NhapHangLoat,
  nhapHangLoatSchema,
} from '@renderer/features/equip-management/danh-sach-thiet-bi/validation';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultNhapHangLoatValues = {
  id: null,
  soLuong: 1,
  tenThietBi: '',
  loaiThietBiId: '',
  nhaCungCapId: '',
  model: undefined,
  thongSoKyThuat: undefined,
  nguyenGia: undefined,
  prefixMaThietBi: undefined,
};

interface NhapHangLoatModalProps {
  open: boolean;
  onClose: () => void;
  onSavedSuccess: () => void;
}

export const NhapHangLoatModal = ({ open, onClose, onSavedSuccess }: NhapHangLoatModalProps) => {
  const { formMethods, onSave: handleNhapHangLoatSave } = useCrudPaginationModal<
    NhapHangLoat,
    NhapHangLoat
  >({
    defaultValues: defaultNhapHangLoatValues,
    schema: nhapHangLoatSchema,
    entity: 'ThietBi/nhap-hang-loat',
  });

  const handleNhapHangLoatClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleNhapHangLoatSubmit = useCallback(async () => {
    await handleNhapHangLoatSave();
    onSavedSuccess();
    handleNhapHangLoatClose();
  }, [handleNhapHangLoatSave, onSavedSuccess, handleNhapHangLoatClose]);

  if (!open) return null;

  return (
    <FormProvider {...formMethods}>
      <FormDetailsModal
        open={open}
        onClose={handleNhapHangLoatClose}
        title="Nhập thiết bị hàng loạt"
        onSave={handleNhapHangLoatSubmit}
        maxWidth="md"
        titleMode={TITLE_MODE.COLORED}
      >
        <NhapHangLoatForm />
      </FormDetailsModal>
    </FormProvider>
  );
};
