import { Paper, Box, Typography } from '@mui/material';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const FloorStatsCard = ({ label, value, icon, color }: StatCardProps) => (
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
    }}
  >
    <Box
      sx={{
        p: 1,
        borderRadius: 1.5,
        bgcolor: `${color}15`,
        display: 'flex',
        color: color,
      }}
    >
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
