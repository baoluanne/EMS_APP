import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { env } from '@renderer/shared/configs/env.config';
import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: env.API_ENDPOINT,
});

const formatCurrency = (value: number | null | undefined) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);

interface Props {
  open: boolean;
  congNoId: string | null;
  sinhVienId: string | null;
  namHocHocKyId: string | null;
  onClose: () => void;
  onEdit: () => void;
}

interface CongNoDetailDto {
  id: string;
  sinhVienId: string;
  namHocHocKyId: string;
  maSinhVien: string;
  hoTen: string;
  tenHocKy: string;
  tongPhaiThu: number;
  tongMienGiam: number;
  daThu: number;
  conNo: number;
  hanNop: string | null;
  ghiChu: string;
  chiTiets: {
    loaiKhoanThuId: string;
    soTien: number;
    ghiChu: string;
  }[];
}

interface LoaiKhoanThu {
  id: string;
  tenLoaiKhoanThu: string;
}

interface PhieuThuSinhVien {
  id: string;
  soPhieu: string;
  congNoId?: string | null;
  soTien: number;
  hinhThucThanhToan: string;
  ngayThu: string;
  ghiChu?: string;
}

interface MienGiamSinhVien {
  id: string;
  congNoId?: string | null;
  soTien: number;
  lyDo: string;
  trangThai: string;
  ngayTao: string;
}

