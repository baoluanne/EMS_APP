import React, { useMemo, useCallback, useState } from 'react';
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
import { TITLE_MODE } from '@renderer/shared/enums';

const API_BASE_URL = 'http://localhost:5031';

export default function PhongKtxPage() {
  const [filters, setFilters] = React.useState<PhongKtxFilterState>({});
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [isCustomAddMode, setIsCustomAddMode] = useState(true);

  const {
    refetch,
    formMethods,
    data,
    isRefetching,
    selectedRows,
    handleRowSelectionModelChange,
    isDeleteOpenModal,
    handleDeleteRecord,
    setIsDeleteOpenModal,
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

  const handleRowClick = useCallback(
    (params: any) => {
      const rowId = params.row.id;
      handleRowSelectionModelChange([rowId] as any);
    },
    [handleRowSelectionModelChange],
  );

  const handleAdd = useCallback(() => {
    formMethods.reset({
      id: undefined,
      maPhong: '',
      toaNhaId: undefined,
      tenToaNha: '',
      soLuongGiuong: 6,
      soLuongDaO: 0,
      trangThai: 'HOAT_DONG',
      giaPhong: 0,
    });
    setIsCustomAddMode(true);
    setCustomModalOpen(true);
  }, [formMethods]);

  const handleEditFromToolbar = useCallback(() => {
    if (!selectedRows || !selectedRows.ids || selectedRows.ids.size !== 1) {
      return;
    }

    const selectedId = Array.from(selectedRows.ids)[0];
    const rowToEdit = rowsData.find((r) => r.id === selectedId);

    if (rowToEdit) {
      formMethods.reset(rowToEdit);
      setIsCustomAddMode(false);
      setCustomModalOpen(true);
    }
  }, [selectedRows, rowsData, formMethods]);

  const handleCloseModal = useCallback(() => {
    setCustomModalOpen(false);
  }, []);

  const handleFilterApply = useCallback((filterValues: PhongKtxFilterState) => {
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters(phongKtxDefaultFilters);
  }, []);

  const handleSave = formMethods.handleSubmit(async (formData: PhongKtxs) => {
    try {
      if (isCustomAddMode) {
        await axios.post(`${API_BASE_URL}/api/phong-ktx/tao-phong-moi`, {
          toaNhaId: formData.toaNhaId,
          maPhongNhapTay: formData.maPhong,
          soLuongGiuong: formData.soLuongGiuong,
          trangThai: formData.trangThai,
          giaPhong: formData.giaPhong,
        });
      } else {
        const updatePayload = {
          id: formData.id,
          maPhong: formData.maPhong,
          toaNhaId: formData.toaNhaId,
          soLuongGiuong: formData.soLuongGiuong,
          soLuongDaO: formData.soLuongDaO,
          trangThai: formData.trangThai,
          giaPhong: formData.giaPhong,
        };

        await axios.put(`${API_BASE_URL}/api/phong-ktx/${formData.id}`, updatePayload);
      }

      setCustomModalOpen(false);
      refetch?.();
      handleFilterReset();
      alert(isCustomAddMode ? 'Thêm mới thành công' : 'Cập nhật thành công');
    } catch (error: any) {
      console.error('Save error:', error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Lưu thất bại';
      alert(errorMessage);
    }
  });

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Quản lý Phòng KTX
        </Typography>

        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={handleAdd}
          onEdit={handleEditFromToolbar}
        />

        <PhongKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          loading={isRefetching}
          checkboxSelection
          onRowClick={handleRowClick}
          getRowId={(row: any) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
          height="calc(100% - 85px)"
        />

        {customModalOpen && (
          <FormDetailsModal
            title={isCustomAddMode ? 'Thêm mới phòng' : 'Chỉnh sửa phòng'}
            onClose={handleCloseModal}
            onSave={handleSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
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
