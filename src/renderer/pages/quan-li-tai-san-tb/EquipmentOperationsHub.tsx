import { useState, SyntheticEvent } from 'react';
import { Box, Tabs, Tab, Typography, Card, Divider } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import { EquipmentAllocation } from './EquipmentAllocation';
import PhieuMuonTraPage from './muon-tra-thiet-bi';
import PhieuThanhLyPage from './phieu-thanh-li';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`operations-tabpanel-${index}`}
      aria-labelledby={`operations-tab-${index}`}
      sx={{
        height: 'calc(100% - 48px)', // Trừ đi chiều cao của thanh Tabs
        flexGrow: 1,
        overflow: 'hidden',
      }}
      {...other}
    >
      {value === index && <Box sx={{ height: '100%', p: 0 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `operations-tab-${index}`,
    'aria-controls': `operations-tabpanel-${index}`,
  };
}

export const EquipmentOperationsHub = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700} color="primary.main">
          Nghiệp Vụ Vận Hành Thiết Bị
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quản lý luân chuyển, mượn trả và thanh lý tài sản tập trung
        </Typography>
      </Box>

      <Card
        elevation={2}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="equipment operations tabs"
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                transition: 'all 0.2s',
              },
              '& .Mui-selected': {
                bgcolor: '#eff6ff',
              },
            }}
          >
            <Tab
              icon={<SwapHorizIcon />}
              iconPosition="start"
              label="Điều chuyển & Phân bổ"
              {...a11yProps(0)}
            />
            <Tab
              icon={<AssignmentIcon />}
              iconPosition="start"
              label="Phiếu Mượn / Trả"
              {...a11yProps(1)}
            />
            <Tab
              icon={<DeleteSweepIcon />}
              iconPosition="start"
              label="Phiếu Thanh lý"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <Divider />

        <CustomTabPanel value={value} index={0}>
          <EquipmentAllocation />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <PhieuMuonTraPage />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <PhieuThanhLyPage />
        </CustomTabPanel>
      </Card>
    </Box>
  );
};

export default EquipmentOperationsHub;
