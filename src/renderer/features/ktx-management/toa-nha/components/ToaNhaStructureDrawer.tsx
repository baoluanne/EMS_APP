import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Stack,
  MenuItem,
  TextField,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LayersIcon from '@mui/icons-material/Layers';
import { DataGridTable } from '@renderer/components/Table';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { GridColDef } from '@mui/x-data-grid';

interface Props {
  buildingId: string;
  buildingName: string;
  onClose: () => void;
}

export const ToaNhaStructureSidebar = ({ buildingId, buildingName, onClose }: Props) => {
  const navigate = useNavigate();
  const [tangId, setTangId] = useState('');

  useEffect(() => {
    console.log('>>> [Sidebar] Opened with Building:', { buildingId, buildingName });
  }, [buildingId, buildingName]);

  const { data: tangsData, isRefetching: isTangsLoading } = useCrudPagination<any>({
    entity: 'Tang',
    endpoint: `pagination?ToaNhaId=${buildingId}`,
    defaultState: { pageSize: 100 },
  });

  useEffect(() => {
    if (tangsData) {
      console.log('>>> [Data] Floors (Tangs) Loaded:', (tangsData as any)?.result);
    }
  }, [tangsData]);

  const {
    data: phongsData,
    isRefetching: isPhongsLoading,
    generateTableConfig: genPhongsTableConfig,
  } = useCrudPagination<any>({
    entity: 'PhongKtx',
    endpoint: `pagination?TangKtxId=${tangId}`,
    enabled: !!tangId,
    defaultState: { pageSize: 50 },
  });

  useEffect(() => {
    if (tangId) {
      console.log('>>> [State] Current Floor selected (tangId):', tangId);
    }
  }, [tangId]);

  useEffect(() => {
    if (phongsData) {
      console.log(
        `>>> [Data] Rooms (Phongs) for Tang ${tangId} Loaded:`,
        (phongsData as any)?.result,
      );
    }
  }, [phongsData, tangId]);

  const tangsRows = (tangsData as any)?.result ?? [];
  const phongRows = (phongsData as any)?.result ?? [];

  const handlePhongRowClick = (row: any) => {
    console.log('>>> [Action] Room clicked:', row);
    onClose();
    navigate('/dormitory-management/facilities-management/giuongktx', {
      state: { phongId: row.id, maPhong: row.maPhong },
    });
  };

  const columns: GridColDef[] = [
    { field: 'maPhong', headerName: 'Mã phòng', width: 110 },
    { field: 'loaiPhong', headerName: 'Loại', flex: 1 },
    { field: 'soLuongGiuong', headerName: 'Giường', width: 90, align: 'center' },
  ];

  return (
    <Drawer
      anchor="right"
      open={!!buildingId}
      onClose={() => {
        onClose();
      }}
      PaperProps={{ sx: { width: 500, borderLeft: 'none' } }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Sơ đồ: {buildingName}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ApartmentIcon color="primary" fontSize="small" />
              <Typography variant="subtitle2" fontWeight={700}>
                1. Chọn tầng
              </Typography>
            </Stack>
            <TextField
              select
              fullWidth
              size="small"
              label={isTangsLoading ? 'Đang tải...' : 'Danh sách tầng'}
              value={tangId}
              onChange={(e) => {
                const newId = e.target.value;
                setTangId(newId);
              }}
            >
              {tangsRows.map((tang: any) => (
                <MenuItem key={tang.id} value={tang.id}>
                  {tang.tenTang}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction="row" alignItems="center" spacing={1}>
              <LayersIcon color="primary" fontSize="small" />
              <Typography variant="subtitle2" fontWeight={700}>
                2. Danh sách phòng ({phongRows.length})
              </Typography>
            </Stack>
            <Box p={1}>
              <DataGridTable
                rows={phongRows}
                columns={columns}
                loading={isPhongsLoading}
                getRowId={(row) => row.id}
                hideFooter
                checkboxSelection={false}
                onRowClick={(params) => handlePhongRowClick(params.row)}
                {...genPhongsTableConfig(phongRows.length, isPhongsLoading)}
                height={400}
              />
            </Box>
          </Stack>
        </Box>

        <Divider />
      </Box>
    </Drawer>
  );
};
