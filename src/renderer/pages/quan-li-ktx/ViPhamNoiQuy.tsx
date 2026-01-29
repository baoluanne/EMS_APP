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
import { DescriptionOutlined, Search as SearchIcon, Add, MoreVert } from '@mui/icons-material';
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
  const [filters, setFilters] = useState<ViPhamNoiQuyFilterState>({});
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
      noiDungViPham: '',
      diemTru: 0,
      ngayViPham: new Date(),
      maBienBan: '',
    },
    schema: viPhamNoiQuySchema,
    entity: 'CuTruKtx',
    endpoint: 'pagination?TrangThai=0&ViPhamKtx=1',
    defaultState: filters,
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
    const rawSV = values.sinhVienId;
    const finalSinhVienId = typeof rawSV === 'object' ? rawSV?.sinhVienId || rawSV?.id : rawSV;

    const payload = {
      id: values.id || undefined,
      sinhVienId: finalSinhVienId,
      loaiViPham: Number(values.loaiViPham),
      diemTru: Number(values.diemTru),
      ngayViPham: values.ngayViPham,
      maBienBan: values.maBienBan || `BB-${Date.now()}`,
      ghiChu: values.ghiChu,
    };

    try {
      const response = await createViolation(payload);
      if (response) {
        toast.success('Lưu biên bản thành công!');
        handleCloseModal();
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Lỗi khi lưu');
    }
  }, [formMethods, createViolation, handleCloseModal, refetch]);

  const rowsData = useMemo(() => {
    const rawData = (data as any)?.result || [];
    return rawData.filter((row: any) => {
      const hasViolation = (row.tongDiemViPham || 0) > 0;
      if (!hasViolation) return false;

      const searchText = filters.maSinhVien?.toLowerCase() || '';
      const matchSV =
        !searchText ||
        row.sinhVien?.maSinhVien?.toLowerCase().includes(searchText) ||
        `${row.sinhVien?.hoDem} ${row.sinhVien?.ten}`.toLowerCase().includes(searchText);

      const matchPhong =
        !filters.maPhong ||
        row.phongKtx?.maPhong?.toLowerCase().includes(filters.maPhong.toLowerCase());

      const matchDiem = !filters.viPhamTu || row.tongDiemViPham >= Number(filters.viPhamTu);
      const matchSdt =
        !filters.soDienThoai || row.sinhVien?.soDienThoai?.includes(filters.soDienThoai);

      return matchSV && matchPhong && matchDiem && matchSdt;
    });
  }, [data, filters]);

  const handleFilterApply = useCallback(
    (val: ViPhamNoiQuyFilterState) => {
      setFilters(val);
      mergeParams({
        Keyword: val.maSinhVien,
        MaSinhVien: val.maSinhVien,
        MaPhong: val.maPhong,
        ViPhamKtx: val.viPhamTu || 1,
        SoDienThoai: val.soDienThoai,
      });
    },
    [mergeParams],
  );

  const handleFilterReset = useCallback(() => {
    setFilters({});
    mergeParams({});
  }, [mergeParams]);

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ActionsToolbar
            customStartActions={
              <Stack direction="row" spacing={1}>
                <Button variant="text" size="small" startIcon={<Add />} onClick={() => onAdd()}>
                  Lập biên bản mới
                </Button>
              </Stack>
            }
            onExport={(_dataOption, columnOption) => {
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

        <DataGridTable
          columns={columns}
          rows={rowsData}
          loading={isRefetching}
          getRowId={(row) => row.id}
          onRowClick={(params) => setSelectedStudent(params.row)}
          height="calc(100% - 110px)"
          sx={{ cursor: 'pointer' }}
          {...tableConfig}
        />

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
