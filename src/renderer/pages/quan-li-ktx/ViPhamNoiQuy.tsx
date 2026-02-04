import {
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { DataGridTable } from '@renderer/components/Table';
import { FormDetailsModal } from '@renderer/components/modals';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useMutation } from '@renderer/shared/mutations';
import { useState, useCallback, useMemo } from 'react';
import { TITLE_MODE } from '@renderer/shared/enums';
import { useNavigate } from 'react-router-dom';
import {
  DescriptionOutlined,
  Search as SearchIcon,
  Add,
  MoreVert,
  Home,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

import { ViPhamNoiQuyForm } from '../../features/ktx-management/vi-pham-noi-quy/components/vi-pham-noi-quy-form';
import { ViPhamNoiQuyFilter } from '../../features/ktx-management/vi-pham-noi-quy/components/vi-pham-noi-quy-filter';
import { viPhamTongHopColumns as columns } from '../../features/ktx-management/vi-pham-noi-quy/configs/table.configs';
import { ViolationHistorySidebar } from '../../features/ktx-management/vi-pham-noi-quy/components/ViolationSideModal';
import {
  viPhamNoiQuySchema,
  ViPhamNoiQuyFilterState,
  LoaiViPhamNoiQuy,
} from '../../features/ktx-management/vi-pham-noi-quy/validation';
import { exportPaginationToExcel } from '@renderer/shared/utils';

const ViPhamNoiQuyPage = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const openMenu = Boolean(menuAnchorEl);
  const { mutateAsync: createViolation, isPending: isSaving } = useMutation<any>('ViPhamNoiQuyKTX');

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    onAdd,
    handleCloseModal,
    isAddMode,
    tableConfig,
    mergeParams,
    columnVisibilityModel,
    refetch,
  } = useCrudPaginationModal<any, any>({
    defaultValues: {
      sinhVienId: '',
      loaiViPham: LoaiViPhamNoiQuy.GayMatTratTu,
      diemTru: 0,
      ngayViPham: new Date(),
      maBienBan: '',
    },
    schema: viPhamNoiQuySchema,
    entity: 'CuTruKtx',
    endpoint: 'pagination?TrangThai=0&ViPhamKtx=1',
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSaveWithMutation = useCallback(async () => {
    const isValid = await formMethods.trigger();
    if (!isValid) return;

    const values = formMethods.getValues();
    const finalSinhVienId =
      typeof values.sinhVienId === 'object'
        ? values.sinhVienId?.sinhVienId || values.sinhVienId?.id
        : values.sinhVienId;

    const payload: any = {
      sinhVienId: finalSinhVienId,
      loaiViPham: Number(values.loaiViPham),
      diemTru: Number(values.diemTru),
      ngayViPham: values.ngayViPham,
      maBienBan: values.maBienBan || `BB-${Date.now()}`,
      ghiChu: values.ghiChu || '',
    };

    // Chỉ thêm id khi đang ở chế độ edit (id có giá trị hợp lệ)
    if (values.id && values.id !== '') {
      payload.id = values.id;
    }

    try {
      await createViolation(payload);
      toast.success('Lưu biên bản thành công!');
      handleCloseModal();
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Lỗi khi lưu');
    }
  }, [formMethods, createViolation, handleCloseModal, refetch]);

  const handleFilterApply = useCallback(
    (val: ViPhamNoiQuyFilterState) => {
      mergeParams({
        Keyword: val.maSinhVien || val.hoTen,
        MaSinhVien: val.maSinhVien,
        MaPhong: val.maPhong,
        ViPhamKtx: val.viPhamTu || 1,
        SoDienThoai: val.soDienThoai,
      });
      tableConfig.onPaginationModelChange({ ...tableConfig.paginationModel, page: 0 });
    },
    [mergeParams, tableConfig],
  );

  const handleFilterReset = useCallback(() => {
    mergeParams({
      Keyword: undefined,
      MaSinhVien: undefined,
      MaPhong: undefined,
      ViPhamKtx: 1,
      SoDienThoai: undefined,
    });
    refetch();
  }, [mergeParams, refetch]);

  const rowsData = useMemo(() => (data as any)?.result || [], [data]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={1} sx={{ overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ActionsToolbar
            customStartActions={
              <Button variant="text" size="small" startIcon={<Add />} onClick={() => onAdd()}>
                Lập biên bản mới
              </Button>
            }
            onExport={(_data, columnOption) => {
              exportPaginationToExcel({
                entity: 'ViPhamNoiQuy',
                filteredData: rowsData,
                columns: columns,
                options: { dataOption: 'filtered', columnOption },
                columnVisibilityModel,
                fileName: 'Danh_sach_tong_hop_vi_pham_KTX',
              });
            }}
          />

          <Box sx={{ pr: 1 }}>
            <IconButton onClick={handleMenuClick} size="small">
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
                  navigate('/dormitory-management/dormitory-student-list');
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <DescriptionOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText>Duyệt đơn KTX</ListItemText>
              </MenuItem>
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

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Lập biên bản vi phạm' : 'Cập nhật biên bản'}
            onClose={handleCloseModal}
            onSave={handleSaveWithMutation}
            maxWidth="sm"
            saveTitle={isSaving ? 'Đang lưu...' : 'Lưu biên bản'}
            titleMode={TITLE_MODE.COLORED}
          >
            <ViPhamNoiQuyForm />
          </FormDetailsModal>
        )}

        <ViPhamNoiQuyFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <DataGridTable
            columns={columns}
            rows={rowsData}
            loading={isRefetching}
            getRowId={(row) => row.id}
            onRowClick={(params) => setSelectedStudent(params.row)}
            {...tableConfig}
          />
        </Box>

        <ViolationHistorySidebar
          open={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          studentData={selectedStudent}
        />
      </Stack>
    </FormProvider>
  );
};

export default ViPhamNoiQuyPage;
