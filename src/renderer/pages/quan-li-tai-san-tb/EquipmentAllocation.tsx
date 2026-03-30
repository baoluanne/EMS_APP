import { useState, useMemo, useEffect } from 'react';
import {
  Stack,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  InputAdornment,
  Pagination,
  Chip,
  IconButton,
  Drawer,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LayersIcon from '@mui/icons-material/Layers';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InventoryIcon from '@mui/icons-material/Inventory';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import TimelineDot from '@mui/icons-material/Circle';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMutation } from '@renderer/shared/mutations';
import { TrangThaiThietBiEnum } from '../../features/equip-management/enums';

export const EquipmentAllocation = () => {
  const [equipSearchTerm, setEquipSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedEquipIds, setSelectedEquipIds] = useState<string[]>([]);

  // State cho khu vực nguồn (Source)
  const [sourceType, setSourceType] = useState<'ALL' | 'HOC' | 'KTX' | 'KHO'>('ALL');
  const [sourceBuilding, setSourceBuilding] = useState<any>(null);
  const [sourceFloor, setSourceFloor] = useState<any>(null);
  const [sourceRoom, setSourceRoom] = useState<any>(null);

  // State cho khu vực đích (Target)
  const [targetType, setTargetType] = useState<'HOC' | 'KTX'>('HOC');
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // State quản lý Sidebar Lịch sử
  const [historyEquip, setHistoryEquip] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(equipSearchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [equipSearchTerm]);

  useEffect(() => {
    setSourceBuilding(null);
    setSourceFloor(null);
    setSourceRoom(null);
    setPage(1);
  }, [sourceType]);

  useEffect(() => {
    setSourceFloor(null);
    setSourceRoom(null);
    setPage(1);
  }, [sourceBuilding]);

  useEffect(() => {
    setSourceRoom(null);
    setPage(1);
  }, [sourceFloor]);

  useEffect(() => {
    setPage(1);
  }, [sourceRoom]);

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

  // Fetch danh sách lọc nguồn
  const { data: sourceBuildingsData, isRefetching: loadingSrcBuildings } = useCrudPagination<any>({
    entity: sourceType === 'HOC' ? 'DayNha' : 'ToaNhaKtx',
    endpoint: `pagination`,
    enabled: sourceType === 'HOC' || sourceType === 'KTX',
  });

  const { data: sourceFloorsData, isRefetching: loadingSrcFloors } = useCrudPagination<any>({
    entity: sourceType === 'HOC' ? 'TangHoc' : 'Tang',
    endpoint:
      sourceType === 'HOC'
        ? `pagination?IdDayNha=${sourceBuilding?.id || ''}`
        : `pagination?ToaNhaId=${sourceBuilding?.id || ''}`,
    enabled: !!sourceBuilding?.id,
  });

  const { data: sourceRoomsData, isRefetching: loadingSrcRooms } = useCrudPagination<any>({
    entity: sourceType === 'HOC' ? 'PhongHoc' : 'PhongKtx',
    endpoint:
      sourceType === 'HOC'
        ? `pagination?IdTang=${sourceFloor?.id || ''}`
        : `pagination?TangId=${sourceFloor?.id || ''}`,
    enabled: !!sourceFloor?.id,
  });

  // Fetch Danh sách thiết bị
  const {
    data: equipData,
    isRefetching: loadingEquips,
    refetch: refetchEquips,
  } = useCrudPagination<any>({
    entity: 'ThietBi',
    endpoint: 'pagination',
    extraParams: {
      TenThietBi: debouncedSearch,
      page: page - 1,
      pageSize: 10,
      phongHocId: sourceType === 'HOC' && sourceRoom ? sourceRoom.id : undefined,
      phongKtxId: sourceType === 'KTX' && sourceRoom ? sourceRoom.id : undefined,
      isUnassigned: sourceType === 'KHO' ? true : undefined,
    },
    enabled: true,
  });

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

  const allEquipments = useMemo(() => equipData?.result || [], [equipData]);

  // Fallback filtering in case Backend doesn't support specific location filters via API
  const equipments = useMemo(() => {
    // 1. Loại bỏ thiết bị đang cho mượn, đã thanh lý hoặc bị mất
    const excludeStatuses = [
      TrangThaiThietBiEnum.ThanhLy,
      TrangThaiThietBiEnum.Mat,
    ];
    let filtered = allEquipments.filter((e: any) => !excludeStatuses.includes(e.trangThai));

    // 2. Lọc theo vị trí nguồn
    if (sourceType === 'KHO') {
      filtered = filtered.filter((e: any) => !e.phongHocId && !e.phongKtxId);
    } else if (sourceType === 'HOC' && sourceRoom) {
      filtered = filtered.filter((e: any) => e.phongHocId === sourceRoom.id);
    } else if (sourceType === 'KTX' && sourceRoom) {
      filtered = filtered.filter((e: any) => e.phongKtxId === sourceRoom.id);
    }

    return filtered;
  }, [allEquipments, sourceType, sourceRoom]);

  const totalPages = useMemo(() => equipData?.totalPages || 1, [equipData]);

  const buildings = useMemo(() => buildingsData?.result || [], [buildingsData]);
  const floors = useMemo(() => floorsData?.result || [], [floorsData]);
  const rooms = useMemo(() => roomsData?.result || [], [roomsData]);

  const sourceBuildings = useMemo(() => sourceBuildingsData?.result || [], [sourceBuildingsData]);
  const sourceFloors = useMemo(() => sourceFloorsData?.result || [], [sourceFloorsData]);
  const sourceRooms = useMemo(() => sourceRoomsData?.result || [], [sourceRoomsData]);

  const { mutateAsync: assignRoomAsync, isPending: isAssigning } = useMutation<any>(
    `ThietBi/phan-vao-phong/${selectedRoom?.id}?isKtx=${targetType === 'KTX'}`,
  );

  const handleToggleEquip = (id: string) => {
    setSelectedEquipIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (selectedEquipIds.length === equipments.length && equipments.length > 0) {
      setSelectedEquipIds([]);
    } else {
      setSelectedEquipIds(equipments.map((e: any) => e.id));
    }
  };

  const handleConfirm = async () => {
    if (selectedEquipIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất một thiết bị.');
      return;
    }
    if (!selectedRoom) {
      toast.error('Vui lòng chọn phòng đích đến.');
      return;
    }

    try {
      await assignRoomAsync(selectedEquipIds);
      toast.success('Điều chuyển thành công!');
      setSelectedEquipIds([]);
      setSelectedRoom(null);
      refetchEquips();
    } catch (error: any) {
      toast.error(error?.message || 'Lỗi hệ thống.');
    }
  };

  const renderLocationChip = (equip: any) => {
    if (equip.phongKtx) {
      return (
        <Chip
          icon={<HomeWorkIcon />}
          label={`KTX: ${equip.phongKtx.maPhong}`}
          size="small"
          color="warning"
          variant="outlined"
        />
      );
    }
    if (equip.phongHoc) {
      return (
        <Chip
          icon={<BusinessIcon />}
          label={`Phòng: ${equip.phongHoc.tenPhong}`}
          size="small"
          color="info"
          variant="outlined"
        />
      );
    }
    return <Chip icon={<InventoryIcon />} label="Trong kho" size="small" color="default" />;
  };

  return (
    <Box sx={{ p: 2, height: '100%' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* CỘT TRÁI: TÌM KIẾM THIẾT BỊ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid #e2e8f0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader
              title="1. Chọn thiết bị"
              titleTypographyProps={{ variant: 'subtitle1', fontWeight: 600 }}
              action={
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Đã chọn:{' '}
                  <Box component="span" fontWeight={700} color="primary.main">
                    {selectedEquipIds.length}
                  </Box>
                </Typography>
              }
            />
            <Divider />
            <Box sx={{ p: 2, bgcolor: '#f8fafc' }}>
              <Stack spacing={1.5}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Lọc nhanh nguồn"
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value as any)}
                >
                  <MenuItem value="ALL">Tất cả thiết bị</MenuItem>
                  <MenuItem value="KHO">Chưa phân bổ (Trong kho)</MenuItem>
                  <MenuItem value="HOC">Phòng học / Khu hiệu bộ</MenuItem>
                  <MenuItem value="KTX">Ký túc xá (Nội trú)</MenuItem>
                </TextField>

                {(sourceType === 'HOC' || sourceType === 'KTX') && (
                  <Stack direction="row" spacing={1}>
                    <Autocomplete
                      fullWidth
                      options={sourceBuildings}
                      loading={loadingSrcBuildings}
                      getOptionLabel={(o: any) => (sourceType === 'HOC' ? o.tenDayNha : o.tenToaNha)}
                      value={sourceBuilding}
                      onChange={(_, v) => setSourceBuilding(v)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label={sourceType === 'HOC' ? 'Dãy' : 'Tòa'}
                        />
                      )}
                    />
                    <Autocomplete
                      fullWidth
                      options={sourceFloors}
                      loading={loadingSrcFloors}
                      disabled={!sourceBuilding}
                      getOptionLabel={(o: any) => o.tenTang}
                      value={sourceFloor}
                      onChange={(_, v) => setSourceFloor(v)}
                      renderInput={(params) => (
                        <TextField {...params} size="small" label="Tầng" />
                      )}
                    />
                    <Autocomplete
                      fullWidth
                      options={sourceRooms}
                      loading={loadingSrcRooms}
                      disabled={!sourceFloor}
                      getOptionLabel={(o: any) => (sourceType === 'HOC' ? o.tenPhong : o.maPhong)}
                      value={sourceRoom}
                      onChange={(_, v) => setSourceRoom(v)}
                      renderInput={(params) => (
                        <TextField {...params} size="small" label="Phòng" />
                      )}
                    />
                  </Stack>
                )}

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Hoặc nhập tên/mã thiết bị để tìm..."
                  value={equipSearchTerm}
                  onChange={(e) => setEquipSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Box>
            <Divider />

            {/* VÙNG HIỂN THỊ DANH SÁCH */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              {loadingEquips ? (
                <Box sx={{ m: 'auto', p: 4 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : equipments.length === 0 ? (
                <Box sx={{ m: 'auto', textAlign: 'center', p: 4, opacity: 0.6 }}>
                  <InventoryIcon sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="body2">Không tìm thấy thiết bị nào phù hợp</Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  <ListItem disablePadding divider sx={{ bgcolor: '#f8fafc' }}>
                    <ListItemButton onClick={handleToggleAll}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={
                            equipments.length > 0 && selectedEquipIds.length === equipments.length
                          }
                          indeterminate={
                            selectedEquipIds.length > 0 &&
                            selectedEquipIds.length < equipments.length
                          }
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={600}>
                            Chọn tất cả trang này
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>

                  {equipments.map((equip: any) => {
                    const isSelected = selectedEquipIds.includes(equip.id);
                    return (
                      <ListItem
                        key={equip.id}
                        disablePadding
                        divider
                        secondaryAction={
                          <IconButton
                            edge="end"
                            size="small"
                            color="primary"
                            onClick={() => setHistoryEquip(equip)}
                            title="Xem lịch sử luân chuyển"
                            sx={{ bgcolor: '#eff6ff', '&:hover': { bgcolor: '#dbeafe' } }}
                          >
                            <HistoryIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemButton onClick={() => handleToggleEquip(equip.id)} sx={{ pr: 6 }}>
                          <ListItemIcon>
                            <Checkbox edge="start" checked={isSelected} disableRipple />
                          </ListItemIcon>
                          <ListItemText
                            primary={equip.tenThietBi}
                            secondary={`Mã: ${equip.maThietBi}`}
                            primaryTypographyProps={{
                              variant: 'body2',
                              fontWeight: isSelected ? 600 : 400,
                            }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                          <Box sx={{ ml: 2 }}>{renderLocationChip(equip)}</Box>
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Box>

            {/* PHÂN TRANG */}
            {totalPages > 1 && (
              <Box
                sx={{
                  p: 1.5,
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'center',
                  bgcolor: '#f8fafc',
                }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, p) => setPage(p)}
                  color="primary"
                  size="small"
                />
              </Box>
            )}
          </Card>
        </Grid>

        {/* CỘT PHẢI: CHỌN ĐÍCH ĐẾN */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', height: '100%' }}>
            <CardHeader
              title="2. Chọn vị trí đích đến"
              titleTypographyProps={{ variant: 'subtitle1', fontWeight: 600 }}
            />
            <Divider />
            <CardContent>
              <Stack spacing={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Khu vực"
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value as 'HOC' | 'KTX')}
                >
                  <MenuItem value="HOC">Phòng học / Khu hiệu bộ</MenuItem>
                  <MenuItem value="KTX">Phòng Ký túc xá (Nội trú)</MenuItem>
                </TextField>

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
                      label={targetType === 'HOC' ? 'Dãy Nhà' : 'Tòa Nhà KTX'}
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
                      label="Tầng"
                      placeholder={
                        !selectedBuilding ? 'Vui lòng chọn Tòa nhà trước' : 'Chọn tầng...'
                      }
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
                      label="Phòng"
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

                <Box sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<SwapHorizIcon />}
                    onClick={handleConfirm}
                    disabled={selectedEquipIds.length === 0 || !selectedRoom || isAssigning}
                  >
                    {isAssigning ? 'Đang xử lý...' : 'Xác nhận điều chuyển'}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TÍCH HỢP DRAWER LỊCH SỬ VÀO ĐÂY */}
      <EquipmentHistoryDrawer
        equip={historyEquip}
        open={Boolean(historyEquip)}
        onClose={() => setHistoryEquip(null)}
      />
    </Box>
  );
};

// ==========================================================
// COMPONENT SIDEBAR (DRAWER) LỊCH SỬ THIẾT BỊ
// ==========================================================

interface EquipmentHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  equip: any;
}

function EquipmentHistoryDrawer({ open, onClose, equip }: EquipmentHistoryDrawerProps) {
  // Lấy dữ liệu lịch sử từ API (Sử dụng bảng TSTBLichSuThietBi)
  const { data: historyData, isRefetching } = useCrudPagination<any>({
    entity: 'LichSuThietBi',
    endpoint: `pagination?ThietBiId=${equip?.id}&orderBy=NgayTao&isDescending=true`,
    enabled: !!equip?.id,
  });

  const histories = useMemo(() => historyData?.result || [], [historyData]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Lịch sử luân chuyển
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {equip?.maThietBi} - {equip?.tenThietBi}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ p: 2, overflowY: 'auto' }}>
        {isRefetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={30} />
          </Box>
        ) : histories.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 4, color: 'text.secondary' }}>
            <HistoryIcon sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
            <Typography variant="body2">Chưa có lịch sử luân chuyển nào.</Typography>
          </Box>
        ) : (
          <Stack spacing={2} sx={{ position: 'relative', ml: 1 }}>
            {/* Tạo đường kẻ dọc giả lập Timeline */}
            <Box
              sx={{
                position: 'absolute',
                left: 5,
                top: 10,
                bottom: 0,
                width: 2,
                bgcolor: '#e2e8f0',
                zIndex: 0,
              }}
            />

            {histories.map((history: any, index: number) => (
              <Box
                key={history.id || index}
                sx={{ display: 'flex', gap: 2, position: 'relative', zIndex: 1 }}
              >
                <Box sx={{ mt: 0.5, bgcolor: 'white' }}>
                  <TimelineDot
                    sx={{ fontSize: 12, color: index === 0 ? 'primary.main' : 'text.disabled' }}
                  />
                </Box>
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                    flex: 1,
                    bgcolor: index === 0 ? '#f8fafc' : 'white',
                  }}
                >
                  <CardContent sx={{ p: '12px !important' }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                      display="block"
                      gutterBottom
                    >
                      {history.ngayTao
                        ? format(new Date(history.ngayTao), 'HH:mm - dd/MM/yyyy')
                        : 'N/A'}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      {history.noiDung}
                    </Typography>
                    {(history.tuViTri || history.denViTri) && (
                      <Box sx={{ mt: 1, p: 1, bgcolor: '#f1f5f9', borderRadius: 1 }}>
                        {history.tuViTri && (
                          <Typography variant="caption" display="block" color="text.secondary">
                            <strong>Từ:</strong> {history.tuViTri}
                          </Typography>
                        )}
                        {history.denViTri && (
                          <Typography variant="caption" display="block" color="text.secondary">
                            <strong>Đến:</strong> {history.denViTri}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
