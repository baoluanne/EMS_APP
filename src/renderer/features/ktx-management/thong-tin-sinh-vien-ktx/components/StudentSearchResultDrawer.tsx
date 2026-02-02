import { useState, useEffect } from 'react';
import {
  Drawer,
  Stack,
  Typography,
  Box,
  IconButton,
  Divider,
  Avatar,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Close, Person, Home, Bed, CalendarMonth } from '@mui/icons-material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import type { ThongTinSvKtxFilterState } from '@renderer/features/ktx-management/thong-tin-sinh-vien-ktx/type';

interface Props {
  open: boolean;
  filters: ThongTinSvKtxFilterState;
  onClose: () => void;
  onStudentClick: (student: any) => void;
}

export const StudentSearchResultDrawer = ({ open, filters, onClose, onStudentClick }: Props) => {
  const [params, setParams] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.maSinhVien) queryParams.append('MaSinhVien', filters.maSinhVien);
    if (filters.hoTen) queryParams.append('HoTen', filters.hoTen);
    if (filters.maPhong) queryParams.append('MaPhong', filters.maPhong);

    if (filters.isSapHetHan === 'true') {
      queryParams.append('IsSapHetHan', 'true');
      queryParams.append('TrangThai', '0');
    }

    if (filters.isQuaHan === 'true') {
      queryParams.append('IsQuaHan', 'true');
      queryParams.append('TrangThai', '0');
    }

    setParams(queryParams.toString());
  }, [filters]);

  const { data: cuTruData, refetch } = useCrudPagination<any>({
    entity: 'CuTruKtx',
    endpoint: `pagination?pageSize=100&${params}`,
    enabled: open && params.length > 0,
  });

  useEffect(() => {
    if (open && params.length > 0) {
      setIsLoading(true);
      refetch();
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [params, open, refetch]);

  const students = (cuTruData as any)?.result || [];

  const getStatusChip = (ngayRoiKtx: string) => {
    if (!ngayRoiKtx) return null;
    const roiKtx = new Date(ngayRoiKtx);
    const now = new Date();
    const warning = new Date();
    warning.setDate(warning.getDate() + 15);

    if (roiKtx < now)
      return <Chip label="Quá hạn" color="error" size="small" sx={{ fontWeight: 700 }} />;
    if (roiKtx <= warning)
      return <Chip label="Sắp hết hạn" color="warning" size="small" sx={{ fontWeight: 700 }} />;
    return <Chip label="Còn hạn" color="success" size="small" sx={{ fontWeight: 700 }} />;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 450 }, bgcolor: '#f8fafc' } }}
    >
      <Stack spacing={0} sx={{ height: '100%' }}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Kết quả tìm kiếm ({students.length})
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Thông tin sinh viên nội trú
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>

        <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : students.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">Không tìm thấy sinh viên phù hợp</Typography>
            </Box>
          ) : (
            students.map((student: any) => (
              <Box
                key={student.id}
                onClick={() => onStudentClick(student)}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2,
                  p: 2,
                  cursor: 'pointer',
                  border: '1px solid #e2e8f0',
                  '&:hover': { boxShadow: 2, borderColor: 'primary.main' },
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Person />
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {student.sinhVien?.hoDem} {student.sinhVien?.ten}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        MSSV: {student.sinhVien?.maSinhVien}
                      </Typography>
                    </Box>
                    {getStatusChip(student.ngayRoiKtx)}
                  </Stack>
                  <Divider />
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Home fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Phòng:</strong> {student.phongKtx?.maPhong}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Bed fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Giường:</strong> {student.giuongKtx?.maGiuong?.split('-').pop()}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonth fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>Hết hạn:</strong>{' '}
                        {student.ngayRoiKtx
                          ? new Date(student.ngayRoiKtx).toLocaleDateString('vi-VN')
                          : 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            ))
          )}
        </Stack>
      </Stack>
    </Drawer>
  );
};
