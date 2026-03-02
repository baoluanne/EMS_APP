import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { TITLE_MODE } from '@renderer/shared/enums';
import { format } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { PhieuThanhLyForm } from '@renderer/features/equip-management/phieu-thanh-li/PhieuThanhLyForm';
import { PhieuThanhLyFilter } from '@renderer/features/equip-management/phieu-thanh-li/PhieuThanhLyFilter';
import {
  phieuThanhLyColumns as columns,
  PhieuThanhLyRow,
} from '@renderer/features/equip-management/phieu-thanh-li/table.configs';
import {
  phieuThanhLySchema,
  PhieuThanhLyFilterState,
} from '@renderer/features/equip-management/phieu-thanh-li/validation';

const defaultValues = {
  soQuyetDinh: '',
  ngayThanhLy: new Date(),
  lyDo: '',
  nguoiLapPhieuId: '',
  chiTietThanhLys: [],
};

const PhieuThanhLyPage = () => {
  const [filters, setFilters] = useState<PhieuThanhLyFilterState>({});

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
  } = useCrudPaginationModal<any, any>({
    defaultValues,
    schema: phieuThanhLySchema,
    entity: 'PhieuThanhLy',
    endpoint: 'pagination?pageSize=1000',
  });

  const rowsData = useMemo<PhieuThanhLyRow[]>(() => {
    if (!data) return [];

    let rows: PhieuThanhLyRow[] = [];

    if ('data' in data && Array.isArray(data.data)) {
      rows = data.data as PhieuThanhLyRow[];
    } else if ('result' in data && Array.isArray(data.result)) {
      rows = data.result as PhieuThanhLyRow[];
    } else if (Array.isArray(data)) {
      rows = data as PhieuThanhLyRow[];
    }

    if (Object.keys(filters).length === 0) return rows;

    return rows.filter((row) => {
      if (
        filters.soQuyetDinh &&
        !row.soQuyetDinh?.toLowerCase().includes(filters.soQuyetDinh.toLowerCase())
      ) {
        return false;
      }

      if (filters.nguoiLapPhieu) {
        const tenNguoiLap =
          `${row.nguoiLapPhieu?.hoDem || ''} ${row.nguoiLapPhieu?.ten || ''}`.trim();
        if (!tenNguoiLap.toLowerCase().includes(filters.nguoiLapPhieu!.toLowerCase())) {
          return false;
        }
      }

      if (filters.lyDo && !row.lyDo?.toLowerCase().includes(filters.lyDo.toLowerCase())) {
        return false;
      }

      if (filters.thietBi) {
        const hasMatchingDevice = row.chiTietThanhLys?.some((ct) => {
          const matchMa = ct.thietBi?.maThietBi
            ?.toLowerCase()
            .includes(filters.thietBi!.toLowerCase());
          const matchTen = ct.thietBi?.tenThietBi
            ?.toLowerCase()
            .includes(filters.thietBi!.toLowerCase());
          return matchMa || matchTen;
        });
        if (!hasMatchingDevice) return false;
      }

      if (filters.ngayThanhLy) {
        const rowDate = new Date(row.ngayThanhLy);
        const rowDateString = format(rowDate, 'dd/MM/yyyy');

        if (!rowDateString.includes(filters.ngayThanhLy!)) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters]);

  const handleApplyFilter = (newFilters: PhieuThanhLyFilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilter = () => {
    setFilters({});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider {...formMethods}>
        <Stack height="100%" width="100%" p={2}>
          <ActionsToolbar
            selectedRowIds={selectedRows}
            onDelete={() => setIsDeleteOpenModal(true)}
            onAdd={onAdd}
            onEdit={onEdit}
          />

          <PhieuThanhLyFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

          {isModalOpen && (
            <FormDetailsModal
              title={isAddMode ? 'Lập phiếu thanh lý' : 'Cập nhật phiếu thanh lý'}
              onClose={handleCloseModal}
              onSave={onSave}
              maxWidth="md"
              titleMode={TITLE_MODE.COLORED}
            >
              <PhieuThanhLyForm />
            </FormDetailsModal>
          )}

          {isDeleteOpenModal && (
            <DeleteConfirmationModal
              onClose={() => setIsDeleteOpenModal(false)}
              onDelete={handleDeleteRecord}
            />
          )}

          <DataGridTable
            columns={columns}
            rows={rowsData}
            loading={isRefetching}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectedRows}
            getRowId={(row) => row.id}
            height="calc(100% - 120px)"
            {...tableConfig}
          />
        </Stack>
      </FormProvider>
    </LocalizationProvider>
  );
};

export default PhieuThanhLyPage;
