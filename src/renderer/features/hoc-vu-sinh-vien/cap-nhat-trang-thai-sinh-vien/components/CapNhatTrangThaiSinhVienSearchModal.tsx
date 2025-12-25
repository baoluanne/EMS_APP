import { FormDetailsModal } from '@renderer/components/modals';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CapNhatTrangThaiSinhVienFilter } from '../types';
import { CapNhatTrangThaiSinhVienSearchForm } from './CapNhatTrangThaiSinhVienSearchForm';

interface CapNhatTrangThaiSinhVienSearchModalProps {
  onClose?: () => void;
  onSave?: () => void;
  filterMethods: UseFormReturn<CapNhatTrangThaiSinhVienFilter, any, CapNhatTrangThaiSinhVienFilter>;
}

export const CapNhatTrangThaiSinhVienSearchModal = ({
  onClose,
  onSave,
  filterMethods,
}: CapNhatTrangThaiSinhVienSearchModalProps) => {
  return (
    <FormProvider {...filterMethods}>
      <FormDetailsModal title="Tìm kiếm nâng cao" onClose={onClose} onSave={onSave}>
        <CapNhatTrangThaiSinhVienSearchForm />
      </FormDetailsModal>
    </FormProvider>
  );
};
