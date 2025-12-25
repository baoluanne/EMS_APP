import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { TimKiemLHPSchema, TimKiemLHPType } from '../validations';
import { TimKiemLopHocPhanFilter } from './TimKiemLopHocPhanFilter';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultThongTinTimKiemLHPState, LopHocPhanRecord } from '../types';
import { timKiemLHPColumns } from '../configs';
import { FormDetailsModal } from '@renderer/components/modals';
import { toast } from 'react-toastify';

interface Props {
  defaultIdHocKy?: string;
  onClose: () => void;
  onSelect: (lhp: LopHocPhanRecord) => void;
}

export const TimKiemLopHocPhanModal = ({ defaultIdHocKy, onClose, onSelect }: Props) => {
  const {
    data,
    isRefetching,
    handleRowSelectionModelChange,
    mergeParams,
    selectedRows,
    tableConfig,
  } = useCrudPaginationModal<any, TimKiemLHPType>({
    defaultValues: {},
    schema: TimKiemLHPSchema,
    entity: 'LopHocPhan',
    defaultState: {
      idHocKy: defaultIdHocKy,
    },
    endpoint: 'tim-kiem-lop-hoc-phan',
  });

  const filterMethods = useForm<TimKiemLHPType>({
    resolver: zodResolver(TimKiemLHPSchema),
    defaultValues: {
      ...defaultThongTinTimKiemLHPState,
      idHocKy: defaultIdHocKy,
    },
  });
  const handleSelectLHP = () => {
    if (selectedRows.ids.size !== 1) {
      toast.error('Vui lòng chỉ chọn một lớp học phần');
      return;
    }
    const lhp = data?.result.find((x) => selectedRows.ids.has(x.id)) as LopHocPhanRecord;
    if (!lhp) {
      toast.error('Không tìm thấy dữ liệu lớp học phần đã chọn.');
      return;
    }

    onSelect(lhp);
    onClose?.();
  };
  return (
    <FormDetailsModal
      title="Tìm kiếm lớp học phần"
      onClose={onClose}
      onSave={handleSelectLHP}
      saveTitle="Chấp nhận"
      cancelTitle="Đóng"
      isRefetching={isRefetching}
    >
      <Stack spacing={1}>
        <FormProvider {...filterMethods}>
          <TimKiemLopHocPhanFilter
            onApply={(values) => mergeParams(values)}
            methods={filterMethods}
          />
        </FormProvider>
        <DataGridTable
          columns={timKiemLHPColumns}
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
