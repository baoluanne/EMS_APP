import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { DanhSachThietBiForm } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-form';
import { DanhSachThietBiFilter } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-filter';
import { danhSachThietBiColumns as columns } from '../../features/equip-management/danh-sach-thiet-bi/configs/table.configs';
import { DanhSachThietBiFilterState } from '../../features/equip-management/danh-sach-thiet-bi/type';
import {
  DanhSachThietBi,
  danhSachThietBiSchema,
} from '../../features/equip-management/danh-sach-thiet-bi/validation';
import React, { useMemo, useCallback } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';

const defaultValues = {
  id: undefined,
  loaiThietBiId: undefined,
  nhaCungCapId: undefined,
  maThietBi: undefined,
  tenThietBi: undefined,
  model: undefined,
  serialNumber: undefined,
  thongSoKiThuat: undefined,
  NamSanXuat: undefined,
  NgayMua: undefined,
  ngayHetHanBaoHanh: undefined,
  nguyenGia: undefined,
  giaTriKhauHao: undefined,
  ghiChu: undefined,
  hinhAnh: undefined,
  phongHocId: undefined,
};

const DanhSachThietBiPage = () => {
  const [filters, setFilters] = React.useState<DanhSachThietBiFilterState>({});

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    onSave: originalOnSave,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
  } = useCrudPaginationModal<DanhSachThietBi, DanhSachThietBi>({
    defaultValues,
    schema: danhSachThietBiSchema,
    entity: 'ThietBi',
  });

  // Transform datetime trước khi save
  const onSave = useCallback(async () => {
    const formData = formMethods.getValues();
    const transformedData = {
      ...formData,
      ngayMua: formData.ngayMua ? `${formData.ngayMua}T00:00:00Z` : null,
      ngayHetHanBaoHanh: formData.ngayHetHanBaoHanh
        ? `${formData.ngayHetHanBaoHanh}T00:00:00Z`
        : null,
    };

    // Update form values với transformed data
    Object.keys(transformedData).forEach((key) => {
      formMethods.setValue(key as any, transformedData[key as keyof typeof transformedData]);
    });

    await originalOnSave();
  }, [formMethods, originalOnSave]);

  const rawRowsData: DanhSachThietBi[] = React.useMemo(() => {
    if (!data) {
      return [];
    }
    if ('data' in data && Array.isArray(data.data)) {
      return data.data;
    }
    if ('result' in data && Array.isArray(data.result)) {
      return data.result;
    }
    return [];
  }, [data]);

  const rowsData: DanhSachThietBi[] = useMemo(() => {
    if (
      !filters.maThietBi &&
      !filters.tenThietBi &&
      !filters.model &&
      !filters.serialNumber &&
      !filters.loaiThietBiId &&
      !filters.nhaCungCapId
    ) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchMaThietBi =
        !filters.maThietBi ||
        row.maThietBi?.toLowerCase().includes(filters.maThietBi.toLowerCase());

      const matchTenThietBi =
        !filters.tenThietBi ||
        row.tenThietBi?.toLowerCase().includes(filters.tenThietBi.toLowerCase());

      const matchModel =
        !filters.model || row.model?.toLowerCase().includes(filters.model.toLowerCase());

      const matchSerialNumber =
        !filters.serialNumber ||
        row.serialNumber?.toLowerCase().includes(filters.serialNumber.toLowerCase());

      const matchLoaiThietBiId =
        !filters.loaiThietBiId || row.loaiThietBiId === filters.loaiThietBiId;

      const matchNhaCungCapId = !filters.nhaCungCapId || row.nhaCungCapId === filters.nhaCungCapId;

      return (
        matchMaThietBi &&
        matchTenThietBi &&
        matchModel &&
        matchSerialNumber &&
        matchLoaiThietBiId &&
        matchNhaCungCapId
      );
    });
  }, [rawRowsData, filters]);

  const handleFilterApply = useCallback((filterValues: DanhSachThietBiFilterState) => {
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters({});
  }, []);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<DanhSachThietBi>({
              entity: 'danh-sach-thiet-bi',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_thiet_bi',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới thiết bị' : 'Chỉnh sửa thiết bị'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <DanhSachThietBiForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}

        <DanhSachThietBiFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => formMethods.reset(params.row)}
          getRowId={(row) => row.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default DanhSachThietBiPage;
