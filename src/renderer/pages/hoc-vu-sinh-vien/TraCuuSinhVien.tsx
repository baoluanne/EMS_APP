import { Search } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  columns,
  TraCuuSinhVienFilter,
  TraCuuSinhVienNangCaoFilter,
} from '@renderer/features/hoc-vu-sinh-vien/tra-cuu-sinh-vien/';
import {
  defaultSinhVienFilter,
  SinhVienFilter,
} from '@renderer/features/hoc-vu-sinh-vien/tra-cuu-sinh-vien/types';
import { useDisclosure } from '@renderer/shared/hooks';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { BacDaoTao } from '@renderer/shared/types';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const defaultValues = {};

export default function TraCuuSinhVien() {
  const { isOpen: isTimKiemNangCaoOpen, toggle: toggleTimKiemNangCao } = useDisclosure();
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    onEdit,
    selectedRows,
    setIsDeleteOpenModal,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<any, any>({
    defaultValues,
    schema: z.object({}),
    entity: 'SinhVien',
  });

  const filterMethods = useForm<SinhVienFilter>({ defaultValues: defaultSinhVienFilter });

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
          customStartActions={
            <Button
              variant="text"
              size="small"
              startIcon={<Search />}
              onClick={toggleTimKiemNangCao}
            >
              Tìm kiếm nâng cao
            </Button>
          }
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<BacDaoTao>({
              entity: 'SinhVien',
              filteredData: data?.result ?? [],
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'tra_cuu_sinh_vien',
            });
          }}
        />
        <TraCuuSinhVienFilter
          filterMethods={filterMethods}
          onApply={(value) => mergeParams(value)}
        />
        {isTimKiemNangCaoOpen && (
          <FormDetailsModal title={'Tìm kiếm nâng cao'} onClose={toggleTimKiemNangCao}>
            <TraCuuSinhVienNangCaoFilter
              filterMethods={filterMethods}
              onSearch={() => {
                toggleTimKiemNangCao();
                mergeParams(filterMethods.getValues() as SinhVienFilter);
              }}
            />
          </FormDetailsModal>
        )}
        <DataGridTable
          columns={columns}
          rows={data?.result}
          checkboxSelection={false}
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
}
