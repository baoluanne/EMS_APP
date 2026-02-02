import { useMemo, useState } from 'react';
import { Stack, Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { FormDetailsModal, DeleteConfirmationModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { TITLE_MODE } from '@renderer/shared/enums';
import { duyetDonColumns } from '@renderer/features/ktx-management/duyet-don/configs/table.configs';
import {
  duyetDonSchema,
  DuyetDon,
  DuyetDonFilterState,
} from '@renderer/features/ktx-management/duyet-don/validation';
import { DuyetDonForm } from '@renderer/features/ktx-management/duyet-don/components/DuyetDonForm';
import { DuyetDonFilter } from '@renderer/features/ktx-management/duyet-don/components/DuyetDonFilter';
import { ApproveDonModal } from '@renderer/features/ktx-management/duyet-don/components/ApproveDonModal';
import { DonKtxDetailDrawer } from '@renderer/features/ktx-management/duyet-don/components/DonKtxDetailDrawer';
import { KtxDonTrangThai } from '@renderer/features/ktx-management/duyet-don/configs/KtxDonEnum';
import { ErrorSharp, Search as SearchIcon, MoreVert, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

const defaultValues = {
  idSinhVien: '',
  idHocKy: '',
  loaiDon: 0,
  trangThai: KtxDonTrangThai.ChoDuyet,
  idGoiDichVu: '',
};

const DuyetDonPage = () => {
  const [filters, setFilters] = useState<DuyetDonFilterState>({});
  const [targetId, setTargetId] = useState<string | null>(null);
  const [viewingDon, setViewingDon] = useState<any>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const openMenu = Boolean(menuAnchorEl);

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    handleRowSelectionModelChange,
    onAdd,
    onEdit,
    onSave,
    selectedRows,
    handleDeleteRecord,
    setIsDeleteOpenModal,
    isDeleteOpenModal,
    handleCloseModal,
    tableConfig,
    columnVisibilityModel,
    refetch,
    isAddMode,
  } = useCrudPaginationModal<DuyetDon, DuyetDon>({
    defaultValues,
    schema: duyetDonSchema,
    entity: 'DonKtx',
  });

  const columns = useMemo(
    () =>
      duyetDonColumns(
        (id) => setTargetId(id),
        (row) => setViewingDon(row),
      ),
    [],
  );

  const rowsData = useMemo(() => {
    const rawData = (data as any)?.result || [];
    return rawData.filter((row: any) => {
      const matchBasic =
        (!filters.maDon || removeAccents(row.maDon).includes(removeAccents(filters.maDon))) &&
        (!filters.fullName ||
          removeAccents(row.sinhVien?.fullName).includes(removeAccents(filters.fullName)));

      let matchLoai = true;
      if ((filters as any).loaiDonText) {
        const search = removeAccents((filters as any).loaiDonText);
        const options: any = { 0: 'Dang ky moi', 1: 'Gia han', 2: 'Chuyen phong', 3: 'Roi KTX' };
        const label = options[row.loaiDon] || '';
        matchLoai = removeAccents(label).includes(search);
      }

      let matchTrangThai = true;
      if ((filters as any).trangThaiText) {
        const search = removeAccents((filters as any).trangThaiText);
        const statusMap: any = { 0: 'Cho duyet', 1: 'Da duyet', 2: 'Tu choi', 3: 'Da huy' };
        const label = statusMap[row.trangThai] || '';
        matchTrangThai = removeAccents(label).includes(search);
      }

      let matchGioiTinh = true;
      if ((filters as any).gioiTinhText) {
        const search = removeAccents((filters as any).gioiTinhText);
        const label = row.sinhVien?.gioiTinh === 0 ? 'Nam' : 'Nu';
        matchGioiTinh = removeAccents(label).includes(search);
      }

      return matchBasic && matchLoai && matchTrangThai && matchGioiTinh;
    });
  }, [data, filters]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'background.paper',
            mb: 1,
            borderRadius: 1,
          }}
        >
          <ActionsToolbar
            selectedRowIds={selectedRows}
            onDelete={() => setIsDeleteOpenModal(true)}
            onAdd={onAdd}
            onEdit={onEdit}
            onExport={(dataOption, columnOption) => {
              exportPaginationToExcel<DuyetDon>({
                entity: 'don-ktx',
                filteredData: rowsData,
                columns: columns,
                options: { dataOption, columnOption },
                columnVisibilityModel,
                fileName: 'Danh_sach_don_ktx',
              });
            }}
          />

          <Box sx={{ pr: 2 }}>
            <IconButton
              onClick={handleMenuClick}
              size="small"
              sx={{ border: '1px solid #e2e8f0', borderRadius: 1 }}
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => {
                  navigate('/dormitory-management/student-dormitory-lookup');
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <SearchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Tra cứu sinh viên KTX</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/dormitory-management/student-dormitory-Vi-Pham');
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <ErrorSharp fontSize="small" />
                </ListItemIcon>
                <ListItemText>Vi phạm nội quy KTX</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/dormitory-management/facilities-management');
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <Home fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cơ sở hạ tầng</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <DuyetDonFilter onApply={setFilters} onReset={() => setFilters({})} />

        <DataGridTable
          columns={columns}
          rows={rowsData}
          checkboxSelection
          loading={isRefetching}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 150px)"
          {...tableConfig}
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Tạo đơn mới' : 'Chi tiết đơn từ'}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <DuyetDonForm />
          </FormDetailsModal>
        )}

        <DonKtxDetailDrawer don={viewingDon} onClose={() => setViewingDon(null)} />

        {targetId && (
          <ApproveDonModal
            selectedId={targetId}
            onClose={() => setTargetId(null)}
            onSuccess={() => refetch()}
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

export default DuyetDonPage;
