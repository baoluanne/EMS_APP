import { Stack, Typography, Button } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { DeleteConfirmationModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { GridColDef, GridRowSelectionModel, GridRenderCellParams } from '@mui/x-data-grid';
import { donKtxSchema } from '@renderer/features/ktx-management/don-sinh-vien/validation';
import {
  DonSinhVienFilter,
  FilterValues,
} from '@renderer/features/ktx-management/don-sinh-vien/components/DonSinhVienFilter';
import XuLyDonModal from '@renderer/components/selections/ktx/XuLyDonModal';
import { useState, useCallback, useMemo } from 'react';
import { DonKtxRow } from '@renderer/features/ktx-management/don-sinh-vien/type';
import axios from 'axios';
import { env } from '@renderer/shared/configs/env.config';

const defaultValues = {};

const api = axios.create({
  baseURL: env.API_ENDPOINT,
});

export default function DanhSachDonSinhVien() {
  const [selectedDon, setSelectedDon] = useState<any>(null);
  const [openXuLyModal, setOpenXuLyModal] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});

  const {
    data,
    isRefetching,
    selectedRows,
    isDeleteOpenModal,
    setIsDeleteOpenModal,
    handleDeleteRecord,
    handleRowSelectionModelChange,
    refetch,
    tableConfig,
    columnVisibilityModel,
  } = useCrudPaginationModal({
    defaultValues,
    schema: donKtxSchema,
    entity: 'don-ktx',
  });

  const rawRowsData = (data as any)?.data ?? [];

  const displayRows = useMemo(() => {
    if (!filters.maSinhVien && !filters.hoTen && !filters.trangThai) {
      return rawRowsData;
    }

    return rawRowsData.filter((row: any) => {
      const matchMaSV =
        !filters.maSinhVien ||
        row.maSinhVien?.toLowerCase().includes(filters.maSinhVien.toLowerCase());

      const matchHoTen =
        !filters.hoTen || row.hoTenSinhVien?.toLowerCase().includes(filters.hoTen.toLowerCase());

      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;

      return matchMaSV && matchHoTen && matchTrangThai;
    });
  }, [rawRowsData, filters]);

  const handleFilter = useCallback((filterValues: FilterValues) => {
    setFilters(filterValues);
  }, []);

  const handleReset = useCallback(() => {
    setFilters({});
  }, []);

  const handleXuLyDon = (don: any) => {
    setSelectedDon(don);
    setOpenXuLyModal(true);
  };

  const handleCloseXuLy = () => {
    setOpenXuLyModal(false);
    setSelectedDon(null);
  };

  const handleSuccess = () => {
    refetch();
    handleCloseXuLy();
    handleReset();
  };

  const columns: GridColDef<DonKtxRow>[] = [
    {
      field: 'maDon',
      headerName: 'Mã đơn',
      minWidth: 150,
    },
    {
      field: 'hoTenSinhVien',
      headerName: 'Họ tên SV',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'maSinhVien',
      headerName: 'Mã SV',
      minWidth: 120,
    },
    {
      field: 'lop',
      headerName: 'Lớp',
      minWidth: 100,
    },
    {
      field: 'loaiDon',
      headerName: 'Loại đơn',
      minWidth: 140,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value as string | undefined;
        switch (value) {
          case 'VaoO':
            return 'Vào ở';
          case 'ChuyenPhong':
            return 'Chuyển phòng';
          case 'GiaHan':
          case 'GiaHanKtx':
            return 'Gia hạn';
          case 'RoiKtx':
            return 'Rời KTX';
          default:
            return value || '-';
        }
      },
    },
    {
      field: 'trangThai',
      headerName: 'Trạng thái',
      minWidth: 140,
      renderCell: (params: GridRenderCellParams) => {
        const status = params.value as string | undefined;
        let color = '#666';
        if (status === 'DaDuyet') color = 'green';
        if (status === 'TuChoi') color = 'red';
        if (status === 'ChoPheDuyet' || status === 'ChoPhuyet') color = 'orange';

        const displayText =
          status === 'ChoPheDuyet' || status === 'ChoPhuyet'
            ? 'Chờ duyệt'
            : status === 'DaDuyet'
              ? 'Đã duyệt'
              : status === 'TuChoi'
                ? 'Từ chối'
                : status || '-';

        return <span style={{ color, fontWeight: 600 }}>{displayText}</span>;
      },
    },
    {
      field: 'maPhongHienTai',
      headerName: 'Phòng hiện tại',
      minWidth: 120,
    },
    {
      field: 'maPhongDuocDuyet',
      headerName: 'Phòng được duyệt',
      minWidth: 140,
    },
    {
      field: 'ngayBatDauHienTai',
      headerName: 'Ngày bắt đầu (hiện tại)',
      width: 180,
      type: 'date',
      valueGetter: (value) => (value ? new Date(value) : null),
      renderCell: (params) => {
        if (!params.value) {
          return <span style={{ color: 'red' }}>Chưa có</span>;
        }
        return new Date(params.value).toLocaleDateString('vi-VN');
      },
    },
    {
      field: 'ngayHetHanHienTai',
      headerName: 'Ngày hết hạn (hiện tại)',
      width: 180,
      type: 'date',
      valueGetter: (value) => (value ? new Date(value) : null),
      renderCell: (params) => {
        if (!params.value) {
          return <span style={{ color: 'red' }}>Chưa có</span>;
        }
        return new Date(params.value).toLocaleDateString('vi-VN');
      },
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      minWidth: 160,
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const row = params.row;
        if (row.trangThai !== 'ChoPhuyet' && row.trangThai !== 'ChoPheDuyet') return null;

        return (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleXuLyDon(row);
            }}
          >
            Xử lý đơn
          </Button>
        );
      },
    },
  ];

  return (
    <Stack height="100%" gap={2} sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={600}>
        Danh sách đơn sinh viên KTX
      </Typography>

      <ActionsToolbar
        selectedRowIds={selectedRows as GridRowSelectionModel}
        onDelete={() => setIsDeleteOpenModal(true)}
        onExport={(dataOption, columnOption) =>
          exportPaginationToExcel({
            entity: 'DonKtx',
            filteredData: displayRows,
            columns,
            options: { dataOption, columnOption },
            columnVisibilityModel,
            fileName: 'danh_sach_don_sinh_vien_ktx',
          })
        }
      />

      {isDeleteOpenModal && (
        <DeleteConfirmationModal
          onClose={() => setIsDeleteOpenModal(false)}
          onDelete={handleDeleteRecord}
        />
      )}

      <DonSinhVienFilter onFilter={handleFilter} onReset={handleReset} />

      <DataGridTable
        columns={columns}
        rows={displayRows}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height="calc(100% - 85px)"
        {...tableConfig}
      />

      {selectedDon && (
        <XuLyDonModal
          open={openXuLyModal}
          onClose={handleCloseXuLy}
          don={selectedDon}
          onSuccess={handleSuccess}
        />
      )}
    </Stack>
  );
}
