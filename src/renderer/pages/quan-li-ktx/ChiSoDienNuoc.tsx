import { Stack, Alert, AlertTitle } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axiosInstance from '@renderer/features/ktx-management/chi-so-dien-nuoc/configs/axiosInstance';

import { columns } from '@renderer/features/ktx-management/chi-so-dien-nuoc/configs/table.configs';
import {
  ChiSoDienNuocFilter,
  ChiSoDienNuocFilterState,
} from '@renderer/features/ktx-management/chi-so-dien-nuoc/components/ChiSoDienNuocFilter';
import { ChiSoDienNuocForm } from '@renderer/features/ktx-management/chi-so-dien-nuoc/components/ChiSoDienNuocForm';
import {
  chiSoDienNuocSchema,
  defaultValues,
  ChiSoDienNuocKtx,
} from '@renderer/features/ktx-management/chi-so-dien-nuoc/validation';

const ChiSoDienNuoc = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    handleDeleteRecord,
    selectedRows,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
    columnVisibilityModel,
    mergeParams,
    refetch,
  } = useCrudPaginationModal<ChiSoDienNuocKtx, any>({
    defaultValues,
    schema: chiSoDienNuocSchema,
    entity: 'chi-so-dien-nuoc',
  });

  const handleModalSave = async () => {
    const isValid = await formMethods.trigger();
    if (!isValid) return;

    const formData = formMethods.getValues();

    const payload = {
      id: formData.id || undefined,
      phongKtxId: formData.phongKtxId,
      thang: formData.thangNam.month() + 1,
      nam: formData.thangNam.year(),
      dienCu: formData.dienCu,
      dienMoi: formData.dienMoi,
      nuocCu: formData.nuocCu,
      nuocMoi: formData.nuocMoi,
      daChot: formData.daChot,
    };

    try {
      if (payload.id) {
        await axiosInstance.put('/api/chi-so-dien-nuoc', payload);
      } else {
        await axiosInstance.post('/api/chi-so-dien-nuoc', payload);
      }

      await refetch?.();
      handleCloseModal();
    } catch (err: any) {
      if (err.response?.data?.message?.includes('duplicate key value')) {
        setError(
          'Phòng này đã có chỉ số điện nước trong tháng/năm đã chọn. Vui lòng kiểm tra lại!',
        );
      } else {
        setError(err.response?.data?.message || 'Có lỗi khi lưu dữ liệu');
      }
      setTimeout(() => setError(null), 6000);
    }
  };

  useEffect(() => {
    if (data && typeof data === 'object' && 'message' in data) {
      setError((data as any).message || 'Có lỗi xảy ra');
      setTimeout(() => setError(null), 5000);
    }
  }, [data]);

  const rowsData = React.useMemo(() => {
    if (!data) return [];

    let items: any[] = [];

    if ('data' in data && Array.isArray(data.data)) {
      items = data.data;
    } else if (Array.isArray(data)) {
      items = data;
    }

    return items.map((item: any) => ({
      ...item,
      tieuThuDien: (item.dienMoi || 0) - (item.dienCu || 0),
      tieuThuNuoc: (item.nuocMoi || 0) - (item.nuocCu || 0),
      thangNam: dayjs()
        .year(item.nam)
        .month(item.thang - 1),
    }));
  }, [data]);

  const handleFilterApply = (filters: ChiSoDienNuocFilterState) => {
    console.log('📊 Filters applied:', filters);
    mergeParams(filters);
  };

  const handleDelete = async () => {
    await handleDeleteRecord();
    setTimeout(() => refetch?.(), 500);
  };

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            <AlertTitle>Lỗi</AlertTitle>
            {error}
          </Alert>
        )}

        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<ChiSoDienNuocKtx>({
              entity: 'chi-so-dien-nuoc',
              filteredData: rowsData,
              columns: columns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_chi_so_dien_nuoc',
            });
          }}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới chỉ số điện nước' : 'Chỉnh sửa chỉ số điện nước'}
            onClose={handleCloseModal}
            onSave={handleModalSave}
            maxWidth="md"
          >
            <ChiSoDienNuocForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDelete}
          />
        )}

        <ChiSoDienNuocFilter onApply={handleFilterApply} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          onRowClick={(params) => {
            const row = params.row;
            formMethods.reset({
              ...row,
              thangNam: dayjs()
                .year(row.nam)
                .month(row.thang - 1),
            });
          }}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
};

export default ChiSoDienNuoc;
