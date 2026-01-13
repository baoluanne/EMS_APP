import { useState, useMemo, useCallback } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { FormDetailsModal, DeleteConfirmationModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { GridColDef } from '@mui/x-data-grid';
import { TITLE_MODE } from '@renderer/shared/enums';
import { env } from '@renderer/shared/configs/env.config';

import {
  DonKtxResponse,
  DonKtxCreateInput,
} from '@renderer/features/ktx-management/don-sinh-vien/type';
import { donKtxSchema } from '@renderer/features/ktx-management/don-sinh-vien/validation';
import { DonSinhVienForm } from '@renderer/features/ktx-management/don-sinh-vien/components/DonSinhVienForm';
import {
  DonSinhVienFilter,
  DonSinhVienFilterState,
} from '@renderer/features/ktx-management/don-sinh-vien/components/DonSinhVienFilter';
import XuLyDonModal from '@renderer/components/selections/ktx/XuLyDonModal';

export default function DanhSachDonSinhVien() {
  const [selectedDonToProcess, setSelectedDonToProcess] = useState<DonKtxResponse | null>(null);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);

  const [filters, setFilters] = useState<DonSinhVienFilterState>({});

  const {
    formMethods,
    data,
    isModalOpen,
    isRefetching,
    selectedRows,
    isDeleteOpenModal,
    setIsDeleteOpenModal,
    handleDeleteRecord,
    handleRowSelectionModelChange,
    handleCloseModal,
    onAdd,
    refetch,
    tableConfig,
    isAddMode,
    columnVisibilityModel,
  } = useCrudPaginationModal<DonKtxCreateInput, any>({
    defaultValues: {
      id: null,
      idSinhVien: '',
      loaiDon: '',
      ngayBatDau: new Date().toISOString(),
      ghichu: '',
      lyDoChuyen: '',
      phongHienTai: null,
      phongMuonChuyen: null,
    },
    schema: donKtxSchema,
    entity: 'don-ktx',
  });

  const onSubmit: SubmitHandler<DonKtxCreateInput> = async (formData) => {
    const payload = { ...formData };
    if (payload.ngayBatDau) payload.ngayBatDau = dayjs(payload.ngayBatDau).toISOString();
    if (payload.ngayHetHan) payload.ngayHetHan = dayjs(payload.ngayHetHan).toISOString();

    if (isAddMode) {
      await axios.post(`${env.API_ENDPOINT}/don-ktx/tao-don`, payload);
    } else {
      await axios.put(`${env.API_ENDPOINT}/don-ktx/${payload.id}`, payload);
    }
    refetch();
    handleCloseModal();
  };

  const handleFilterApply = useCallback((filterValues: DonSinhVienFilterState) => {
    setFilters(filterValues);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters({});
  }, []);

  const rawRowsData = useMemo(() => {
    const rawData = (data as any)?.data || (data as any)?.result || [];
    return Array.isArray(rawData)
      ? rawData.map((d: any) => ({
          ...d,
          id: d.id || d.Id,
          maDon: d.maDon || d.MaDon,
          trangThai: d.trangThai || d.TrangThai,
        }))
      : [];
  }, [data]);

  const displayRows = useMemo(() => {
    if (!filters.maSinhVien && !filters.hoTen && !filters.trangThai && !filters.loaiDon) {
      return rawRowsData;
    }

    return rawRowsData.filter((row) => {
      const matchMaSV =
        !filters.maSinhVien ||
        row.maSinhVien?.toLowerCase().includes(filters.maSinhVien.toLowerCase());
      const matchHoTen =
        !filters.hoTen || row.hoTenSinhVien?.toLowerCase().includes(filters.hoTen.toLowerCase());
      const matchTrangThai = !filters.trangThai || row.trangThai === filters.trangThai;
      const matchLoaiDon = !filters.loaiDon || row.loaiDon === filters.loaiDon;

      return matchMaSV && matchHoTen && matchTrangThai && matchLoaiDon;
    });
  }, [rawRowsData, filters]);

  const columns: GridColDef<DonKtxResponse>[] = [
    { field: 'maDon', headerName: 'Mã đơn', width: 250 },
    { field: 'hoTenSinhVien', headerName: 'Họ tên SV', flex: 1, minWidth: 180 },
    { field: 'maSinhVien', headerName: 'Mã SV', width: 120 },
    {
      field: 'loaiDon',
      headerName: 'Loại đơn',
      width: 140,
      valueFormatter: (value: any) =>
        ({ VaoO: 'Vào ở', ChuyenPhong: 'Chuyển phòng', GiaHanKtx: 'Gia hạn', RoiKtx: 'Rời KTX' })[
          value
        ] || value,
    },
    {
      field: 'trangThai',
      headerName: 'Trạng thái',
      width: 140,
      renderCell: (params) => {
        const s = params.value;
        const color =
          s === 'ChoPhuyet'
            ? 'orange'
            : s === 'DaDuyet'
              ? 'green'
              : s === 'TuChoi'
                ? 'red'
                : 'default';
        const text =
          s === 'ChoPhuyet'
            ? 'Chờ duyệt'
            : s === 'DaDuyet'
              ? 'Đã duyệt'
              : s === 'TuChoi'
                ? 'Từ chối'
                : s;
        return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
      },
    },
    {
      field: 'ngayGuiDon',
      headerName: 'Ngày gửi',
      width: 150,
      valueFormatter: (value: any) =>
        value && dayjs(value).year() > 1901 ? dayjs(value).format('DD/MM/YYYY') : '',
    },
    {
      field: 'actions',
      headerName: 'Xử lý',
      width: 120,
      align: 'center',
      sortable: false,
      renderCell: (params) =>
        params.row.trangThai === 'ChoPhuyet' ? (
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDonToProcess(params.row);
              setIsProcessModalOpen(true);
            }}
          >
            Xử lý
          </Button>
        ) : null,
    },
  ];

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" width="100%" p={2} spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Quản lý Đơn Sinh Viên
        </Typography>
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onAdd={onAdd}
          onDelete={() => setIsDeleteOpenModal(true)}
          onExport={(d, c) =>
            exportPaginationToExcel({
              entity: 'DonKtx',
              filteredData: displayRows,
              columns,
              options: { dataOption: d, columnOption: c },
              fileName: 'DS_Don',
              columnVisibilityModel,
            })
          }
        />
        <DonSinhVienFilter onApply={handleFilterApply} onReset={handleFilterReset} />

        <DataGridTable
          columns={columns}
          rows={displayRows}
          loading={isRefetching}
          checkboxSelection
          getRowId={(row) => row.id}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
          height="calc(100% - 130px)"
        />

        {isModalOpen && (
          <FormDetailsModal
            title={isAddMode ? 'Tạo đơn mới' : 'Cập nhật đơn'}
            onClose={handleCloseModal}
            onSave={formMethods.handleSubmit(onSubmit)}
            maxWidth="sm"
            titleMode={TITLE_MODE.COLORED}
          >
            <DonSinhVienForm />
          </FormDetailsModal>
        )}
        {isProcessModalOpen && (
          <XuLyDonModal
            open={isProcessModalOpen}
            onClose={() => setIsProcessModalOpen(false)}
            don={selectedDonToProcess}
            onSuccess={() => {
              setIsProcessModalOpen(false);
              refetch();
            }}
          />
        )}
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
      </Stack>
    </FormProvider>
  );
}
