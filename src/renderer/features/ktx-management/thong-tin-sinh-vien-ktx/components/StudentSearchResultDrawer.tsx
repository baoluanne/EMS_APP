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
  Chip,
  Tooltip,
} from '@mui/material';
import { Close, Person, History, Badge, HomeWork, CheckCircle, Cancel } from '@mui/icons-material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { ThongTinSvKtxFilterState } from '../type';
import { useMemo } from 'react';

interface Props {
  open: boolean;
  filters: ThongTinSvKtxFilterState;
  onClose: () => void;
  onStudentClick: (student: any) => void;
}

const removeAccents = (str: string) => {
  return str
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
    : '';
};

export const StudentSearchResultDrawer = ({ open, filters, onClose, onStudentClick }: Props) => {
  const hasFilter = useMemo(() => {
    const hasMaSinhVien = (filters.maSinhVien?.trim() || '') !== '';
    const hasHoTen = (filters.hoTen?.trim() || '') !== '';
    const hasMaPhong = (filters.maPhong?.trim() || '') !== '';
    const hasMaGiuong = (filters.maGiuong?.trim() || '') !== '';
    const hasTrangThai =
      filters.trangThai !== undefined && filters.trangThai !== '' && filters.trangThai !== null;
    const hasTrangThaiText = ((filters as any).trangThaiText?.trim() || '') !== '';

    return (
      hasMaSinhVien || hasHoTen || hasMaPhong || hasMaGiuong || hasTrangThai || hasTrangThaiText
    );
  }, [filters]);

  const buildQueryString = useMemo(() => {
    const params = new URLSearchParams();

    const keywords: string[] = [];
    if (filters.maSinhVien?.trim()) keywords.push(filters.maSinhVien.trim());
    if (filters.hoTen?.trim()) keywords.push(filters.hoTen.trim());
    if (filters.maPhong?.trim()) keywords.push(filters.maPhong.trim());
    if (filters.maGiuong?.trim()) keywords.push(filters.maGiuong.trim());

    if (keywords.length > 0) {
      params.append('Keyword', keywords.join(' '));
    }

    if ((filters as any).trangThaiText) {
      const search = removeAccents((filters as any).trangThaiText);
      const statusMap: any = {
        'dang o': '0',
        dango: '0',
        'da roi': '1',
        daroi: '1',
      };

      const matchedStatus = Object.entries(statusMap).find(([key]) =>
        removeAccents(key).includes(search),
      );

      if (matchedStatus) {
        params.append('TrangThai', matchedStatus[1]);
      }
    } else if (filters.trangThai !== undefined && filters.trangThai !== '') {
      params.append('TrangThai', filters.trangThai.toString());
    }

    params.append('pageSize', '100');

    return params.toString();
  }, [filters]);

  const { data, isRefetching } = useCrudPagination<any>({
    entity: 'CuTruKtx',
    endpoint: `pagination?${buildQueryString}`,
    enabled: open && hasFilter,
  });

  const results = useMemo(() => {
    const rawResults = (data as any)?.result || [];

    const uniqueStudents = new Map<string, any>();

    rawResults.forEach((item: any) => {
      const sinhVienId = item.sinhVienId || item.sinhVien?.id;
      if (!sinhVienId) return;

      const existing = uniqueStudents.get(sinhVienId);

      if (!existing || new Date(item.ngayTao || 0) > new Date(existing.ngayTao || 0)) {
        uniqueStudents.set(sinhVienId, item);
      }
    });

    return Array.from(uniqueStudents.values());
  }, [data]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 480, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            color: 'white',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Person sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Kết quả tìm kiếm
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {results.length} sinh viên được tìm thấy
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
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
              {results.map((item: any) => {
                const isActive = item.trangThai === '0' || item.trangThai === 0;
                const trangThaiLabel = isActive ? 'Đang ở' : 'Đã rời';
                const trangThaiColor = isActive ? 'success' : 'error';
                const TrangThaiIcon = isActive ? CheckCircle : Cancel;

                return (
                  <Paper
                    key={item.id}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: 'all 0.2s',
                      borderLeftWidth: 4,
                      borderLeftColor: isActive ? 'success.main' : 'error.main',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <ListItemButton onClick={() => onStudentClick(item)} sx={{ p: 1.5 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 42, height: 42 }}>
                          {item.sinhVien?.ten?.charAt(0) || '?'}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2" fontWeight={800}>
                              {item.sinhVien?.fullName}
                            </Typography>
                            <Chip
                              label={trangThaiLabel}
                              size="small"
                              color={trangThaiColor}
                              icon={<TrangThaiIcon sx={{ fontSize: 14 }} />}
                              sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700 }}
                            />
                          </Stack>
                        }
                        secondary={
                          <Stack spacing={0.3} mt={0.5}>
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
                              <HomeWork sx={{ fontSize: 14 }} />
                              {item.phongKtx?.maPhong || 'N/A'} - Giường{' '}
                              {item.giuongKtx?.maGiuong || 'N/A'}
                            </Typography>
                          </Stack>
                        }
                      />
                      <Tooltip title="Xem lịch sử cư trú">
                        <History fontSize="small" color="action" />
                      </Tooltip>
                    </ListItemButton>
                  </Paper>
                );
              })}
            </Stack>
          ) : (
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                😔
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Không tìm thấy sinh viên phù hợp
              </Typography>
              <Typography variant="caption" color="text.secondary" mt={1} display="block">
                Hãy thử điều chỉnh bộ lọc của bạn
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
