import { useState, useEffect, useMemo } from 'react';
import {
  Stack,
  Box,
  Typography,
  Button,
  Collapse,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Layers,
  Apartment,
  KeyboardArrowUp,
  DescriptionOutlined,
  ErrorSharp,
  KeyboardArrowDown,
  MoreVert,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { DataGridTable } from '@renderer/components/Table';
import { FormDetailsModal, DeleteConfirmationModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { TITLE_MODE } from '@renderer/shared/enums';
import { getPhongColumns } from '@renderer/features/ktx-management/phong-management/table.configs';
import {
  phongSchema,
  PhongKtx,
} from '@renderer/features/ktx-management/phong-management/validation';
import { BedListSidebar } from '@renderer/features/ktx-management/phong-management/BedListSidebar';
import { RoomForm } from '@renderer/features/ktx-management/phong-management/RoomForm';
import { RoomFilter } from '@renderer/features/ktx-management/phong-management/RoomFilter';
import { exportPaginationToExcel } from '@renderer/shared/utils';

const QuanLyPhongKtx = () => {
  const navigate = useNavigate();
  const [activeTang, setActiveTang] = useState<any>(null);
  const [viewingPhong, setViewingPhong] = useState<any>(null);
  const [showFloors, setShowFloors] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const { data: tangData } = useCrudPagination<any>({
    entity: 'Tang',
    endpoint: 'pagination?pageSize=100',
  });

  const tangList = useMemo(() => (tangData as any)?.result || [], [tangData]);

  useEffect(() => {
    if (tangList.length > 0 && !activeTang) setActiveTang(tangList[0]);
  }, [tangList, activeTang]);

  const {
    formMethods,
    data,
    isRefetching,
    onAdd,
    onEdit,
    onSave,
    handleDeleteRecord,
    selectedRows,
    handleRowSelectionModelChange,
    isModalOpen,
    handleCloseModal,
    isAddMode,
    tableConfig,
    isDeleteOpenModal,
    setIsDeleteOpenModal,
    refetch,
    mergeParams,
    columnVisibilityModel,
  } = useCrudPaginationModal<PhongKtx, PhongKtx>({
    entity: 'PhongKtx',
    endpoint: `pagination?TangId=${activeTang?.id || ''}`,
    defaultValues: {
      maPhong: '',
      loaiPhong: 'Nam',
      soLuongGiuong: 4,
      tangKtxId: activeTang?.id || '',
      trangThai: 0,
    },
    schema: phongSchema,
    enabled: !!activeTang?.id,
  });

  return (
    <FormProvider {...formMethods}>
      <Stack spacing={1} sx={{ p: 2, height: '100%', overflow: 'hidden', bgcolor: '#f8fafc' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Apartment color="primary" fontSize="small" />
            <Typography variant="overline" fontWeight={800} color="text.secondary">
              DANH SÁCH TẦNG
            </Typography>
          </Stack>
          <Button
            size="small"
            onClick={() => setShowFloors(!showFloors)}
            startIcon={showFloors ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{ fontWeight: 600 }}
          >
            {showFloors ? 'Thu gọn' : 'Mở rộng'}
          </Button>
        </Stack>
        <Collapse in={showFloors}>
          <Box sx={{ p: 1, bgcolor: 'white', borderRadius: 1.5, border: '1px solid #e2e8f0' }}>
            <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 0.2 }}>
              {tangList.map((tang: any) => (
                <Button
                  key={tang.id}
                  variant={activeTang?.id === tang.id ? 'contained' : 'outlined'}
                  startIcon={<Layers />}
                  onClick={() => setActiveTang(tang)}
                  sx={{
                    borderRadius: 1,
                    minWidth: 130,
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: activeTang?.id === tang.id ? 2 : 0,
                  }}
                >
                  {tang.tenTang}
                </Button>
              ))}
            </Stack>
          </Box>
        </Collapse>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px solid #e2e8f0',
          }}
        >
          <ActionsToolbar
            selectedRowIds={selectedRows}
            onAdd={() => onAdd()}
            onEdit={onEdit}
            onDelete={() => setIsDeleteOpenModal(true)}
            onExport={(dataOption, columnOption) => {
              exportPaginationToExcel({
                entity: 'PhongKtx',
                columns: getPhongColumns(() => {}),
                options: { dataOption, columnOption },
                fileName: `Danh_sach_phong_${activeTang?.tenTang || 'KTX'}`,
                columnVisibilityModel,
                filteredData: (data as any)?.result || [],
              });
            }}
          />
          <Box sx={{ pr: 1 }}>
            <IconButton
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}
              size="small"
              sx={{ border: '1px solid #e2e8f0', borderRadius: 1 }}
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={() => setMenuAnchorEl(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => {
                  navigate('/dormitory-management/dormitory-student-list');
                  setMenuAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <DescriptionOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText>Duyệt đơn KTX</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/dormitory-management/student-dormitory-Vi-Pham');
                  setMenuAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <ErrorSharp fontSize="small" />
                </ListItemIcon>
                <ListItemText>Vi phạm nội quy</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/dormitory-management/student-dormitory-lookup');
                  setMenuAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <DescriptionOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText>Tra cứu sinh viên KTX</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <RoomFilter
          onApply={(f: any) => {
            mergeParams(f);
            tableConfig.onPaginationModelChange({ ...tableConfig.paginationModel, page: 0 });
          }}
          onReset={() => {
            mergeParams({ maPhong: undefined, loaiPhong: undefined });
            refetch();
          }}
        />

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
            borderRadius: 1.5,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <DataGridTable
            rows={(data as any)?.result || []}
            columns={getPhongColumns((phong) => setViewingPhong(phong))}
            loading={isRefetching}
            checkboxSelection
            disableRowSelectionOnClick={false}
            getRowId={(row) => row.id}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectedRows}
            {...tableConfig}
          />
        </Box>

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Thêm phòng mới' : `Cập nhật phòng`}
            onClose={handleCloseModal}
            onSave={onSave}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <RoomForm />
          </FormDetailsModal>
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

        <BedListSidebar phong={viewingPhong} onClose={() => setViewingPhong(null)} />
      </Stack>
    </FormProvider>
  );
};

export default QuanLyPhongKtx;
