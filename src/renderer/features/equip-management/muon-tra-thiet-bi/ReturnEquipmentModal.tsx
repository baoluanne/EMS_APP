import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Box,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { AssignmentOutlined } from '@mui/icons-material';

interface ChiTietPhieuMuon {
  id: string;
  thietBiId: string;
  thietBi?: {
    maThietBi: string;
    tenThietBi: string;
  };
  tinhTrangKhiMuon?: string;
  tinhTrangKhiTra?: string;
  isDaTra: boolean;
  ngayTraThucTe?: string;
}

interface ReturnFormValues {
  id: string;
  chiTietPhieuMuons: ChiTietPhieuMuon[];
}

interface ReturnEquipmentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ReturnFormValues) => void;
  data: any;
}

const TINH_TRANG_OPTIONS = [
  { value: 'Bình thường', label: 'Bình thường', color: 'success' },
  { value: 'Cần bảo trì', label: 'Cần bảo trì', color: 'warning' },
  { value: 'Hỏng', label: 'Hỏng', color: 'error' },
  { value: 'Mất', label: 'Mất', color: 'error' },
];

export const ReturnEquipmentModal = ({
  open,
  onClose,
  onSave,
  data,
}: ReturnEquipmentModalProps) => {
  const { register, control, handleSubmit, reset } = useForm<ReturnFormValues>({
    defaultValues: {
      id: '',
      chiTietPhieuMuons: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'chiTietPhieuMuons',
  });

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        chiTietPhieuMuons: data.chiTietPhieuMuons || [],
      });
    }
  }, [data, reset]);

  const getNguoiMuon = () => {
    if (!data) return 'N/A';
    if (data.loaiDoiTuong === 1) {
      return `${data.sinhVien?.hoDem || ''} ${data.sinhVien?.ten || ''}`.trim() || 'N/A';
    }
    if (data.loaiDoiTuong === 2) {
      return `${data.giangVien?.hoDem || ''} ${data.giangVien?.ten || ''}`.trim() || 'N/A';
    }
    return 'N/A';
  };

  const getLoaiDoiTuong = () => {
    if (!data) return 'N/A';
    return data.loaiDoiTuong === 1 ? 'Sinh viên' : 'Giảng viên';
  };

  const getTrangThaiChip = () => {
    const statusMap: Record<number, { label: string; color: 'warning' | 'success' | 'error' }> = {
      0: { label: 'Đang mượn', color: 'warning' },
      1: { label: 'Đã trả', color: 'success' },
      2: { label: 'Quá hạn', color: 'error' },
    };
    const status = statusMap[data?.trangThai as number] || { label: 'N/A', color: 'warning' };
    return <Chip label={status.label} color={status.color} size="small" />;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <AssignmentOutlined fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            XÁC NHẬN TRẢ THIẾT BỊ
          </Typography>
        </Box>
        {getTrangThaiChip()}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent dividers sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: '#f8fafc',
                borderRadius: 1,
                border: '1px solid #e2e8f0',
              }}
            >
              <Typography variant="caption" fontWeight={600} color="primary" display="block" mb={1}>
                THÔNG TIN PHIẾU
              </Typography>
              <Stack spacing={0.5}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="caption" color="text.secondary">
                    Mã:
                  </Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {data?.maPhieu || 'N/A'}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="caption" color="text.secondary">
                    Người mượn:
                  </Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {getNguoiMuon()}
                  </Typography>
                  <Chip label={getLoaiDoiTuong()} size="small" sx={{ height: 18, fontSize: 10 }} />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Ngày mượn:
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {data?.ngayMuon ? format(new Date(data.ngayMuon), 'dd/MM/yyyy') : 'N/A'}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Hẹn trả:
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {data?.ngayTraDuKien
                        ? format(new Date(data.ngayTraDuKien), 'dd/MM/yyyy')
                        : 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="caption" fontWeight={600} color="primary" display="block" mb={1}>
                DANH SÁCH THIẾT BỊ
              </Typography>
              <Table
                size="small"
                sx={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 1,
                  '& .MuiTableCell-root': {
                    py: 0.75,
                    fontSize: '0.8125rem',
                  },
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell width="50" align="center">
                      Trả
                    </TableCell>
                    <TableCell width="120">Mã TB</TableCell>
                    <TableCell>Tên thiết bị</TableCell>
                    <TableCell width="130">TT khi mượn</TableCell>
                    <TableCell width="180">TT khi trả</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell align="center">
                        <Checkbox
                          {...register(`chiTietPhieuMuons.${index}.isDaTra`)}
                          defaultChecked={field.isDaTra}
                          disabled={field.isDaTra}
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {field.thietBi?.maThietBi || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {field.thietBi?.tenThietBi || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={field.tinhTrangKhiMuon || 'Bình thường'}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: 11 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Controller
                          name={`chiTietPhieuMuons.${index}.tinhTrangKhiTra`}
                          control={control}
                          defaultValue={field.tinhTrangKhiTra || 'Bình thường'}
                          render={({ field: controllerField }) => (
                            <FormControl fullWidth size="small" disabled={field.isDaTra}>
                              <Select
                                {...controllerField}
                                sx={{
                                  bgcolor: field.isDaTra ? '#f5f5f5' : 'white',
                                  fontSize: '0.8125rem',
                                }}
                              >
                                {TINH_TRANG_OPTIONS.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    <Chip
                                      label={option.label}
                                      size="small"
                                      color={option.color as any}
                                      variant="outlined"
                                      sx={{ fontSize: 11 }}
                                    />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 1.5, gap: 1 }}>
          <Button onClick={onClose} color="inherit" size="small">
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="success" size="small">
            Cập nhật
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
