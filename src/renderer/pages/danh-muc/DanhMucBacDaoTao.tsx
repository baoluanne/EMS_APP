import { Stack } from '@mui/material';
import { Filters } from '@renderer/components/filters';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  BacDaoTaoSchema,
  bacDaoTaoSchema,
  danhMucBacDaoTaoColumns,
  DanhMucBacDaoTaoForm,
} from '@renderer/features/danh-muc-bac-dao-tao';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { BacDaoTao } from '@renderer/shared/types';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider } from 'react-hook-form';

const defaultValues = {
  maBacDaoTao: '',
  tenBacDaoTao: '',
  daoTaoMonVanHoa: undefined,
  hinhThucDaoTao: undefined,
  kyTuMaSinhVien: undefined,
  stt: undefined,
  ghiChu: undefined,
  kyTuMaHoSoTuyenSinh: undefined,
  tenTiengAnh: undefined,
  isVisible: true,
  tenLoaiBangCapTN: undefined,
  tenLoaiBangCapTN_ENG: undefined,
};

const DanhMucBacDaoTao = () => {
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
  } = useCrudPaginationModal<BacDaoTao, BacDaoTaoSchema>({
    defaultValues,
    schema: bacDaoTaoSchema,
    entity: 'BacDaoTao',
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
            exportPaginationToExcel<BacDaoTao>({
              entity: 'BacDaoTao',
              filteredData: data?.result ?? [],
              columns: danhMucBacDaoTaoColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_bac_dao_tao',
            });
          }}
        />
        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới bậc đào tạo' : 'Cập nhật bậc đào tạo'}
            onClose={handleCloseModal}
            onSave={onSave}
          >
            <DanhMucBacDaoTaoForm />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <Filters onApply={(value) => mergeParams(value)} />
        <DataGridTable
          columns={danhMucBacDaoTaoColumns}
          rows={data?.result}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height={'calc(100% - 85px)'}
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default DanhMucBacDaoTao;
