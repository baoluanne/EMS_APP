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
    if (!selectedRoom) {
      toast.error('Vui lòng chọn phòng đích.');
      return;
    }

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

  return (
    <FormDetailsModal
      title="Điều chuyển thiết bị"
      onClose={onClose}
      onSave={handleConfirm}
      maxWidth="sm"
      saveTitle={loading ? 'Đang xử lý...' : 'Xác nhận gán'}
      isRefetching={loading}
    >
      <Stack spacing={3} sx={{ mt: 1 }}>
        {selectedIds.length === 1 && initialData && <DeviceInfoCard data={initialData} />}

        <RoomTypeSelector
          value={targetType}
          onChange={(type) => {
            setTargetType(type);
            setSelectedRoom(null);
            setSearchTerm('');
          }}
        />

        <RoomSearchAutocomplete
          targetType={targetType}
          options={options}
          loading={loadingHoc || loadingKtx}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRoomSelect={setSelectedRoom}
        />
      </Stack>
    </FormDetailsModal>
  );
};

// ============================================================================
// Sub-components
// ============================================================================

interface DeviceInfoCardProps {
  data: any;
}

function DeviceInfoCard({ data }: DeviceInfoCardProps) {
  const currentLocation = data.phongKtx
    ? `KTX: ${data.phongKtx.maPhong}`
    : data.phongHoc
      ? `Phòng: ${data.phongHoc.tenPhong}`
      : 'Trong kho';

  return (
    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <InfoItem label="Tên thiết bị" value={data.tenThietBi} />
        </Grid>
        <Grid size={6}>
          <InfoItem label="Mã thiết bị" value={data.maThietBi} />
        </Grid>
        <Grid size={6}>
          <InfoItem label="Vị trí hiện tại" value={currentLocation} />
        </Grid>
      </Grid>
    </Box>
  );
}

interface InfoItemProps {
  label: string;
  value: string | number;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
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
}

interface RoomTypeSelectorProps {
  value: 'HOC' | 'KTX';
  onChange: (type: 'HOC' | 'KTX') => void;
}

function RoomTypeSelector({ value, onChange }: RoomTypeSelectorProps) {
  return (
    <TextField
      select
      fullWidth
      size="small"
      label="Loại phòng đích"
      value={value}
      onChange={(e) => onChange(e.target.value as 'HOC' | 'KTX')}
    >
      <MenuItem value="HOC">Phòng học / Khu hiệu bộ</MenuItem>
      <MenuItem value="KTX">Phòng Ký túc xá (Nội trú)</MenuItem>
    </TextField>
  );
}

interface RoomSearchAutocompleteProps {
  targetType: 'HOC' | 'KTX';
  options: any[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRoomSelect: (room: any) => void;
}

function RoomSearchAutocomplete({
  targetType,
  options,
  loading,
  onSearchChange,
  onRoomSelect,
}: RoomSearchAutocompleteProps) {
  const getOptionLabel = (option: any) => {
    return targetType === 'HOC' ? option.tenPhong : option.maPhong;
  };

  const getPlaceholder = () => {
    return targetType === 'HOC' ? 'Tìm tên phòng học...' : 'Nhập mã phòng KTX (vd: 20...)';
  };

  return (
    <Autocomplete
      options={options}
      loading={loading}
      getOptionLabel={getOptionLabel}
      onInputChange={(_, val) => onSearchChange(val)}
      onChange={(_, val) => onRoomSelect(val)}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={getPlaceholder()}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
            <Typography variant="body2">{getOptionLabel(option)}</Typography>
          </Stack>
        </li>
      )}
    />
  );
}