export const ChiTietCongNoModal = ({
  open,
  congNoId,
  sinhVienId,
  namHocHocKyId,
  onClose,
  onEdit,
}: Props) => {
  const [tab, setTab] = useState(0);

  const {
    data: congNoData,
    isLoading: isLoadingCongNo,
    error,
  } = useQuery<CongNoDetailDto>({
    queryKey: ['cong-no-detail', congNoId, sinhVienId, namHocHocKyId],
    queryFn: async () => {
      if (sinhVienId && namHocHocKyId) {
        const response = await api.get('/CongNo/chi-tiet', {
          params: { sinhVienId, namHocHocKyId },
        });
        return response.data?.result || response.data;
      }
      if (congNoId) {
        const response = await api.get(`/CongNo/${congNoId}`);
        const rawData = response.data?.result || response.data;
        return {
          ...rawData,
          tongPhaiThu:
            rawData.chiTiets?.reduce((acc: number, cur: any) => acc + cur.soTien, 0) || 0,
          conNo:
            (rawData.chiTiets?.reduce((acc: number, cur: any) => acc + cur.soTien, 0) || 0) -
            (rawData.daThu || 0) -
            (rawData.tongMienGiam || 0),
        };
      }
      throw new Error('Thiếu thông tin để tải dữ liệu');
    },
    enabled: open && (!!(sinhVienId && namHocHocKyId) || !!congNoId),
  });

  const currentCongNoId = congNoData?.id || congNoId;

  const { data: listLoaiKhoanThu } = useQuery<LoaiKhoanThu[]>({
    queryKey: ['loai-khoan-thu'],
    queryFn: async () => {
      const response = await api.get('/LoaiKhoanThu');
      return Array.isArray(response.data) ? response.data : response.data?.result || [];
    },
    enabled: open,
  });

  const { data: listPhieuThuFiltered } = useQuery<PhieuThuSinhVien[]>({
    queryKey: ['phieu-thu-all', currentCongNoId],
    queryFn: async () => {
      if (!currentCongNoId) return [];
      const response = await api.get('/PhieuThu');
      const allData = Array.isArray(response.data) ? response.data : response.data?.result || [];
      return allData.filter((pt: PhieuThuSinhVien) => pt.congNoId === currentCongNoId);
    },
    enabled: open && !!currentCongNoId,
  });

  const { data: listMienGiamFiltered } = useQuery<MienGiamSinhVien[]>({
    queryKey: ['mien-giam-all', currentCongNoId],
    queryFn: async () => {
      if (!currentCongNoId) return [];
      const response = await api.get('/MienGiam/apply');
      const allData = Array.isArray(response.data) ? response.data : response.data?.result || [];
      return allData.filter((mg: MienGiamSinhVien) => mg.congNoId === currentCongNoId);
    },
    enabled: open && !!currentCongNoId,
  });

  const getTenLoaiKhoanThu = (id: string) => {
    const found = listLoaiKhoanThu?.find((x) => x.id === id);
    return found ? found.tenLoaiKhoanThu : 'Khoản thu khác';
  };

  if (!open) return null;

  if (isLoadingCongNo) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !congNoData) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography color="error">Không thể tải dữ liệu. Vui lòng thử lại.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const chiTietList = congNoData.chiTiets || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ borderBottom: '1px solid #e0e0e0', pb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Chi tiết công nợ</Typography>
          {congNoData.maSinhVien && (
            <Chip
              label={`${congNoData.maSinhVien} - ${congNoData.hoTen}`}
              color="primary"
              variant="outlined"
            />
          )}
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Thông tin chung" />
          <Tab label={`Chi tiết khoản thu (${chiTietList.length})`} />
          <Tab label={`Lịch sử thu (${listPhieuThuFiltered?.length || 0})`} />
          <Tab label={`Miễn giảm (${listMienGiamFiltered?.length || 0})`} />
        </Tabs>

        {tab === 0 && (
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                textTransform="uppercase"
                fontWeight="bold"
              >
                Tổng quan
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
                  <Typography variant="body2" color="text.secondary">
                    Tổng phải thu:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatCurrency(congNoData.tongPhaiThu)}
                  </Typography>
                </Box>
                <Box gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
                  <Typography variant="body2" color="text.secondary">
                    Đã thu:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {formatCurrency(congNoData.daThu)}
                  </Typography>
                </Box>
                <Box gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
                  <Typography variant="body2" color="text.secondary">
                    Đã miễn giảm:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    {formatCurrency(congNoData.tongMienGiam)}
                  </Typography>
                </Box>

                <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Typography variant="body2" color="text.secondary">
                    Còn nợ (Phải đóng):
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: congNoData.conNo > 0 ? '#d32f2f' : '#2e7d32',
                    }}
                  >
                    {formatCurrency(congNoData.conNo)}
                  </Typography>
                </Box>
                <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Typography variant="body2" color="text.secondary">
                    Hạn nộp:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {congNoData.hanNop
                      ? format(new Date(congNoData.hanNop), 'dd/MM/yyyy')
                      : 'Chưa thiết lập'}
                  </Typography>
                </Box>

                <Box gridColumn="span 12">
                  <Typography variant="body2" color="text.secondary">
                    Ghi chú chung:
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {congNoData.ghiChu || 'Không có'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        )}

        {tab === 1 && (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>
                    <strong>Loại khoản thu</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Số tiền</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Ghi chú</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chiTietList.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{getTenLoaiKhoanThu(item.loaiKhoanThuId)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500 }}>
                      {formatCurrency(item.soTien)}
                    </TableCell>
                    <TableCell>{item.ghiChu || '-'}</TableCell>
                  </TableRow>
                ))}
                {chiTietList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
                <TableRow sx={{ bgcolor: 'primary.50' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>TỔNG CỘNG</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(congNoData.tongPhaiThu)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 2 && (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>Số phiếu</TableCell>
                  <TableCell align="right">Số tiền</TableCell>
                  <TableCell>Hình thức</TableCell>
                  <TableCell>Ngày thu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listPhieuThuFiltered && listPhieuThuFiltered.length > 0 ? (
                  listPhieuThuFiltered.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.soPhieu}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {formatCurrency(item.soTien)}
                      </TableCell>
                      <TableCell>{item.hinhThucThanhToan}</TableCell>
                      <TableCell>
                        {item.ngayThu ? format(new Date(item.ngayThu), 'dd/MM/yyyy HH:mm') : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                      Chưa có lịch sử thanh toán
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 3 && (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell align="right">Số tiền</TableCell>
                  <TableCell>Lý do</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listMienGiamFiltered && listMienGiamFiltered.length > 0 ? (
                  listMienGiamFiltered.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'warning.main' }}>
                        {formatCurrency(item.soTien)}
                      </TableCell>
                      <TableCell>{item.lyDo}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.trangThai === 'DaDuyet' ? 'Đã duyệt' : 'Chờ duyệt'}
                          color={item.trangThai === 'DaDuyet' ? 'success' : 'warning'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {item.ngayTao ? format(new Date(item.ngayTao), 'dd/MM/yyyy') : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                      Không có dữ liệu miễn giảm
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Đóng
        </Button>
        <Button variant="contained" color="primary" onClick={onEdit}>
          Chỉnh sửa công nợ
        </Button>
      </DialogActions>
    </Dialog>
  );
};
