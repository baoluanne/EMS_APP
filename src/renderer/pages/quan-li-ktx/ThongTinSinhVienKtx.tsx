import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  Stack,
  Box,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
} from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { roomColumns } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/configs/table.configs';
import { KtxSidebar } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/KtxSidebar';
import { FloorStatsCard } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/FloorStatsCard';
import { ThongTinSvKtxFilter } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/ThongTinSinhVienFilter';
import { floorStatsConfig } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/configs/floorStats';
import type { ThongTinSvKtxFilterState } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/type';
import { thongTinSvKtxSchema } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/validation';
import { FormProvider } from 'react-hook-form';
import { BedListDrawer } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/StudentListDrawer';
import { StudentSearchResultDrawer } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/StudentSearchResultDrawer';
import { ResidencyHistoryModal } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/CutruHistory';
import {
  DescriptionOutlined,
  ErrorSharp,
  MoreVert,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Analytics,
  Home,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ThongTinSinhVienKtx() {
  const [expandedToa, setExpandedToa] = useState<string | null>(null);
  const [selectedTang, setSelectedTang] = useState<any>(null);
  const [selectedPhong, setSelectedPhong] = useState<any>(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // State điều khiển việc thu gọn thống kê
  const [showStats, setShowStats] = useState(true);

  const [filterState, setFilterState] = useState<ThongTinSvKtxFilterState>({});
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const openMenu = Boolean(menuAnchorEl);

  const {
    formMethods,
    data: phongData,
    isRefetching: loadingPhong,
    tableConfig,
    mergeParams,
    selectedRows,
    handleRowSelectionModelChange,
    columnVisibilityModel,
  } = useCrudPaginationModal<any, any>({
    defaultValues: { maPhong: '' },
    schema: thongTinSvKtxSchema,
    entity: 'PhongKtx',
  });

  const { data: toaNhaData } = useCrudPagination<any>({
    entity: 'ToaNhaKtx',
    endpoint: 'pagination?pageSize=100',
  });
  const { data: tangData } = useCrudPagination<any>({
    entity: 'Tang',
    endpoint: `pagination?ToaNhaId=${expandedToa}&pageSize=100`,
    enabled: !!expandedToa,
  });

  useEffect(() => {
    if (selectedTang?.id) mergeParams({ TangId: selectedTang.id });
  }, [selectedTang, mergeParams]);

  const handleExpandToa = useCallback((id: string | null) => setExpandedToa(id), []);
  const handleSelectTang = useCallback((tang: any) => {
    setSelectedTang(tang);
    setSelectedPhong(null);
  }, []);

  const handleFilterApply = (filters: ThongTinSvKtxFilterState) => {
    setFilterState(filters);
    const hasRealFilter = Object.values(filters).some(
      (v) => v !== undefined && v !== '' && v !== null,
    );
    setIsSearchResultOpen(hasRealFilter);
  };

  const handleFilterReset = useCallback(() => {
    setFilterState({});
    setIsSearchResultOpen(false);
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const floorStats = useMemo(() => {
    const phongs = (phongData as any)?.result || [];
    let tBeds = 0;
    let oBeds = 0;
    phongs.forEach((p: any) => {
      tBeds += p.soLuongGiuong || 0;
      oBeds += p.giuongs?.filter((g: any) => g.trangThai === 1).length || 0;
    });
    return {
      totalRooms: phongs.length,
      totalBeds: tBeds,
      occupiedBeds: oBeds,
      availableBeds: tBeds - oBeds,
    };
  }, [phongData]);

  return (
    <FormProvider {...formMethods}>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          bgcolor: '#f8fafc',
          overflow: 'hidden',
        }}
      >
        <KtxSidebar
          toaNhaData={(toaNhaData as any)?.result}
          tangData={(tangData as any)?.result}
          expandedToa={expandedToa}
          selectedTangId={selectedTang?.id}
          onExpandToa={handleExpandToa}
          onSelectTang={handleSelectTang}
        />

        <Stack flexGrow={1} p={2} spacing={2} sx={{ overflowY: 'auto' }}>
          {selectedTang ? (
            <>
              {/* Header điều khiển Thống kê */}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Analytics color="action" fontSize="small" />
                  <Typography
                    variant="overline"
                    fontWeight={600}
                    color="text.secondary"
                    sx={{ letterSpacing: 1 }}
                  >
                    Báo cáo nhanh tầng {selectedTang.tenTang}
                  </Typography>
                </Stack>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setShowStats(!showStats)}
                  startIcon={showStats ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  sx={{ fontWeight: 700, borderRadius: 2 }}
                >
                  {showStats ? 'Thu gọn thống kê' : 'Mở rộng thống kê'}
                </Button>
              </Stack>

              {/* Khu vực thống kê có khả năng thu gọn */}
              <Collapse in={showStats}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {floorStatsConfig.map((stat) => (
                    <Grid key={stat.key} size={3}>
                      <FloorStatsCard
                        label={stat.label}
                        value={floorStats[stat.key as keyof typeof floorStats]}
                        icon={stat.icon}
                        color={stat.color}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Collapse>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <ActionsToolbar
                  selectedRowIds={selectedRows}
                  onExport={(dataOption, columnOption) =>
                    exportPaginationToExcel<any>({
                      entity: 'DanhSachPhong',
                      filteredData: (phongData as any)?.result || [],
                      columns: roomColumns,
                      options: { dataOption, columnOption },
                      fileName: `Phong_Tang_${selectedTang.tenTang}`,
                      columnVisibilityModel,
                    })
                  }
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

              {/* FILTER MỚI - Autocomplete search */}
              <Box>
                <ThongTinSvKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />
              </Box>

              <Box
                flexGrow={1}
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                }}
              >
                <DataGridTable
                  {...tableConfig}
                  columns={roomColumns}
                  rows={(phongData as any)?.result || []}
                  loading={loadingPhong}
                  onRowClick={(params) => setSelectedPhong(params.row)}
                  onRowSelectionModelChange={handleRowSelectionModelChange}
                  rowSelectionModel={selectedRows}
                  getRowId={(row) => row.id}
                  sx={{
                    flex: 1,
                    '& .MuiDataGrid-root': { border: 'none', height: '100%' },
                    '& .MuiDataGrid-columnHeaders': {
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: '#fafafa',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700, fontSize: '14px' },
                    '& .MuiDataGrid-cell': {
                      borderRight: '1px solid #f0f0f0',
                      padding: '12px 8px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  }}
                />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                CHỌN TẦNG Ở SIDEBAR ĐỂ XEM DỮ LIỆU
              </Typography>
            </Box>
          )}
        </Stack>

        {/* BedListDrawer - Click vào phòng */}
        <BedListDrawer
          phong={selectedPhong}
          onClose={() => setSelectedPhong(null)}
          onStudentClick={(row) => {
            setSelectedStudent(row);
            setOpenHistoryModal(true);
          }}
        />

        {/* StudentSearchResultDrawer - Kết quả tìm kiếm sinh viên */}
        <StudentSearchResultDrawer
          open={isSearchResultOpen}
          filters={filterState}
          onClose={() => setIsSearchResultOpen(false)}
          onStudentClick={(student) => {
            setSelectedStudent(student);
            setOpenHistoryModal(true);
          }}
        />

        {/* ResidencyHistoryModal - Lịch sử cư trú */}
        <ResidencyHistoryModal
          open={openHistoryModal}
          onClose={() => {
            setOpenHistoryModal(false);
            setSelectedStudent(null);
          }}
          studentData={selectedStudent}
        />
      </Box>
    </FormProvider>
  );
}
