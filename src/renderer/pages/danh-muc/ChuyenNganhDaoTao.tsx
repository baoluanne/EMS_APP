import { Stack } from '@mui/material';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  ChuyenNganh,
  ChuyenNganhColumns,
  ChuyenNganhForm,
  ChuyenNganhSchema,
} from '@renderer/features/danh-muc/chuyen-nganh';
import {
  chuyenNganhDefaultValuesFilter,
  ChuyenNganhFilter,
} from '@renderer/features/danh-muc/chuyen-nganh/components/ChuyenNganhFilter';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  id: undefined,
  maChuyenNganh: undefined,
  tenChuyenNganh: undefined,
  idNganhHoc: undefined,
  maNganhTuQuan: undefined,
  ghiChu: undefined,
  stt: undefined,
  tenVietTat: undefined,
  tenTiengAnh: undefined,
  isVisible: undefined,
};

const ChuyenNganhDaoTaoPage = () => {
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
    mergeParams,
  } = useCrudPaginationModal<ChuyenNganh, ChuyenNganh>({
    defaultValues,
    schema: ChuyenNganhSchema,
    entity: 'ChuyenNganh',
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
            exportPaginationToExcel<ChuyenNganh>({
              entity: 'ChuyenNganh',
              filteredData: data?.result ?? [],
              columns: ChuyenNganhColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_chuyen_nganh_dao_tao',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới chuyên ngành đào tạo' : 'Cập nhật chuyên ngành đào tạo'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <ChuyenNganhForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <ChuyenNganhFilter
          onApply={mergeParams}
          onClear={() => mergeParams(chuyenNganhDefaultValuesFilter)}
        />
        <DataGridTable
          columns={ChuyenNganhColumns}
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

export default ChuyenNganhDaoTaoPage;
