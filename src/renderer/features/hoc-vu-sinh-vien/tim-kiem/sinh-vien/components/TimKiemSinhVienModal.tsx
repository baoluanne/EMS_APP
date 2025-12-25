import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { DataGridTable } from '@renderer/components/Table';
import { TimKiemSinhVienFilterSchema, TimKiemSinhVienFilterType } from '../validations';
import { FormDetailsModal } from '@renderer/components/modals';
import { toast } from 'react-toastify';
import { SinhVien } from '@renderer/shared/types';
import { timKiemSVColumns } from '../configs';
import { TimKiemSinhVienFilter } from './TimKiemSinhVienFilter';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onSelect?: (sinhVien: SinhVien) => void;
}
export const TimKiemSinhVienModal = ({ onClose, onSelect }: Props) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    tableConfig,
    mergeParams,
  } = useCrudPaginationModal<any, TimKiemSinhVienFilterType>({
    defaultValues: undefined,
    schema: TimKiemSinhVienFilterSchema,
    entity: 'SinhVien',
    endpoint: 'tim-kiem-sinh-vien',
    enabled: !!enabled,
  });

  const handleSelectSV = () => {
    if (selectedRows.ids.size !== 1) {
      toast.error('Vui lòng chỉ chọn một sinh viên');
      return;
    }
    const sinhVien = data?.result.find((x) => selectedRows.ids.has(x.id)) as SinhVien;
    if (!sinhVien) {
      toast.error('Không tìm thấy dữ liệu sinh viên đã chọn.');
      return;
    }

    onSelect?.(sinhVien);
    onClose?.();
  };
  return (
    <FormDetailsModal
      title="Tìm kiếm sinh viên"
      onClose={onClose}
      onSave={handleSelectSV}
      saveTitle="Chấp nhận"
      cancelTitle="Đóng"
      isRefetching={isRefetching}
    >
      <Stack spacing={1}>
        <FormProvider {...formMethods}>
          <TimKiemSinhVienFilter
            onApply={(values) => {
              setEnabled(true);
              mergeParams(values);
            }}
            methods={formMethods}
            isRefetching={isRefetching}
          />
        </FormProvider>

        <DataGridTable
          columns={timKiemSVColumns}
          rows={data?.result}
          checkboxSelection
          loading={isRefetching}
          // onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height={300}
          {...tableConfig}
        />
      </Stack>
    </FormDetailsModal>
  );
};
