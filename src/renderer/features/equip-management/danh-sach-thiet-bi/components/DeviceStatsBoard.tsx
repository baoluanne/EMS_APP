import { Paper, Box, Typography, Grid, CircularProgress } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CategoryIcon from '@mui/icons-material/Category';
import { useMemo } from 'react';
import { DanhSachThietBi } from '../validation';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ label, value, icon, color }: StatCardProps) => (
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
      height: '100%',
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

export const DeviceStatsBoard = ({
  data,
  loading,
}: {
  data: DanhSachThietBi[];
  loading?: boolean;
}) => {
  const stats = useMemo(() => {
    const total = data.length;

    const uniqueTypes = new Set(data.map((item) => item.loaiThietBiId)).size;

    const distributed = data.filter((item: any) => item.phongHocId || item.phongKtxId).length;

    const inStock = total - distributed;

    return { total, distributed, inStock, types: uniqueTypes };
  }, [data]);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          label="Tổng số thiết bị"
          value={stats.total}
          icon={<InventoryIcon />}
          color="#1976d2"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          label="Loại thiết bị"
          value={stats.types}
          icon={<CategoryIcon />}
          color="#9c27b0"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          label="Đã phân bổ"
          value={stats.distributed}
          icon={<AssignmentTurnedInIcon />}
          color="#2e7d32"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          label="Trong kho"
          value={stats.inStock}
          icon={<WarehouseIcon />}
          color="#ed6c02"
        />
      </Grid>
    </Grid>
  );
};
