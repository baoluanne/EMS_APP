import { memo, useState, useMemo, useCallback } from 'react';
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
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Business,
  ExpandLess,
  ExpandMore,
  Layers,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

interface KtxSidebarProps {
  toaNhaData: any[];
  tangData: any[];
  expandedToa: string | null;
  selectedTangId: string | null;
  onExpandToa: (id: string | null) => void;
  onSelectTang: (tang: any) => void;
}

const ToaNhaItem = memo(
  ({ toa, isExpanded, onExpand, tangData, selectedTangId, onSelectTang }: any) => {
    const tangsOfToa = useMemo(
      () => tangData?.filter((t: any) => t.toaNhaId === toa.id) || [],
      [tangData, toa.id],
    );

    return (
      <Box>
        <ListItemButton
          onClick={onExpand}
          sx={{ borderRadius: 1.5, mb: 0.5, '&:hover': { bgcolor: '#e3f2fd' } }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Business fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={toa.tenToaNha}
            primaryTypographyProps={{ variant: 'body2', fontWeight: 700 }}
          />
          {isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItemButton>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List dense disablePadding sx={{ pl: 3 }}>
            {tangsOfToa.map((tang: any) => (
              <ListItemButton
                key={tang.id}
                selected={selectedTangId === tang.id}
                onClick={() => onSelectTang(tang)}
                sx={{
                  borderRadius: 1,
                  mb: 0.2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                  '&:hover': { bgcolor: '#f5f5f5' },
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
    );
  },
);

ToaNhaItem.displayName = 'ToaNhaItem';

export const KtxSidebar = memo(
  ({
    toaNhaData,
    tangData,
    expandedToa,
    selectedTangId,
    onExpandToa,
    onSelectTang,
  }: KtxSidebarProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = useCallback(() => {
      setSidebarCollapsed((prev) => !prev);
    }, []);

    return (
      <Paper
        elevation={0}
        sx={{
          width: sidebarCollapsed ? 64 : 200,
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{ p: 1.5, bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', minHeight: 60 }}
        >
          <IconButton
            size="small"
            onClick={toggleSidebar}
            sx={{ sm: 'auto', color: 'primary.main' }}
          >
            {sidebarCollapsed ? (
              <MenuIcon fontSize="small" />
            ) : (
              <ChevronLeftIcon fontSize="small" />
            )}
          </IconButton>
          {!sidebarCollapsed && (
            <Typography variant="overline" fontWeight={800} color="text.secondary" noWrap>
              SƠ ĐỒ KTX
            </Typography>
          )}
        </Box>

        <Divider />

        <List dense sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
          {toaNhaData?.map((toa) =>
            sidebarCollapsed ? (
              <Tooltip key={toa.id} title={toa.tenToaNha} placement="right">
                <ListItemButton
                  onClick={() => {
                    onExpandToa(toa.id);
                    setSidebarCollapsed(false);
                  }}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 1.5,
                    mb: 0.5,
                    p: 0,
                    justifyContent: 'center',
                  }}
                >
                  <Business
                    fontSize="small"
                    color={expandedToa === toa.id ? 'primary' : 'inherit'}
                  />
                </ListItemButton>
              </Tooltip>
            ) : (
              <ToaNhaItem
                key={toa.id}
                toa={toa}
                isExpanded={expandedToa === toa.id}
                onExpand={() => onExpandToa(expandedToa === toa.id ? null : toa.id)}
                tangData={tangData}
                selectedTangId={selectedTangId}
                onSelectTang={onSelectTang}
              />
            ),
          )}
        </List>
      </Paper>
    );
  },
);

KtxSidebar.displayName = 'KtxSidebar';
