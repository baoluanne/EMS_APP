import { useState, useMemo } from 'react';
import {
  Stack,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
  Box,
  Grid,
} from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMutation } from '@renderer/shared/mutations';
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
  selectedIds: string[];
  onSuccess: () => void;
  initialData?: any;
}

export const AssignRoomModal = ({ onClose, selectedIds, onSuccess, initialData }: Props) => {
  const [targetType, setTargetType] = useState<'HOC' | 'KTX'>('HOC');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: roomsHoc, isRefetching: loadingHoc } = useCrudPagination<any>({
    entity: 'PhongHoc',
    endpoint: `pagination?Keyword=${searchTerm}`,
    enabled: targetType === 'HOC',
  });

  const { data: roomsKtx, isRefetching: loadingKtx } = useCrudPagination<any>({
    entity: 'PhongKtx',
    endpoint: `pagination?MaPhong=${searchTerm}`,
    enabled: targetType === 'KTX',
  });

  const options = useMemo(() => {
    const data = targetType === 'HOC' ? roomsHoc : roomsKtx;
    return (data as any)?.result || [];
  }, [targetType, roomsHoc, roomsKtx]);

  const { mutateAsync: assignRoomAsync } = useMutation<any>(
    `ThietBi/phan-vao-phong/${selectedRoom?.id}?isKtx=${targetType === 'KTX'}`,
  );

  const handleConfirm = async () => {
    if (!selectedRoom) return toast.error('Vui lòng chọn phòng đích.');
    setLoading(true);
    try {
      await assignRoomAsync(selectedIds);
      toast.success('Điều chuyển thành công!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Lỗi hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  const InfoItem = ({ label, value }: { label: string; value: string | number }) => (
    <Box>
      <Typography
        variant="caption"
        color="textSecondary"
        fontWeight={600}
        sx={{ display: 'block', textTransform: 'uppercase' }}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={700}>
        {value || '---'}
      </Typography>
    </Box>
  );

  return (
    <FormDetailsModal
      title="Điều chuyển thiết bị"
      onClose={onClose}
      onSave={handleConfirm}
      maxWidth="sm"
      saveTitle={loading ? 'Đang xử lý...' : 'Xác nhận gán'}
    >
      <Stack spacing={3} sx={{ mt: 1 }}>
        {selectedIds.length === 1 && initialData && (
          <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <InfoItem label="Tên thiết bị" value={initialData.tenThietBi} />
              </Grid>
              <Grid size={6}>
                <InfoItem label="Mã thiết bị" value={initialData.maThietBi} />
              </Grid>
              <Grid size={6}>
                <InfoItem
                  label="Vị trí hiện tại"
                  value={
                    initialData.phongKtx
                      ? `KTX: ${initialData.phongKtx.maPhong}`
                      : initialData.phongHoc
                        ? `Phòng: ${initialData.phongHoc.tenPhong}`
                        : 'Trong kho'
                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}
        <TextField
          select
          fullWidth
          size="small"
          label="Loại phòng đích"
          value={targetType}
          onChange={(e) => {
            setTargetType(e.target.value as any);
            setSelectedRoom(null);
            setSearchTerm('');
          }}
        >
          <MenuItem value="HOC">Phòng học / Khu hiệu bộ</MenuItem>
          <MenuItem value="KTX">Phòng Ký túc xá (Nội trú)</MenuItem>
        </TextField>
        <Autocomplete
          options={options}
          loading={loadingHoc || loadingKtx}
          getOptionLabel={(option: any) =>
            targetType === 'HOC' ? option.tenPhong : option.maPhong
          }
          onInputChange={(_, val) => setSearchTerm(val)}
          onChange={(_, val) => setSelectedRoom(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label={
                targetType === 'HOC' ? 'Tìm tên phòng học...' : 'Nhập mã phòng KTX (vd: 20...)'
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingHoc || loadingKtx ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option: any) => (
            <li {...props}>
              <Stack direction="row" spacing={1} alignItems="center">
                {targetType === 'HOC' ? (
                  <BusinessIcon fontSize="small" color="disabled" />
                ) : (
                  <HomeWorkIcon fontSize="small" color="disabled" />
                )}
                <Typography variant="body2">
                  {targetType === 'HOC' ? option.tenPhong : option.maPhong}
                </Typography>
              </Stack>
            </li>
          )}
        />
      </Stack>
    </FormDetailsModal>
  );
};
