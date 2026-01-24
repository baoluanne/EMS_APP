import { HomeWork, People, Hotel, CheckCircle } from '@mui/icons-material';

export const floorStatsConfig = [
  {
    label: 'Tổng phòng',
    icon: <HomeWork color="primary" />,
    color: '#1976d2',
    key: 'totalRooms' as const,
  },
  {
    label: 'Tổng SV',
    icon: <People color="secondary" />,
    color: '#9c27b0',
    key: 'occupiedBeds' as const,
  },
  {
    label: 'Tổng giường',
    icon: <Hotel color="info" />,
    color: '#0288d1',
    key: 'totalBeds' as const,
  },
  {
    label: 'Trống',
    icon: <CheckCircle color="success" />,
    color: '#2e7d32',
    key: 'availableBeds' as const,
  },
];
