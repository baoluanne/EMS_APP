import React, { useEffect, useMemo, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import axios from 'axios';

import { PhongKtxForm } from '../../features/ktx-management/phong-ktx/components/PhongKtxForm';
import {
  PhongKtxFilter,
  PhongKtxFilterState,
  phongKtxDefaultFilters,
} from '../../features/ktx-management/phong-ktx/components/PhongKtxFilter';
import { phongKtxColumns as columns } from '../../features/ktx-management/phong-ktx/configs/table.configs';
import { PhongKtxs, phongKtxSchema } from '../../features/ktx-management/phong-ktx/validation';

const API_BASE_URL = 'http://localhost:5031';

export default function PhongKtxPage() {
  const [filters, setFilters] = React.useState<PhongKtxFilterState>({});

  const {
    refetch,
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    selectedRows,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    onAdd,
    onEdit,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    handleCloseModal,
    isAddMode,
    tableConfig,
  } = useCrudPaginationModal<PhongKtxs, any>({
    defaultValues: {
      id: '',
      maPhong: '',
      toaNhaId: '',
      soLuongGiuong: 6,
      soLuongDaO: 0,
      trangThai: 'HOAT_DONG',
      giaPhong: 0,
    },
    schema: phongKtxSchema,
    entity: 'phong-ktx',
  });

  const rawRowsData = React.useMemo(() => {
    let rawData: any[] = [];

    if (!data) {
      return [];
    }

    if (Array.isArray(data)) {
      rawData = data;
    } else if ((data as any)?.items && Array.isArray((data as any).items)) {
      rawData = (data as any).items;
    } else if ((data as any)?.data && Array.isArray((data as any).data)) {
      rawData = (data as any).data;
    } else {
      return [];
    }

    if (Array.isArray(rawData) && rawData.length > 0) {
      return rawData.map((item: any) => ({
        id: item.id || item.Id || '',
        maPhong: item.maPhong || item.MaPhong || '',
        tenToaNha: item.tenToaNha || item.TenToaNha || '',
        toaNhaId: item.toaNhaId || item.ToaNhaId || '',
        soLuongGiuong: item.soLuongGiuong ?? item.SoLuongGiuong ?? 0,
        soLuongDaO: item.soLuongDaO ?? item.SoLuongDaO ?? 0,
        trangThai: item.trangThai || item.TrangThai || 'HOAT_DONG',
        giaPhong: item.giaPhong ?? item.GiaPhong ?? 0,
      }));
    }

    return [];
  }, [data]);

  const rowsData = useMemo(() => {
    if (!filters.maPhong && !filters.toaNhaId && !filters.trangThai) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchMaPhong =
        !filters.maPhong || row.maPhong?.toLowerCase().includes(filters.maPhong.toLowerCase());

      const matchToaNha =
        !filters.toaNhaId || row.toaNhaId?.toLowerCase().includes(filters.toaNhaId.toLowerCase());

      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;

      return matchMaPhong && matchToaNha && matchTrangThai;
    });
  }, [rawRowsData, filters]);

  useEffect(() => {
    if (
      isModalOpen &&
      !isAddMode &&
      selectedRows &&
      Array.isArray(selectedRows) &&
      selectedRows.length > 0
    ) {
      const selectedId = selectedRows[0];
      const record = rowsData.find((r) => r.id === selectedId);
      if (record) {
        formMethods.reset(record);
      }
    }
  }, [isModalOpen, isAddMode, selectedRows, rowsData, formMethods]);

  const handleFilterApply = useCallback((filterValues: PhongKtxFilterState) => {
    console.log('📊 Filters applied:', filterValues);
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters(phongKtxDefaultFilters);
  }, []);

  const handleSave = async (formData: PhongKtxs) => {
    try {
      if (isAddMode) {
        await axios.post(`${API_BASE_URL}/api/phong-ktx/tao-phong-moi`, {
          ...formData,
          maPhongNhapTay: formData.maPhong,
        });
      } else {
        await axios.put(`${API_BASE_URL}/api/phong-ktx/${formData.id}`, formData);
      }
      refetch?.();
      handleCloseModal();
      handleFilterReset();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Lưu thất bại');
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Quản lý Phòng KTX
        </Typography>

        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
        />

        <PhongKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          loading={isRefetching}
          checkboxSelection
          getRowId={(row: any) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
          height="calc(100% - 85px)"
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới phòng' : 'Chỉnh sửa phòng'}
            onClose={handleCloseModal}
            onSave={formMethods.handleSubmit(handleSave)}
            maxWidth="sm"
          >
            <PhongKtxForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
      </Stack>
    </FormProvider>
  );
}
