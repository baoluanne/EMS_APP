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
  Divider,
} from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { getStudentResidencyColumns } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/configs/table.configs';
import { FloorStatsCard } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/FloorStatsCard';
import { ThongTinSvKtxFilter } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/ThongTinSinhVienFilter';
import type { ThongTinSvKtxFilterState } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/type';
import { thongTinSvKtxSchema } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/validation';
import { FormProvider } from 'react-hook-form';
import { BedListDrawer } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/StudentListDrawer';
import { StudentSearchResultDrawer } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/StudentSearchResultDrawer';
import { ResidencyHistorySidebar } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/CutruHistory';
import {
  Apartment,
  DescriptionOutlined,
  ErrorSharp,
  MoreVert,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Home,
  People,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ThongTinSinhVienKtx() {
  const [activeToa, setActiveToa] = useState<any>(null);
  const [selectedTang, setSelectedTang] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(true);
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
    data: residencyData,
    isRefetching: loadingResidency,
    tableConfig,
    mergeParams,
    selectedRows,
    handleRowSelectionModelChange,
    columnVisibilityModel,
  } = useCrudPaginationModal<any, any>({
    defaultValues: { Keyword: '' },
    schema: thongTinSvKtxSchema,
    entity: 'CuTruKtx',
    endpoint: 'pagination?TrangThai=0', // Chỉ lấy những người đang ở (TrangThai = 0 hoặc tương đương)
  });

  const { data: toaNhaData } = useCrudPagination<any>({
    entity: 'ToaNhaKtx',
    endpoint: 'pagination?pageSize=100',
  });
  const { data: tangData } = useCrudPagination<any>({
    entity: 'Tang',
    endpoint: `pagination?ToaNhaId=${activeToa?.id || ''}&pageSize=100`,
    enabled: !!activeToa?.id,
  });

  const toaList = useMemo(() => (toaNhaData as any)?.result || [], [toaNhaData]);
  const tangList = useMemo(() => (tangData as any)?.result || [], [tangData]);

  useEffect(() => {
    if (toaList.length > 0 && !activeToa) setActiveToa(toaList[0]);
  }, [toaList, activeToa]);

  useEffect(() => {
    setSelectedTang(null);
  }, [activeToa]);

  useEffect(() => {
    if (tangList.length > 0 && !selectedTang) setSelectedTang(tangList[0]);
  }, [tangList, selectedTang]);

  useEffect(() => {
    if (selectedTang?.id) mergeParams({ TangId: selectedTang.id });
  }, [selectedTang, mergeParams]);


  const handleFilterApply = (filters: ThongTinSvKtxFilterState) => {
    setFilterState(filters);
    const hasRealFilter = Object.values(filters).some(
      (v) => v !== undefined && v !== '' && v !== null,
    );
    setIsSearchResultOpen(hasRealFilter);
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filterState).some((v) => v !== undefined && v !== '' && v !== null);
  }, [filterState]);

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

  const stats = useMemo(() => {
    const records = (residencyData as any)?.result || [];
    const uniqueStudents = new Set(records.map((r: any) => r.sinhVienId)).size;
    const maleCount = records.filter((r: any) => r.sinhVien?.gioiTinh === 0).length;
    const femaleCount = records.filter((r: any) => r.sinhVien?.gioiTinh === 1).length;

    return {
      totalStudents: uniqueStudents,
      maleCount,
      femaleCount,
      totalRecords: records.length,
    };
  }, [residencyData]);

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
        <Stack flexGrow={1} p={2} spacing={2} sx={{ overflowY: 'auto' }}>
          {/* Header & Filter Pattern giống Infrastructure */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Apartment color="primary" fontSize="small" />
              <Typography variant="overline" fontWeight={800} color="text.secondary">
                CHỌN TÒA & TẦNG TRA CỨU
              </Typography>
            </Stack>
            <Button
              size="small"
              onClick={() => setShowFilters(!showFilters)}
              startIcon={showFilters ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              sx={{ fontWeight: 600 }}
            >
              {showFilters ? 'Thu gọn' : 'Mở rộng'}
            </Button>
          </Stack>

          <Collapse in={showFilters}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'white',
                borderRadius: 1.5,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mb: 1,
              }}
            >
              {/* Chọn Tòa */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" fontWeight={700} sx={{ minWidth: 80 }}>
                  Tòa nhà:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 0.5 }}>
                  {toaList.map((toa: any) => (
                    <Button
                      key={toa.id}
                      variant={activeToa?.id === toa.id ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => setActiveToa(toa)}
                      sx={{
                        borderRadius: 1,
                        minWidth: 100,
                        fontWeight: 700,
                        textTransform: 'none',
                      }}
                    >
                      {toa.tenToaNha}
                    </Button>
                  ))}
                </Stack>
              </Stack>

              <Divider />

              {/* Chọn Tầng */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" fontWeight={700} sx={{ minWidth: 80 }}>
                  Tầng:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 0.5 }}>
                  {tangList.length > 0 ? (
                    tangList.map((tang: any) => (
                      <Button
                        key={tang.id}
                        variant={selectedTang?.id === tang.id ? 'contained' : 'outlined'}
                        size="small"
                        color="secondary"
                        onClick={() => setSelectedTang(tang)}
                        sx={{
                          borderRadius: 1,
                          minWidth: 80,
                          fontWeight: 700,
                          textTransform: 'none',
                        }}
                      >
                        {tang.tenTang}
                      </Button>
                    ))
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      Vui lòng chọn Tòa nhà
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Collapse>
          {selectedTang ? (
            <>
              {/* Header điều khiển Thống kê */}
              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ mt: 1 }}>
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
                  <Grid size={4}>
                    <FloorStatsCard
                      label="Tổng sinh viên"
                      value={stats.totalStudents}
                      icon={<People />}
                      color="#1976d2"
                    />
                  </Grid>
                  <Grid size={4}>
                    <FloorStatsCard
                      label="Sinh viên Nam"
                      value={stats.maleCount}
                      icon={<People />}
                      color="#0288d1"
                    />
                  </Grid>
                  <Grid size={4}>
                    <FloorStatsCard
                      label="Sinh viên Nữ"
                      value={stats.femaleCount}
                      icon={<People />}
                      color="#d32f2f"
                    />
                  </Grid>
                </Grid>
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
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <ActionsToolbar
                    selectedRowIds={selectedRows}
                  onExport={(dataOption, columnOption) =>
                    exportPaginationToExcel<any>({
                      entity: 'CuTruKtx',
                      filteredData: (residencyData as any)?.result || [],
                      columns: getStudentResidencyColumns(),
                      options: { dataOption, columnOption },
                      fileName: `Danh_sach_SV_Tang_${selectedTang.tenTang}`,
                      columnVisibilityModel,
                    })
                  }
                  />
                  {hasActiveFilters && !isSearchResultOpen && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<SearchIcon />}
                      onClick={() => setIsSearchResultOpen(true)}
                      sx={{ fontWeight: 800, borderRadius: 1.5, height: 32 }}
                    >
                      Kết quả tìm kiếm
                    </Button>
                  )}
                </Stack>

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
              <Box sx={{ bgcolor: 'white', p: 0.5, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                <ThongTinSvKtxFilter onApply={handleFilterApply} onReset={handleFilterReset} />
              </Box>

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
                  {...tableConfig}
                  columns={getStudentResidencyColumns()}
                  rows={(residencyData as any)?.result || []}
                  loading={loadingResidency}
                  checkboxSelection
                  disableRowSelectionOnClick={false}
                  onRowClick={(params) => {
                    setSelectedStudent(params.row);
                    setOpenHistoryModal(true);
                  }}
                  onRowSelectionModelChange={handleRowSelectionModelChange}
                  rowSelectionModel={selectedRows}
                  getRowId={(row) => row.id}
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

        {/* ResidencyHistorySidebar - Lịch sử cư trú */}
        <ResidencyHistorySidebar
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
