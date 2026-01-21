import {
  Drawer,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Search, PersonOff, History, Home } from '@mui/icons-material';
import { useState } from 'react';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { format } from 'date-fns';

export const SearchLeftStudentDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [keyword, setKeyword] = useState('');

  // Fetch dữ liệu lịch sử (Trạng thái đã ra)
  const { data, isRefetching } = useCrudPagination<any>({
    entity: 'cu-tru-ktx',
    endpoint: `pagination?TrangThai=DaRa&Keyword=${keyword}`,
    enabled: open && keyword.length > 1,
  });

  const results = (data as any)?.result || [];

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 450 } }}>
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
          <Box sx={{ bgcolor: '#fff0f0', p: 1, borderRadius: '50%', display: 'flex' }}>
            <PersonOff color="error" />
          </Box>
          <Typography variant="h6" fontWeight={700}>
            Tra cứu sinh viên đã rời
          </Typography>
        </Stack>

        <TextField
          fullWidth
          size="small"
          placeholder="Tìm theo tên, MSSV, phòng cũ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            endAdornment: isRefetching ? <CircularProgress size={20} /> : null,
          }}
        />

        <Divider sx={{ my: 3 }} />

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={700}
            sx={{ mb: 2, display: 'block' }}
          >
            KẾT QUẢ TÌM KIẾM ({results.length})
          </Typography>

          <List>
            {results.map((item: any) => (
              <ListItem
                key={item.id}
                sx={{
                  mb: 1.5,
                  bgcolor: '#f8f9fa',
                  borderRadius: 2,
                  border: '1px solid #edf2f7',
                  '&:hover': { bgcolor: '#f1f5f9' },
                }}
              >
                <Avatar sx={{ mr: 2, bgcolor: 'grey.200', color: 'grey.600' }}>
                  <History />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={700}>
                      {item.sinhVien?.hoDem} {item.sinhVien?.ten} - {item.sinhVien?.maSinhVien}
                    </Typography>
                  }
                  secondary={
                    <Stack spacing={0.5} mt={0.5}>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Home sx={{ fontSize: 14, mr: 0.5 }} />
                        Phòng cũ: {item.phongKtx?.maPhong} (Giường {item.giuongKtx?.maGiuong})
                      </Typography>
                      <Typography variant="caption" color="error.main" fontWeight={600}>
                        Ngày rời thực tế:{' '}
                        {item.ngayRoiKtx
                          ? format(new Date(item.ngayRoiKtx), 'dd/MM/yyyy')
                          : 'Chưa rõ'}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))}
          </List>

          {results.length === 0 && keyword.length > 1 && !isRefetching && (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
              <Typography variant="body2" color="text.secondary">
                Không tìm thấy sinh viên phù hợp.
              </Typography>
            </Box>
          )}
        </Box>

        <Button fullWidth variant="contained" color="inherit" onClick={onClose} sx={{ mt: 2 }}>
          Đóng
        </Button>
      </Box>
    </Drawer>
  );
};
