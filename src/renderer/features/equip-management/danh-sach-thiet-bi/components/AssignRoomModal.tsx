import { useState } from 'react';
import { Stack, MenuItem, TextField, Typography, CircularProgress, Divider } from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMutation } from '@renderer/shared/mutations';
import { GridColDef } from '@mui/x-data-grid';
import InfoSection from '@renderer/components/InfoSection';
import BusinessIcon from '@mui/icons-material/Business';
import { toast } from 'react-toastify';
import { getTrangThaiLabel } from '../TrangThaiThietBiEnum';

interface Props {
  onClose: () => void;
  selectedIds: string[];
  onSuccess: () => void;
}

export const AssignRoomModal = ({ onClose, selectedIds, onSuccess }: Props) => {
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: roomsData, isRefetching: isRoomsLoading } = useCrudPagination<any>({
    entity: 'PhongHoc',
    defaultState: { pageSize: 20 },
  });

  const {
    data: existingDevicesData,
    isRefetching: isExistingLoading,
    generateTableConfig: genExistingTableConfig,
  } = useCrudPagination<any>({
    entity: 'ThietBi',
    endpoint: `pagination?PhongHocId=${roomId}`,
    enabled: !!roomId,
    defaultState: { pageSize: 50 },
  });

  const { mutateAsync: assignRoomAsync } = useMutation<any>(`ThietBi/phan-vao-phong/${roomId}`);

  const existingRows = (existingDevicesData as any)?.result ?? [];

  const handleConfirm = async () => {
    if (!roomId) {
      toast.error('Vui lòng chọn phòng học đích.');
      return;
    }

    setLoading(true);
    try {
      const response = await assignRoomAsync(selectedIds);
      if (response) {
        toast.success('Phân bổ thiết bị thành công!');
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra khi phân phòng.');
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'maThietBi', headerName: 'Mã TB', width: 120 },
    { field: 'tenThietBi', headerName: 'Tên thiết bị', flex: 1 },
    {
      field: 'trangThai',
      headerName: 'Tình trạng',
      width: 130,
      valueGetter: (_, row) => getTrangThaiLabel(row.trangThai),
    },
  ];

  return (
    <FormDetailsModal
      title="Điều chuyển thiết bị vào phòng"
      onClose={onClose}
      onSave={handleConfirm}
      maxWidth="sm"
      saveTitle={loading ? 'Đing xử lý...' : 'Xác nhận gán'}
    >
      <Stack spacing={2} sx={{ mt: 1 }}>
        <InfoSection
          title={
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <BusinessIcon color="primary" fontSize="small" /> 1. Thông tin phòng đích
            </Typography>
          }
        >
          <Stack spacing={2} p={1}>
            <TextField
              select
              fullWidth
              label={isRoomsLoading ? 'Đang tải danh sách phòng...' : 'Chọn phòng đích'}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              size="small"
              disabled={loading}
            >
              {roomsData?.result?.map((room: any) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.tenPhong} {room.dayNhaId}
                </MenuItem>
              ))}
            </TextField>

            <Typography
              variant="caption"
              fontWeight={600}
              color="textSecondary"
              sx={{ mb: 1, display: 'block' }}
            >
              Thiết bị hiện có tại phòng này ({existingRows.length}):
            </Typography>
            <DataGridTable
              rows={existingRows}
              columns={columns}
              loading={isExistingLoading}
              getRowId={(row) => row.id}
              checkboxSelection={false}
              hideFooter
              disableRowSelectionOnClick
              {...genExistingTableConfig(existingRows.length, isExistingLoading)}
              height={300}
            />
          </Stack>
        </InfoSection>

        <Divider />

        {loading && (
          <Stack direction="row" alignItems="center" spacing={1} justifyContent="center" py={1}>
            <CircularProgress size={16} />
            <Typography variant="caption" color="primary">
              Đang thực hiện phân bổ thiết bị...
            </Typography>
          </Stack>
        )}
      </Stack>
    </FormDetailsModal>
  );
};
