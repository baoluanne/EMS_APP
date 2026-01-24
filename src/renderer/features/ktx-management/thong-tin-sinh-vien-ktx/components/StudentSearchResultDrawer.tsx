import {
  Box,
  Drawer,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Paper,
} from '@mui/material';
import { Close, Person, History, Badge, HomeWork } from '@mui/icons-material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { ThongTinSvKtxFilterState } from '../type';
import { useMemo } from 'react';

interface Props {
  open: boolean;
  filters: ThongTinSvKtxFilterState;
  onClose: () => void;
  onStudentClick: (student: any) => void;
}

export const StudentSearchResultDrawer = ({ open, filters, onClose, onStudentClick }: Props) => {
  // Check if any filter is actually filled
  const hasFilter = useMemo(() => {
    const hasMaSinhVien = (filters.maSinhVien?.trim() || '') !== '';
    const hasHoTen = (filters.hoTen?.trim() || '') !== '';
    const hasMaPhong = (filters.maPhong?.trim() || '') !== '';
    const hasMaGiuong = (filters.maGiuong?.trim() || '') !== '';
    const hasTrangThai =
      filters.trangThai !== undefined && filters.trangThai !== '' && filters.trangThai !== null;

    return hasMaSinhVien || hasHoTen || hasMaPhong || hasMaGiuong || hasTrangThai;
  }, [filters]);

  // Build query params - MUST use Keyword, not MaPhong
  const buildQueryString = useMemo(() => {
    const params = new URLSearchParams();

    // Collect all search keywords
    const keywords: string[] = [];
    if (filters.maSinhVien?.trim()) keywords.push(filters.maSinhVien.trim());
    if (filters.hoTen?.trim()) keywords.push(filters.hoTen.trim());
    if (filters.maPhong?.trim()) keywords.push(filters.maPhong.trim());
    if (filters.maGiuong?.trim()) keywords.push(filters.maGiuong.trim());

    // Add Keyword parameter (backend searches in all fields)
    if (keywords.length > 0) {
      params.append('Keyword', keywords.join(' '));
    }

    // Add status filter if selected
    if (filters.trangThai !== undefined && filters.trangThai !== '') {
      params.append('TrangThai', filters.trangThai.toString());
    }

    params.append('pageSize', '50');

    return params.toString();
  }, [filters]);

  const { data, isRefetching } = useCrudPagination<any>({
    entity: 'CuTruKtx',
    endpoint: `pagination?${buildQueryString}`,
    enabled: open && hasFilter,
  });

  const results = (data as any)?.result || [];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 450, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#f8fafc',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Person color="primary" />
            <Typography variant="subtitle1" fontWeight={800}>
              Kết quả tìm kiếm ({results.length})
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Divider />

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f1f5f9' }}>
          {isRefetching ? (
            <Typography variant="body2" color="text.secondary" align="center" mt={4}>
              Đang tìm kiếm...
            </Typography>
          ) : results.length > 0 ? (
            <Stack spacing={1.5}>
              {results.map((item: any) => (
                <Paper key={item.id} variant="outlined" sx={{ borderRadius: 2 }}>
                  <ListItemButton onClick={() => onStudentClick(item)} sx={{ p: 1.5 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                        {item.sinhVien?.ten?.charAt(0) || '?'}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={800}>
                          {item.sinhVien?.fullName}
                        </Typography>
                      }
                      secondary={
                        <Stack spacing={0.2} mt={0.5}>
                          <Typography
                            variant="caption"
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                          >
                            <Badge sx={{ fontSize: 14 }} /> MSSV: {item.sinhVien?.maSinhVien}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                          >
                            <HomeWork sx={{ fontSize: 14 }} /> {item.phongKtx?.maPhong} - Giường{' '}
                            {item.giuongKtx?.maGiuong}
                          </Typography>
                        </Stack>
                      }
                    />
                    <History fontSize="small" color="action" />
                  </ListItemButton>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" mt={4}>
              Không có dữ liệu phù hợp
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
