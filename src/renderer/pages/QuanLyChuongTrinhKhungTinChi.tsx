import { Stack } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';
import { DiemAlert } from '@renderer/components/alerts';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import {
  ChuongTrinhKhungTinChi,
  ChuongTrinhKhungTinChiSchema,
} from '@renderer/features/chuong-trinh-khung-tin-chi/validation';
import {
  defaultChuongTrinhKhungTinChiFilters,
  quanLyChuongTrinhKhungTinChiColumns,
  QuanLyChuongTrinhKhungTinChiFilter,
} from '@renderer/features/quan-ly-chuong-trinh-khung-tin-chi';
import LapChuongTrinhKhungTinChiModal from '@renderer/features/quan-ly-chuong-trinh-khung-tin-chi/components/LapChuongTrinhKhungTinChiModal';
import { lopHocColumns } from '@renderer/features/quan-ly-chuong-trinh-khung-tin-chi/configs/lophoc.table.config';
import { useUpsertModal } from '@renderer/shared/hooks';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useMemo } from 'react';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

const QuanLyChuongTrinhKhungTinChiPage = () => {
  const { handleOpenModal, isModalOpen, handleCloseModal } = useUpsertModal();
  const [isAddMode, SetIsAddMode] = useState<boolean>(true);
  const [selectedData, setSelectedData] = useState<ChuongTrinhKhungTinChi>();
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    refetch,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
  } = useCrudPaginationModal<ChuongTrinhKhungTinChi, ChuongTrinhKhungTinChi>({
    defaultValues: {},
    schema: ChuongTrinhKhungTinChiSchema,
    entity: 'ChuongTrinhKhungTinChi',
    endpoint: 'pagination-lophoc',
  });

  // Aggregate danhSachLopHoc from all selected rows
  const aggregatedLopHoc = useMemo(() => {
    if (!data?.result || selectedRows.ids.size === 0) {
      return [];
    }

    const selectedRowIds = Array.from(selectedRows.ids);
    const selectedRowsData = data.result.filter((row) => row.id && selectedRowIds.includes(row.id));

    // Collect all danhSachLopHoc from selected rows
    const allLopHoc: any[] = [];
    const seenIds = new Set<string>();

    selectedRowsData.forEach((row) => {
      const danhSachLopHoc = (row as any)?.danhSachLopHoc ?? [];
      danhSachLopHoc.forEach((lopHoc: any) => {
        // Deduplicate by id or maLop
        const uniqueKey = lopHoc.id || lopHoc.maLop;
        if (uniqueKey && !seenIds.has(uniqueKey)) {
          seenIds.add(uniqueKey);
          allLopHoc.push(lopHoc);
        }
      });
    });

    // Add index field to each item for the index column display
    return allLopHoc.map((lopHoc, index) => ({
      ...lopHoc,
      index: index + 1,
    }));
  }, [data?.result, selectedRows.ids]);

  const handleClickRow = (params: GridRowParams<ChuongTrinhKhungTinChi>) => {
    formMethods.reset(params.row);
    setSelectedData(params.row);

    // Toggle selection for the clicked row
    const rowId = params.row.id;
    if (rowId) {
      const isSelected = selectedRows.ids.has(rowId);
      const newIds = new Set(selectedRows.ids);
      if (isSelected) {
        newIds.delete(rowId);
      } else {
        newIds.add(rowId);
      }
      handleRowSelectionModelChange({
        type: 'include',
        ids: newIds,
      });
    }
  };

  // Wrapper for handleRowSelectionModelChange that also updates displayed lop hoc
  const handleRowSelectionChange = (newSelectionModel: any) => {
    handleRowSelectionModelChange(newSelectionModel);
  };
  const onAddCTKTinChi = () => {
    handleOpenModal();
    SetIsAddMode(true);
  };
  const onEditCTKTinChi = () => {
    handleOpenModal();
    SetIsAddMode(false);
  };
  const onCloseModal = () => {
    formMethods.reset();
    handleCloseModal();
    refetch();
  };

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
        {isModalOpen && (
          <FormDetailsModal
            title={
              isAddMode
                ? 'Lập chương trình khung - tín chỉ'
                : 'Cập nhật chương trình khung - tín chỉ'
            }
            onClose={onCloseModal}
            fullScreenMode
          >
            <LapChuongTrinhKhungTinChiModal
              onClose={onCloseModal}
              selectedData={isAddMode ? null : selectedData}
            />
          </FormDetailsModal>
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAddCTKTinChi}
          onEdit={onEditCTKTinChi}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<ChuongTrinhKhungTinChi>({
              entity: 'ChuongTrinhKhungTinChi',
              filteredData: data?.result ?? [],
              columns: quanLyChuongTrinhKhungTinChiColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_chuong_trinh_khung_tin_chi',
            });
          }}
        />
        <DiemAlert sx={{ my: 1, pl: 1, py: 0 }} />
        <QuanLyChuongTrinhKhungTinChiFilter
          onApply={mergeParams}
          onClear={() => {
            mergeParams(defaultChuongTrinhKhungTinChiFilters);
          }}
        />
        <Stack direction="row" spacing={0.5} sx={{ flex: 1, overflow: 'hidden' }}>
          <Stack sx={{ width: '70%', overflow: 'hidden' }}>
            <DataGridTable
              columns={quanLyChuongTrinhKhungTinChiColumns}
              rows={data?.result}
              getRowId={(row) => row.id}
              loading={isRefetching}
              onRowClick={handleClickRow}
              onRowSelectionModelChange={handleRowSelectionChange}
              rowSelectionModel={selectedRows}
              {...tableConfig}
            />
          </Stack>
          <Stack sx={{ width: '30%', overflow: 'hidden' }}>
            <DataGridTable
              columns={lopHocColumns}
              rows={aggregatedLopHoc}
              getRowId={(row) => row.id ?? `lop-hoc-${row.maLop ?? ''}`}
              loading={isRefetching}
              checkboxSelection={false}
              hideFooterSelectedRowCount={true}
              {...tableConfig}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default QuanLyChuongTrinhKhungTinChiPage;
