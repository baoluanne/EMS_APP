import { useMemo, useState, useEffect } from 'react';
import { Stack, Box, Typography, Chip, Grid, Paper } from '@mui/material';
import { Wc, HomeWork, People, Hotel, CheckCircle } from '@mui/icons-material';

import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

import { ResidencyHistoryModal } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/CutruHistory';
import { thongTinSvKtxSchema } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/validation';

import { KtxSidebar } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/KtxSidebar';
import { BedListDrawer } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/components/StudentListDrawer';
import { FormProvider } from 'react-hook-form';

export default function ThongTinSinhVienKtx() {
  const [expandedToa, setExpandedToa] = useState<string | null>(null);
  const [selectedTang, setSelectedTang] = useState<any>(null);
  const [selectedPhong, setSelectedPhong] = useState<any>(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

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

  // Cột cho bảng danh sách Phòng ở giữa
  const roomColumns: any = [
    { field: 'maPhong', headerName: 'Phòng', flex: 1, renderCell: (p: any) => <b>{p.value}</b> },
    {
      field: 'loaiPhong',
      headerName: 'Loại',
      width: 120,
      renderCell: (p: any) => (
        <Chip size="small" label={p.value} icon={<Wc sx={{ fontSize: 14 }} />} />
      ),
    },
    { field: 'soLuongGiuong', headerName: 'Tổng giường', width: 120, align: 'center' },
    {
      field: 'occupied',
      headerName: 'Đang ở',
      width: 100,
      align: 'center',
      valueGetter: (_: any, row: any) =>
        row.giuongs?.filter((g: any) => g.trangThai === 1).length || 0,
    },
    {
      field: 'available',
      headerName: 'Giường trống',
      width: 120,
      align: 'center',
      renderCell: (p: any) => {
        const empty =
          (p.row.soLuongGiuong || 0) -
          (p.row.giuongs?.filter((g: any) => g.trangThai === 1).length || 0);
        return (
          <Typography
            variant="body2"
            fontWeight={700}
            color={empty > 0 ? 'success.main' : 'error.main'}
          >
            {empty}
          </Typography>
        );
      },
    },
  ];

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
          onExpandToa={setExpandedToa}
          onSelectTang={(tang) => {
            setSelectedTang(tang);
            setSelectedPhong(null);
          }}
        />

        <Stack flexGrow={1} p={2} spacing={2} sx={{ overflowY: 'auto' }}>
          {selectedTang ? (
            <>
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

              <Grid container spacing={2}>
                <Grid size={3}>
                  <StatCard
                    label="Tổng phòng"
                    value={floorStats.totalRooms}
                    icon={<HomeWork color="primary" />}
                    color="#1976d2"
                  />
                </Grid>
                <Grid size={3}>
                  <StatCard
                    label="Tổng SV"
                    value={floorStats.occupiedBeds}
                    icon={<People color="secondary" />}
                    color="#9c27b0"
                  />
                </Grid>
                <Grid size={3}>
                  <StatCard
                    label="Tổng giường"
                    value={floorStats.totalBeds}
                    icon={<Hotel color="info" />}
                    color="#0288d1"
                  />
                </Grid>
                <Grid size={3}>
                  <StatCard
                    label="Trống"
                    value={floorStats.availableBeds}
                    icon={<CheckCircle color="success" />}
                    color="#2e7d32"
                  />
                </Grid>
              </Grid>

              <Box
                flexGrow={1}
                sx={{
                  height: 500,
                  bgcolor: '#fff',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
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

        <BedListDrawer
          phong={selectedPhong}
          onClose={() => setSelectedPhong(null)}
          onStudentClick={(row) => {
            setSelectedStudent(row);
            setOpenHistoryModal(true);
          }}
        />

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

const StatCard = ({ label, value, icon, color }: any) => (
  <Paper
    variant="outlined"
    sx={{
      p: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      bgcolor: '#fff',
      borderRadius: 2,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: `${color}15`, display: 'flex', color: color }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={700}>
        {label.toUpperCase()}
      </Typography>
      <Typography variant="h6" fontWeight={800}>
        {value}
      </Typography>
    </Box>
  </Paper>
);
