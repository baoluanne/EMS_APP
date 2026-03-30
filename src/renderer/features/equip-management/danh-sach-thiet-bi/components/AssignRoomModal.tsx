import { useState, useMemo, useEffect } from 'react';
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
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LayersIcon from '@mui/icons-material/Layers';
import { toast } from 'react-toastify';
import { FormDetailsModal } from '@renderer/components/modals';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMutation } from '@renderer/shared/mutations';

interface Props {
  onClose: () => void;
  selectedIds: string[];
  onSuccess: () => void;
  initialData?: any;
}

export const AssignRoomModal = ({ onClose, selectedIds, onSuccess, initialData }: Props) => {
  const [targetType, setTargetType] = useState<'HOC' | 'KTX'>('HOC');
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    setSelectedBuilding(null);
    setSelectedFloor(null);
    setSelectedRoom(null);
  }, [targetType]);

  useEffect(() => {
    setSelectedFloor(null);
    setSelectedRoom(null);
  }, [selectedBuilding]);

  useEffect(() => {
    setSelectedRoom(null);
  }, [selectedFloor]);

  const { data: buildingsData, isRefetching: loadingBuildings } = useCrudPagination<any>({
    entity: targetType === 'HOC' ? 'DayNha' : 'ToaNhaKtx',
    endpoint: `pagination`,
  });

  const floorEndpoint =
    targetType === 'HOC'
      ? `pagination?IdDayNha=${selectedBuilding?.id || ''}`
      : `pagination?ToaNhaId=${selectedBuilding?.id || ''}`;

  const { data: floorsData, isRefetching: loadingFloors } = useCrudPagination<any>({
    entity: targetType === 'HOC' ? 'TangHoc' : 'Tang',
    endpoint: floorEndpoint,
    enabled: !!selectedBuilding?.id,
  });

  const roomEndpoint =
    targetType === 'HOC'
      ? `pagination?IdTang=${selectedFloor?.id || ''}`
      : `pagination?TangId=${selectedFloor?.id || ''}`;

  const { data: roomsData, isRefetching: loadingRooms } = useCrudPagination<any>({
    entity: targetType === 'HOC' ? 'PhongHoc' : 'PhongKtx',
    endpoint: roomEndpoint,
    enabled: !!selectedFloor?.id,
  });

  const buildings = useMemo(() => buildingsData?.result || [], [buildingsData]);
  const floors = useMemo(() => floorsData?.result || [], [floorsData]);
  const rooms = useMemo(() => roomsData?.result || [], [roomsData]);

  const { mutateAsync: assignRoomAsync } = useMutation<any>(
    `ThietBi/phan-vao-phong/${selectedRoom?.id}?isKtx=${targetType === 'KTX'}`,
  );

  const handleConfirm = async () => {
    if (!selectedRoom) {
      toast.error('Vui lòng chọn phòng đích đến cấp cuối cùng.');
      return;
    }

    try {
      await assignRoomAsync(selectedIds);
      toast.success('Điều chuyển thành công!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Lỗi hệ thống.');
    }
  };

  return (
    <FormDetailsModal
      title="Điều chuyển thiết bị"
      onClose={onClose}
      onSave={handleConfirm}
      maxWidth="sm"
      saveTitle="Xác nhận gán"
    >
      <Stack spacing={3} sx={{ mt: 1 }}>
        {selectedIds.length === 1 && initialData && <DeviceInfoCard data={initialData} />}

        <RoomTypeSelector value={targetType} onChange={setTargetType} />

        <Autocomplete
          options={buildings}
          loading={loadingBuildings}
          getOptionLabel={(option: any) =>
            targetType === 'HOC' ? option.tenDayNha : option.tenToaNha
          }
          value={selectedBuilding}
          onChange={(_, val) => setSelectedBuilding(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label={targetType === 'HOC' ? '1. Chọn Dãy Nhà' : '1. Chọn Tòa Nhà KTX'}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingBuildings && <CircularProgress color="inherit" size={20} />}
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
                  {targetType === 'HOC' ? option.tenDayNha : option.tenToaNha}
                </Typography>
              </Stack>
            </li>
          )}
        />

        <Autocomplete
          options={floors}
          loading={loadingFloors}
          disabled={!selectedBuilding}
          getOptionLabel={(option: any) => option.tenTang}
          value={selectedFloor}
          onChange={(_, val) => setSelectedFloor(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="2. Chọn Tầng"
              placeholder={!selectedBuilding ? 'Vui lòng chọn Tòa nhà trước' : 'Chọn tầng...'}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingFloors && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option: any) => (
            <li {...props}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LayersIcon fontSize="small" color="disabled" />
                <Typography variant="body2">{option.tenTang}</Typography>
              </Stack>
            </li>
          )}
        />

        <Autocomplete
          options={rooms}
          loading={loadingRooms}
          disabled={!selectedFloor}
          getOptionLabel={(option: any) =>
            targetType === 'HOC' ? option.tenPhong : option.maPhong
          }
          value={selectedRoom}
          onChange={(_, val) => setSelectedRoom(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="3. Chọn Phòng"
              placeholder={!selectedFloor ? 'Vui lòng chọn Tầng trước' : 'Chọn phòng...'}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingRooms && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option: any) => (
            <li {...props}>
              <Stack direction="row" spacing={1} alignItems="center">
                <MeetingRoomIcon fontSize="small" color="disabled" />
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
      label="Khu vực đích đến"
      value={value}
      onChange={(e) => onChange(e.target.value as 'HOC' | 'KTX')}
    >
      <MenuItem value="HOC">Phòng học / Khu hiệu bộ</MenuItem>
      <MenuItem value="KTX">Phòng Ký túc xá (Nội trú)</MenuItem>
    </TextField>
  );
}
