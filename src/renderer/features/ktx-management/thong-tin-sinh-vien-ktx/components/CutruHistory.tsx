import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Box,
  Paper,
  alpha,
} from '@mui/material';
import { Close, HistoryEdu, HomeWork, CalendarMonth } from '@mui/icons-material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { format } from 'date-fns';
import { useMemo } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  studentData: any;
}

export const ResidencyHistoryModal = ({ open, onClose, studentData }: Props) => {
  const { data } = useCrudPagination<any>({
    entity: 'CuTruKtx',
    endpoint: `history/${studentData?.sinhVienId}`,
    enabled: !!studentData?.sinhVienId && open,
  });

  const history = useMemo(() => {
    const rawData = (data as any)?.result || [];
    return [...rawData].sort(
      (a, b) => new Date(b.ngayTao || 0).getTime() - new Date(a.ngayTao || 0).getTime(),
    );
  }, [data]);

  const uniqueSemesters = useMemo(() => {
    const semesterSet = new Set<string>();
    history.forEach((item: any) => {
      if (item.idHocKy) {
        semesterSet.add(item.idHocKy);
      }
    });
    return semesterSet.size;
  }, [history]);

  const getLoaiDonLabel = (loaiDon: number) => {
    switch (loaiDon) {
      case 0:
        return 'Mới vào';
      case 1:
        return 'Gia hạn';
      case 2:
        return 'Chuyển phòng';
      case 3:
        return 'Rời KTX';
      default:
        return 'Khác';
    }
  };
  const currentResidency = useMemo(() => {
    return history.find((item) => item.loaiDon !== 3);
  }, [history]);
  const currentRoom = useMemo(() => {
    return currentResidency?.phongMoi?.maPhong || 'N/A';
  }, [currentResidency]);
  const totalViolations = useMemo(() => {
    return history.reduce((sum: number, item: any) => sum + (item.diemViPhamHocKy || 0), 0);
  }, [history]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            color: 'white',
            px: 3,
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <AvatarCustom icon={<HistoryEdu />} />
            <Box>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                Lịch sử lưu trú nội trú
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                Sinh viên: <b>{studentData?.sinhVien?.fullName}</b> | MSSV:{' '}
                <b>{studentData?.sinhVien?.maSinhVien}</b>
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, bgcolor: '#fbfcfe' }}>
        <Stack direction="row" spacing={2} sx={{ mb: 3, mt: 2 }}>
          <SummaryItem
            icon={<HomeWork />}
            label="Phòng hiện tại"
            value={currentRoom || 'N/A'}
            color="#1976d2"
          />
          <SummaryItem
            icon={<CalendarMonth />}
            label="Tổng số kỳ đã ở"
            value={`${uniqueSemesters} Học kỳ`}
            color="#2e7d32"
          />
          <SummaryItem
            icon={<HistoryEdu />}
            label="Điểm vi phạm"
            value={`${totalViolations} Điểm`}
            color="#d32f2f"
          />
        </Stack>

        <Stack spacing={2}>
          {history.map((item: any, index: number) => {
            const isRoiKtx = item.loaiDon === 3;
            const nextRecord = history[index - 1];

            let effectiveEndDate = item.ngayRoiThucTe;
            if (!effectiveEndDate && nextRecord) {
              effectiveEndDate =
                nextRecord.loaiDon === 3 ? nextRecord.ngayRoiThucTe : nextRecord.ngayBatDau;
            }

            return (
              <Paper
                key={item.id}
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
                }}
              >
                <Stack spacing={1.5}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pb: 1, borderBottom: '1px solid #eee' }}
                  >
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      {item.hocKy?.tenDot || '---'}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{ color: isRoiKtx ? 'error.main' : 'text.secondary' }}
                    >
                      {getLoaiDonLabel(item.loaiDon)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    <Box flex={1}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        gutterBottom
                      >
                        Phòng - Giường
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {item.giuongMoi?.maGiuong}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Loại: {item.phongMoi?.loaiPhong || 'N/A'}
                      </Typography>
                    </Box>

                    <Box flex={1}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        gutterBottom
                      >
                        {isRoiKtx ? 'Ngày rời KTX' : 'Ngày bắt đầu ở'}
                      </Typography>

                      {isRoiKtx ? (
                        <Typography variant="body2" fontWeight={600} color="error.main">
                          {item.ngayRoiThucTe
                            ? format(new Date(item.ngayRoiThucTe), 'dd/MM/yyyy')
                            : '---'}
                        </Typography>
                      ) : (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2" fontWeight={600}>
                            {format(new Date(item.ngayBatDau), 'dd/MM/yyyy')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            →
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {effectiveEndDate
                              ? format(new Date(effectiveEndDate), 'dd/MM/yyyy')
                              : 'Hiện tại'}
                          </Typography>
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>

        {history.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Không tìm thấy dữ liệu lịch sử cư trú.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

const AvatarCustom = ({ icon }: { icon: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: 'rgba(255,255,255,0.2)',
      width: 48,
      height: 48,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {icon}
  </Box>
);

const SummaryItem = ({ icon, label, value, color }: any) => (
  <Paper
    variant="outlined"
    sx={{ p: 1.5, flex: 1, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}
  >
    <Box
      sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(color, 0.1), color: color, display: 'flex' }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  </Paper>
);
