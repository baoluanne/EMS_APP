import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  ApDungQuyCheHocVu,
  ApDungQuyCheHocVuColumns,
  ApDungQuyCheHocVuForm,
  ApDungQuyCheHocVuSchema,
} from '@renderer/features/ap-dung-quy-che-hoc-vu';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idQuyCheTC: undefined,
  quyCheTC: undefined,
  idQuyCheNC: undefined,
  quyCheNC: undefined,
  choPhepNoMon: 0,
  choPhepNoDVHT: 0,
  ghiChu: undefined,
};

const ApDungQuyCheHocVuPage = () => {
  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
  } = useCrudPaginationModal<ApDungQuyCheHocVu, ApDungQuyCheHocVu>({
    defaultValues,
    schema: ApDungQuyCheHocVuSchema,
    entity: 'ApDungQuyCheHocVu',
    beforeEdit: (values) =>
      values && {
        ...values,
        quyChe: values.idQuyCheNC || values.idQuyCheTC,
      },
  });

  return (
    <FormProvider {...formMethods}>
      <Stack
        className="w-full h-full p-2"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
      >
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<ApDungQuyCheHocVu>({
              entity: 'ApDungQuyCheHocVu',
              filteredData: data?.result ?? [],
              columns: ApDungQuyCheHocVuColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_ap_dung_quy_che_hoc_vu',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={
              isAddMode ? 'Thêm mới áp dụng quy chế học vụ' : 'Cập nhật áp dụng quy chế học vụ'
            }
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <ApDungQuyCheHocVuForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <DataGridTable
          columns={ApDungQuyCheHocVuColumns}
          rows={data?.result}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) =>
            formMethods.reset({
              ...params.row,
              quyChe: params.row.idQuyCheNC || params.row.idQuyCheTC,
            })
          }
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default ApDungQuyCheHocVuPage;
