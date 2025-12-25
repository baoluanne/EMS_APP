// src/renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-sinh-vien-nhan-mien-giam/DanhSachSinhVienNhanMienGiam.tsx

import { Stack, Button, Chip } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { DataGridTable, GridColDef } from '@mui/x-data-grid';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { FormDetailsModal, ConfirmationModal } from '@renderer/components/modals';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { toast } from 'react-toastify';
import axios from 'axios';
import { env } from '@renderer/shared/configs/env.config';

import { columns } from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-sinh-vien-nhan-mien-giam/configs/table.config';
import { DanhSachSinhVienNhanMienGiamForm } from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-sinh-vien-nhan-mien-giam/components/DanhSachSinhVienNhanMienGiamForm';
import { DanhSachSinhVienNhanMienGiamFilter } from '@renderer/features/student-financial-management/chinh-sach-mien-giam/danh-sach-sinh-vien-nhan-mien-giam/components/DanhSachSinhVienNhanMienGiamFilter';

const api = axios.create({ baseURL: env.API_ENDPOINT });

export default function DanhSachSinhVienNhanMienGiam() {
  const formMethods = useForm();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const {
    data,
    isRefetching,
    tableConfig,
    selectedRows,
    handleRowSelectionModelChange,
    isCreateOpen,
    setIsCreateOpen,
    isDeleteOpenModal,
    setIsDeleteOpenModal,
    handleCreate,
    handleDeleteRecord,
    onSave,
    mergeParams,
    refetch,
  } = useCrudPaginationModal({
    apiEndpoint: '/api/mien-giam/custom-paged',
    queryKey: 'mien-giam-sinh-vien',
    formMethods,
    useCustomPaged: true,
  });

  const handleApprove = async () => {
    try {
      await api.post('/api/mien-giam/approve', { ids: selectedRows });
      toast.success('Duyệt thành công!');
      refetch();
    } catch {
      toast.error('Duyệt thất bại!');
    } finally {
      setApproveOpen(false);
    }
  };

  const handleReject = async () => {
    try {
      await api.post('/api/mien-giam/approve', {
        ids: selectedRows,
        trangThai: 'TuChoi',
      });
      toast.success('Từ chối thành công!');
      refetch();
    } catch {
      toast.error('Từ chối thất bại!');
    } finally {
      setRejectOpen(false);
    }
  };

  const canApproveOrReject = selectedRows.some(
    (id) => data?.result.find((r) => r.id === id)?.trangThai === 'ChoDuyet',
  );

  return (
    <FormProvider {...formMethods}>
      <Stack height="100%" spacing={2}>
        <ActionsToolbar
          title="Danh sách sinh viên nhận miễn giảm"
          onAdd={handleCreate}
          onDelete={selectedRows.length > 0 ? () => setIsDeleteOpenModal(true) : undefined}
          disableDelete={selectedRows.length === 0}
          extraButtons={
            <>
              <Button
                variant="contained"
                color="success"
                disabled={!canApproveOrReject}
                onClick={() => setApproveOpen(true)}
              >
                Duyệt
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={!canApproveOrReject}
                onClick={() => setRejectOpen(true)}
              >
                Từ chối
              </Button>
            </>
          }
        />

        {isCreateOpen && (
          <FormDetailsModal
            title="Đăng ký miễn giảm cho sinh viên"
            onClose={() => setIsCreateOpen(false)}
            onSave={onSave}
          >
            <DanhSachSinhVienNhanMienGiamForm />
          </FormDetailsModal>
        )}

        {isDeleteOpenModal && (
          <ConfirmationModal
            open={isDeleteOpenModal}
            title="Xóa đăng ký miễn giảm"
            content="Bạn có chắc chắn muốn xóa các bản ghi đã chọn?"
            onClose={() => setIsDeleteOpenModal(false)}
            onConfirm={handleDeleteRecord}
          />
        )}

        <ConfirmationModal
          open={approveOpen}
          title="Duyệt miễn giảm"
          content={`Bạn có chắc chắn muốn duyệt ${selectedRows.length} bản ghi?`}
          onClose={() => setApproveOpen(false)}
          onConfirm={handleApprove}
          confirmText="Duyệt"
          confirmColor="success"
        />

        <ConfirmationModal
          open={rejectOpen}
          title="Từ chối miễn giảm"
          content={`Bạn có chắc chắn muốn từ chối ${selectedRows.length} bản ghi?`}
          onClose={() => setRejectOpen(false)}
          onConfirm={handleReject}
          confirmText="Từ chối"
          confirmColor="error"
        />

        <DanhSachSinhVienNhanMienGiamFilter onApply={mergeParams} />

        <DataGridTable
          columns={columns}
          rows={data?.result ?? []}
          checkboxSelection
          loading={isRefetching}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          height="calc(100% - 85px)"
          {...tableConfig}
        />
      </Stack>
    </FormProvider>
  );
}
