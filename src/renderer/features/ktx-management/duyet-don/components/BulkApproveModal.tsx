import { useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Alert,
  Divider,
  Paper,
  Tooltip,
} from '@mui/material';
import { Visibility, CheckCircleOutline, ErrorOutline, InfoOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { KtxLoaiDonOptions } from '../configs/KtxDonEnum';
import { useMutation } from '@renderer/shared/mutations';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedRowsData: any[];
  onSuccess: () => void;
  onViewDetail: (item: any) => void;
}

export const BulkApproveModal = ({
  open,
  onClose,
  selectedRowsData,
  onSuccess,
  onViewDetail,
}: Props) => {
  // Lọc các đơn đang ở trạng thái Chờ duyệt (0)
  const validRequests = useMemo(() => {
    return selectedRowsData.filter((row) => row.trangThai === 0);
  }, [selectedRowsData]);

  // Kiểm tra tính đồng nhất của loại đơn
  const isUniformType = useMemo(() => {
    if (validRequests.length <= 1) return true;
    const firstType = validRequests[0].loaiDon;
    return validRequests.every((row) => row.loaiDon === firstType);
  }, [validRequests]);

  const loaiDonLabel = useMemo(() => {
    if (validRequests.length === 0) return '';
    const type = validRequests[0].loaiDon;
    return KtxLoaiDonOptions.find((opt) => opt.value === type)?.label || '';
  }, [validRequests]);

  const { mutateAsync: bulkApprove, isPending } = useMutation<any>('DonKtx/bulk-approve');

  const handleSubmit = async () => {
    if (validRequests.length === 0) return;
    try {
      const ids = validRequests.map((item) => item.id);
      await bulkApprove(ids);
      toast.success(`Đã duyệt thành công ${validRequests.length} đơn ${loaiDonLabel}`);
      onSuccess();
      onClose();
    } catch {
      toast.error('Có lỗi xảy ra khi xử lý dữ liệu hàng loạt');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: '#fff',
              borderRadius: 1,
              p: 0.5,
              display: 'flex',
            }}
          >
            <CheckCircleOutline fontSize="small" />
          </Box>
          <Typography variant="h6" fontWeight={800}>
            DUYỆT ĐƠN HÀNG LOẠT
          </Typography>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <Stack spacing={3}>
          {!isUniformType ? (
            <Alert severity="error" variant="filled" icon={<ErrorOutline />}>
              Vui lòng chỉ chọn các đơn <b>CÙNG LOẠI</b> để duyệt hàng loạt.
            </Alert>
          ) : validRequests.length === 0 ? (
            <Alert severity="warning">
              Không có đơn nào ở trạng thái <b>Chờ duyệt</b> để xử lý.
            </Alert>
          ) : (
            <>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: 'primary.dark',
                  color: 'primary.contrastText',
                  borderRadius: 3,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Box>
                    <Typography variant="overline" sx={{ opacity: 0.8, fontWeight: 700 }}>
                      Phân loại đơn
                    </Typography>
                    <Typography variant="h5" fontWeight={900}>
                      {loaiDonLabel.toUpperCase()}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="overline" sx={{ opacity: 0.8, fontWeight: 700 }}>
                      Số lượng đơn
                    </Typography>
                    <Typography variant="h3" fontWeight={900} lineHeight={1}>
                      {validRequests.length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Box>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, px: 0.5 }}>
                  DANH SÁCH CHI TIẾT
                </Typography>
                <List
                  sx={{
                    maxHeight: 250,
                    overflow: 'auto',
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                  }}
                >
                  {validRequests.map((item, index) => (
                    <ListItem
                      key={item.id}
                      divider={index !== validRequests.length - 1}
                      secondaryAction={
                        <Tooltip title="Xem chi tiết">
                          <IconButton edge="end" onClick={() => onViewDetail(item)} size="small">
                            <Visibility color="primary" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: item.sinhVien?.gioiTinh === 0 ? '#3b82f6' : '#ec4899',
                            width: 32,
                            height: 32,
                          }}
                        >
                          {item.sinhVien?.ten?.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={700}>
                            {item.sinhVien?.fullName}
                          </Typography>
                        }
                        secondary={`MSSV: ${item.sinhVien?.maSinhVien}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Alert severity="info" icon={<InfoOutlined fontSize="small" />}>
                Hệ thống sẽ tự động duyệt vào <b>Phòng/Giường yêu cầu</b> trong đơn.
              </Alert>
            </>
          )}
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, bgcolor: '#f8fafc' }}>
        <Button onClick={onClose} color="inherit" disabled={isPending}>
          Hủy
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={isPending}
          disabled={!isUniformType || validRequests.length === 0}
        >
          Xác nhận ({validRequests.length})
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
