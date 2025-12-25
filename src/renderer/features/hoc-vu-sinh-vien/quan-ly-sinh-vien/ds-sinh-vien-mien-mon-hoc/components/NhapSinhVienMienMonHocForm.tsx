import { NhapSinhVienMienMonHocFilters } from './NhapSinhVienMienMonHocFilters';
import {
  danhSachMonHocDuocMienColumns,
  defaultSVFiltersValues,
  NhapSinhVienMienMonHocFormRef,
  SinhVienMienMonHocFilter,
  sinhVienMienMonHocFilterSchema,
  SinhVienMienMonHocPayload,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/ds-sinh-vien-mien-mon-hoc';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { DataGridTable } from '@renderer/components/Table';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const NhapSinhVienMienMonHocForm = forwardRef<NhapSinhVienMienMonHocFormRef, {}>(
  (_props, ref) => {
    const [enabled, setEnabled] = useState<boolean>(false);
    const {
      formMethods,
      data,
      isRefetching,
      handleRowSelectionModelChange,
      selectedRows,
      tableConfig,
      mergeParams,
    } = useCrudPaginationModal<SinhVienMienMonHocFilter, SinhVienMienMonHocFilter>({
      defaultValues: {},
      schema: sinhVienMienMonHocFilterSchema,
      entity: 'ChiTietKhungHocKy_TinChi',
      enabled: !!enabled,
      endpoint: 'chuong-trinh-khung-mon-hoc-pagination',
    });
    const filterMethods = useForm<SinhVienMienMonHocFilter>({
      defaultValues: defaultSVFiltersValues,
    });

    useImperativeHandle(ref, () => ({
      getFormDataToSave: () => {
        const idQuyetDinh = filterMethods.getValues('idQuyetDinh');
        const idSinhVien = filterMethods.getValues('idSinhVien');
        if (!idSinhVien) {
          toast.error('Chưa chọn sinh viên.');
          return null;
        }
        if (!selectedRows || selectedRows.ids.size === 0) {
          toast.error('Chưa chọn môn học để miễn.');
          return null;
        }
        const idList = data?.result
          .filter((item) => selectedRows.ids.has(item.id))
          .map((item) => item.idMonHocBacDaoTao);

        const payload: SinhVienMienMonHocPayload = {
          idSinhVien: idSinhVien,
          idMonHocBacDaoTaos: idList as string[],
          idQuyetDinh: idQuyetDinh,
        };

        return payload;
      },
    }));

    return (
      <>
        <FormProvider {...filterMethods}>
          <NhapSinhVienMienMonHocFilters
            onApplyFilter={(values) => {
              setEnabled(true);
              mergeParams(values);
            }}
            filterMethods={filterMethods}
          />
        </FormProvider>

        <DataGridTable
          columns={danhSachMonHocDuocMienColumns}
          rows={data?.result}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height={400}
          {...tableConfig}
        />
      </>
    );
  },
);

NhapSinhVienMienMonHocForm.displayName = 'NhapSinhVienMienMonHocForm';
