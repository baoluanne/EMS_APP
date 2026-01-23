import { Grid, Paper, Box, Typography } from '@mui/material';
import { HomeWork, People, Hotel, CheckCircle } from '@mui/icons-material';

interface Props {
  stats: { totalRooms: number; occupiedBeds: number; totalBeds: number; availableBeds: number };
}

const StatItem = ({ label, value, icon, color }: any) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      bgcolor: '#fff',
      borderRadius: 2,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}15`, display: 'flex', color: color }}>
      {icon}
    </Box>
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={700}
        sx={{ display: 'block', mb: 0.5 }}
      >
        {label.toUpperCase()}
      </Typography>
      <Typography variant="h5" fontWeight={800}>
        {value}
      </Typography>
    </Box>
  </Paper>
);

export const FloorSummary = ({ stats }: Props) => (
  <Grid container spacing={2}>
    <Grid size={3}>
      <StatItem
        label="Tổng số phòng"
        value={stats.totalRooms}
        icon={<HomeWork />}
        color="#1976d2"
      />
    </Grid>
    <Grid size={3}>
      <StatItem label="Đang ở" value={stats.occupiedBeds} icon={<People />} color="#9c27b0" />
    </Grid>
    <Grid size={3}>
      <StatItem label="Tổng giường" value={stats.totalBeds} icon={<Hotel />} color="#0288d1" />
    </Grid>
    <Grid size={3}>
      <StatItem
        label="Giường trống"
        value={stats.availableBeds}
        icon={<CheckCircle />}
        color="#2e7d32"
      />
    </Grid>
  </Grid>
);
