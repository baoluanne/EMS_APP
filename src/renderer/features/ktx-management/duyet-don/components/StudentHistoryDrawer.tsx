import { Drawer, Box, Typography, IconButton, Stack, Button, Chip } from '@mui/material';
import {
  Close,
  History,
  SwapHoriz,
  MeetingRoom,
  Repeat,
  PostAdd,
  Home,
  Bed,
} from '@mui/icons-material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMemo } from 'react';
import { format } from 'date-fns';

interface Props {
  open: boolean;
  onClose: () => void;
  studentId: string;
  studentName?: string;
  studentCode?: string;
}

export const StudentHistoryDrawer = ({
  open,
  onClose,
  studentId,
  studentName,
  studentCode,
}: Props) => {
  const { data } = useCrudPagination<any>({
    entity: 'DonKtx',
    endpoint: `pagination?IdSinhVien=${studentId}`,
    enabled: open && !!studentId,
  });

  const historyList = useMemo(() => (data as any)?.result || [], [data]);

  const getDonConfig = (loaiDon: number, trangThai: number) => {
    const configs: any = {
      0: { label: 'Đăng ký mới', icon: <PostAdd fontSize="small" />, color: '#2e7d32' },
      1: { label: 'Gia hạn lưu trú', icon: <Repeat fontSize="small" />, color: '#ed6c02' },
      2: { label: 'Chuyển phòng', icon: <SwapHoriz fontSize="small" />, color: '#0288d1' },
      3: { label: 'Rời KTX', icon: <MeetingRoom fontSize="small" />, color: '#d32f2f' },
    };

    const statusColors: any = {
      0: { bg: '#fff4e5', text: '#663c00', label: 'ĐANG XỬ LÝ' },
      1: { bg: '#edf7ed', text: '#1e4620', label: 'ĐÃ DUYỆT' },
      2: { bg: '#fdeded', text: '#5f2120', label: 'TỪ CHỐI' },
    };

    return {
      ...configs[loaiDon],
      status: statusColors[trangThai] || statusColors[0],
    };
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 450 }, bgcolor: '#f5f7fa' } }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: '50%', display: 'flex' }}>
            <History color="primary" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Lịch sử đăng ký
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Sinh viên: {studentName} - {studentCode}
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} size="small">
          <Close fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        <Stack spacing={0}>
          {historyList.map((item: any, index: number) => {
            const config = getDonConfig(item.loaiDon, item.trangThai);
            const isLast = index === historyList.length - 1;

            return (
              <Box key={item.id} sx={{ display: 'flex', position: 'relative', pb: 4 }}>
                {!isLast && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 15,
                      top: 30,
                      bottom: 0,
                      width: '2px',
                      bgcolor: '#e0e0e0',
                    }}
                  />
                )}

                <Box
                  sx={{
                    zIndex: 1,
                    mr: 2,
                    mt: 0.5,
                    color: config.color,
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: `2px solid ${config.color}`,
                  }}
                >
                  {config.icon}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={0.5}
                  >
                    <Typography variant="subtitle2" fontWeight={700}>
                      {config.label}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {item.ngayGuiDon ? format(new Date(item.ngayGuiDon), 'dd/MM/yyyy') : '---'}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1, lineHeight: 1.6 }}>
                    {item.ghiChu || 'Không có ghi chú chi tiết cho đơn này.'}
                  </Typography>

                  {/* HIỂN THỊ PHÒNG VÀ GIƯỜNG NẾU ĐÃ DUYỆT (item.trangThai === 1) */}
                  {item.trangThai === 1 && (item.phongDuocDuyet || item.giuongDuocDuyet) && (
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        mb: 1.5,
                        p: 1,
                        bgcolor: '#f0f4f8',
                        borderRadius: 1,
                        border: '1px dashed #bcccdc',
                      }}
                    >
                      {item.phongDuocDuyet && (
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 600,
                            color: '#455a64',
                          }}
                        >
                          <Home sx={{ fontSize: 14, mr: 0.5, color: '#1976d2' }} />
                          Phòng: {item.phongDuocDuyet.maPhong}
                        </Typography>
                      )}
                      {item.giuongDuocDuyet && (
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 600,
                            color: '#455a64',
                          }}
                        >
                          <Bed sx={{ fontSize: 14, mr: 0.5, color: '#1976d2' }} />
                          Giường: {item.giuongDuocDuyet.maGiuong}
                        </Typography>
                      )}
                    </Stack>
                  )}

                  <Chip
                    label={config.status.label}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      bgcolor: config.status.bg,
                      color: config.status.text,
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              </Box>
            );
          })}

          {historyList.length === 0 && (
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
              Chưa có dữ liệu lịch sử.
            </Typography>
          )}
        </Stack>
      </Box>

      <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{ textTransform: 'none' }}
        >
          Đóng
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<History />}
          sx={{ textTransform: 'none' }}
        >
          In lịch sử
        </Button>
      </Box>
    </Drawer>
  );
};
