import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Paper,
} from '@mui/material';
import { Business, ExpandLess, ExpandMore, Layers } from '@mui/icons-material';

interface Props {
  toaNhaData: any[];
  tangData: any[];
  expandedToa: string | null;
  selectedTangId: string | null;
  onExpandToa: (id: string | null) => void;
  onSelectTang: (tang: any) => void;
}

export const KtxSidebar = ({
  toaNhaData,
  tangData,
  expandedToa,
  selectedTangId,
  onExpandToa,
  onSelectTang,
}: Props) => (
  <Paper
    elevation={0}
    sx={{
      width: 280,
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <Box sx={{ p: 2, bgcolor: '#f1f5f9' }}>
      <Typography variant="overline" fontWeight={800} color="text.secondary">
        SƠ ĐỒ KÝ TÚC XÁ
      </Typography>
    </Box>
    <Divider />
    <List dense sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
      {toaNhaData?.map((toa) => (
        <Box key={toa.id}>
          <ListItemButton
            onClick={() => onExpandToa(expandedToa === toa.id ? null : toa.id)}
            sx={{ borderRadius: 1.5, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Business fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={toa.tenToaNha}
              primaryTypographyProps={{ variant: 'body2', fontWeight: 700 }}
            />
            {expandedToa === toa.id ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </ListItemButton>
          <Collapse in={expandedToa === toa.id} timeout="auto" unmountOnExit>
            <List dense disablePadding sx={{ pl: 3 }}>
              {tangData?.map((tang) => (
                <ListItemButton
                  key={tang.id}
                  selected={selectedTangId === tang.id}
                  onClick={() => onSelectTang(tang)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.2,
                    '&.Mui-selected': { bgcolor: 'primary.light', color: 'primary.main' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <Layers sx={{ fontSize: 16 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={tang.tenTang}
                    primaryTypographyProps={{ variant: 'caption', fontWeight: 600 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  </Paper>
);
