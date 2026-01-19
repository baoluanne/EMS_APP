import { useState } from 'react';
import { Stack, TextField, MenuItem, Button, Divider, Typography } from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMutation } from '@renderer/shared/mutations';
import { toast } from 'react-toastify';
import { Cancel } from '@mui/icons-material';

interface Props {
  onClose: () => void;
  selectedId: string;
  onSuccess: () => void;
}

export const ApproveDonModal = ({ onClose, selectedId, onSuccess }: Props) => {
  const [phongId, setPhongId] = useState('');
  const [giuongId, setGiuongId] = useState('');
  const [lyDo, setLyDo] = useState('');

  const { data: phongs } = useCrudPagination<any>({ entity: 'KtxPhong' });
  const { data: giuongs } = useCrudPagination<any>({
    entity: 'KtxGiuong',
    endpoint: `pagination?PhongId=${phongId}&TrangThai=Trong`,
    enabled: !!phongId,
  });

  const { mutateAsync: approveDon } = useMutation<any>(
    `DonKtx/${selectedId}/approve?phongDuyetId=${phongId}&giuongDuyetId=${giuongId}`,
  );
  const { mutateAsync: rejectDon } = useMutation<any>(`DonKtx/${selectedId}/reject`);

  const handleApprove = async () => {
    if (!phongId || !giuongId) return toast.error('Vui lòng chọn phòng và giường');
    try {
      await approveDon({});
      toast.success('Duyệt đơn thành công');
      onSuccess();
      onClose();
    } catch {
      toast.error('Lỗi khi duyệt');
    }
  };

  const handleReject = async () => {
    if (!lyDo.trim()) return toast.error('Vui lòng nhập lý do từ chối');
    try {
      await rejectDon(lyDo);
      toast.success('Đã từ chối đơn');
      onSuccess();
      onClose();
    } catch {
      toast.error('Lỗi khi từ chối');
    }
  };

  return (
    <FormDetailsModal
      title="Xử lý đơn KTX"
      onClose={onClose}
      onSave={handleApprove}
      saveTitle="Phê duyệt"
      maxWidth="xs"
    >
      <Stack spacing={2} sx={{ mt: 1 }}>
        <Typography variant="caption" fontWeight={700} color="primary">
          THÔNG TIN DUYỆT PHÒNG
        </Typography>
        <TextField
          select
          fullWidth
          label="Phòng duyệt"
          value={phongId}
          onChange={(e) => setPhongId(e.target.value)}
          size="small"
        >
          {phongs?.result?.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.tenPhong}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Giường duyệt"
          value={giuongId}
          onChange={(e) => setGiuongId(e.target.value)}
          size="small"
          disabled={!phongId}
        >
          {giuongs?.result?.map((g: any) => (
            <MenuItem key={g.id} value={g.id}>
              {g.maGiuong}
            </MenuItem>
          ))}
        </TextField>

        <Divider sx={{ my: 1 }} />

        <Typography variant="caption" fontWeight={700} color="error">
          HÀNH ĐỘNG TỪ CHỐI
        </Typography>
        <TextField
          fullWidth
          label="Lý do từ chối"
          multiline
          rows={2}
          value={lyDo}
          onChange={(e) => setLyDo(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          color="error"
          startIcon={<Cancel />}
          onClick={handleReject}
          fullWidth
          size="small"
        >
          Từ chối đơn này
        </Button>
      </Stack>
    </FormDetailsModal>
  );
};
