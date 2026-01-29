import { useMemo, useState, useCallback } from 'react';
import { Button, Stack, Typography, Collapse } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { DeleteConfirmationModal, FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { DanhSachThietBiForm } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-form';
import { DanhSachThietBiFilter } from '../../features/equip-management/danh-sach-thiet-bi/components/danh-sach-thiet-bi-filter';
import { NhapHangLoatModal } from '../../features/equip-management/danh-sach-thiet-bi/NhapHangLoatModal';
import { AssignRoomModal } from '../../features/equip-management/danh-sach-thiet-bi/components/AssignRoomModal';
import { DeviceStatsBoard } from '../../features/equip-management/danh-sach-thiet-bi/components/DeviceStatsBoard';
import { danhSachThietBiColumns as columns } from '../../features/equip-management/danh-sach-thiet-bi/configs/table.configs';
import { DanhSachThietBiFilterState } from '../../features/equip-management/danh-sach-thiet-bi/type';
import {
  DanhSachThietBi,
  danhSachThietBiSchema,
} from '../../features/equip-management/danh-sach-thiet-bi/validation';
import { TITLE_MODE } from '@renderer/shared/enums';
import { getTrangThaiLabel } from '../../features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';
import { Add, Business, Analytics, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

const removeAccents = (str: string) => {
  return str
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
    : '';
};

const DanhSachThietBiPage = () => {
  const [filters, setFilters] = useState<DanhSachThietBiFilterState>({});
  const [nhapHangLoatOpen, setNhapHangLoatOpen] = useState(false);
  const [assignRoomOpen, setAssignRoomOpen] = useState(false);
  const [showStats, setShowStats] = useState(true);

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
    refetch,
  } = useCrudPaginationModal<DanhSachThietBi, DanhSachThietBi>({
    defaultValues: { tenThietBi: '' },
    schema: danhSachThietBiSchema,
    entity: 'ThietBi',
  });

  const selectedIds = useMemo(
    () => Array.from((selectedRows as any)?.ids || []).map((id) => String(id)),
    [selectedRows],
  );

  const rowsData = useMemo(() => {
    const raw = (data as any)?.result || [];
    return raw.filter((r: any) => {
      const matchBasic =
        (!filters.maThietBi ||
          removeAccents(r.maThietBi).includes(removeAccents(filters.maThietBi))) &&
        (!filters.tenThietBi ||
          removeAccents(r.tenThietBi).includes(removeAccents(filters.tenThietBi))) &&
        (!filters.model || removeAccents(r.model).includes(removeAccents(filters.model))) &&
        (!filters.serialNumber ||
          removeAccents(r.serialNumber).includes(removeAccents(filters.serialNumber)));

      let matchViTri = true;
      if ((filters as any).viTri) {
        const val = (filters as any).viTri;
        const cleanSearch = removeAccents(val);
        if (cleanSearch === 'chua phan bo') {
          matchViTri = !r.phongHocId && !r.phongKtxId;
        } else {
          const tenPhong = removeAccents(r.phongHoc?.tenPhong || '');
          const maKtx = removeAccents(r.phongKtx?.maPhong || '');
          matchViTri = tenPhong.includes(cleanSearch) || maKtx.includes(cleanSearch);
        }
      }

      let matchTrangThai = true;
      if ((filters as any).trangThaiText) {
        const searchVal = removeAccents((filters as any).trangThaiText);
        const label = removeAccents(getTrangThaiLabel(r.trangThai));
        matchTrangThai = label.includes(searchVal);
      }

      return matchBasic && matchViTri && matchTrangThai;
    });
  }, [data, filters]);

  const currentSelectedData = useMemo(
    () => rowsData.find((r: any) => r.id === selectedIds[0]),
    [rowsData, selectedIds],
  );

  const handleBulkSubmit = useCallback(async (fd: any) => {
    const res = await fetch('http://localhost:5031/api/ThietBi/nhap-hang-loat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fd),
    });
    return await res.json();
  }, []);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" p={2} spacing={2} sx={{ overflowY: 'auto', bgcolor: '#f8fafc' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Analytics color="action" fontSize="small" />
            <Typography variant="overline" fontWeight={700} color="text.secondary">
              BÁO CÁO THIẾT BỊ
            </Typography>
          </Stack>
          <Button
            size="small"
            variant="text"
            onClick={() => setShowStats(!showStats)}
            startIcon={showStats ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{ fontWeight: 700 }}
          >
            {showStats ? 'Thu gọn thống kê' : 'Mở rộng thống kê'}
          </Button>
        </Stack>

        <Collapse in={showStats} sx={{ pb: 1 }}>
          <DeviceStatsBoard data={rowsData} loading={isRefetching} />
        </Collapse>

        <DanhSachThietBiFilter onApply={setFilters} onReset={() => setFilters({})} />

        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => setIsDeleteOpenModal(true)}
          onAdd={onAdd}
          onEdit={onEdit}
          onExport={(dOpt, cOpt) =>
            exportPaginationToExcel({
              entity: 'ThietBi',
              filteredData: rowsData,
              columns,
              options: { dataOption: dOpt, columnOption: cOpt },
              columnVisibilityModel: tableConfig.columnVisibilityModel,
              fileName: 'Danh_sach_thiet_bi',
            })
          }
          customStartActions={
            <Stack direction="row" spacing={1}>
              <Button size="small" startIcon={<Add />} onClick={() => setNhapHangLoatOpen(true)}>
                Nhập hàng loạt
              </Button>
              <Button
                size="small"
                color="secondary"
                startIcon={<Business />}
                disabled={selectedIds.length === 0}
                onClick={() => setAssignRoomOpen(true)}
              >
                Phân phòng
              </Button>
            </Stack>
          }
        />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          getRowId={(r) => r.id!}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 200px)"
          {...tableConfig}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm mới' : 'Sửa'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <DanhSachThietBiForm />
          </FormDetailsModal>
        )}

        {nhapHangLoatOpen && (
          <NhapHangLoatModal
            open={nhapHangLoatOpen}
            onClose={() => setNhapHangLoatOpen(false)}
            onSuccess={refetch}
            onSubmitBulk={handleBulkSubmit}
          />
        )}

        {assignRoomOpen && (
          <AssignRoomModal
            selectedIds={selectedIds}
            initialData={currentSelectedData}
            onClose={() => setAssignRoomOpen(false)}
            onSuccess={refetch}
          />
        )}

        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={async () => {
              await handleDeleteRecord();
              refetch();
            }}
          />
        )}
      </Stack>
    </FormProvider>
  );
};

export default DanhSachThietBiPage;
