import {
  Box,
  Drawer,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Link,
  Paper,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
} from '@mui/material';
import { Close, Hotel, Home, FileDownloadOutlined, People, MeetingRoom } from '@mui/icons-material';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';

interface BedListDrawerProps {
  phong: any;
  onClose: () => void;
  onStudentClick: (student: any) => void;
}

export const BedListDrawer = ({ phong, onClose, onStudentClick }: BedListDrawerProps) => {
  const occupiedBeds = phong?.giuongs?.filter((g: any) => g.trangThai === 1).length || 0;
  const emptyBeds = (phong?.soLuongGiuong || 0) - occupiedBeds;

  const handleExportExcel = () => {
    if (!phong?.giuongs?.length) return;

    const exportData = phong.giuongs.map((g: any) => ({
      maGiuong: g.maGiuong,
      trangThai: g.trangThai === 1 ? 'Đã ở' : 'Trống',
      fullName: g.sinhVien?.fullName || '---',
      maSinhVien: g.sinhVien?.maSinhVien || '---',
      soDienThoai: g.sinhVien?.soDienThoai || '---',
      email: g.sinhVien?.email || '---',
      gioiTinh: g.sinhVien?.gioiTinh === 0 ? 'Nam' : g.sinhVien?.gioiTinh === 1 ? 'Nữ' : '---',
      diaChi: g.sinhVien?.diaChiLienLac || '---',
    }));

    const exportColumns = [
      { field: 'maGiuong', headerName: 'Mã Giường' },
      { field: 'trangThai', headerName: 'Trạng Thái' },
      { field: 'fullName', headerName: 'Sinh Viên' },
      { field: 'maSinhVien', headerName: 'MSSV' },
      { field: 'soDienThoai', headerName: 'Số Điện Thoại' },
      { field: 'email', headerName: 'Email' },
      { field: 'gioiTinh', headerName: 'Giới Tính' },
      { field: 'diaChi', headerName: 'Địa Chỉ' },
    ];

    exportPaginationToExcel({
      entity: 'PhongKtx',
      filteredData: exportData,
      columns: exportColumns,
      options: {
        dataOption: 'filtered',
        columnOption: 'all',
      },
      columnVisibilityModel: {},
      fileName: `Phong_${phong?.maPhong}_${phong?.tang?.tenTang || ''}`,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={!!phong}
      onClose={onClose}
      PaperProps={{ sx: { width: 1200, borderLeft: 'none' } }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#fff',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              <Hotel fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={900}>
                Phòng {phong?.maPhong}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {phong?.loaiPhong} | {phong?.tang?.tenTang}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              size="small"
              startIcon={<FileDownloadOutlined />}
              onClick={handleExportExcel}
              disabled={!phong?.giuongs?.length}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 2 }}
            >
              Xuất danh sách phòng
            </Button>
            <IconButton onClick={onClose} size="small" sx={{ bgcolor: '#f1f5f9' }}>
              <Close fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ p: 2, bgcolor: '#f8fafc', display: 'flex', gap: 2 }}>
          <StatMiniCard
            label="Tổng giường"
            value={phong?.soLuongGiuong || 0}
            icon={<Home color="primary" fontSize="small" />}
            color="#0288d1"
          />
          <StatMiniCard
            label="Đang ở"
            value={occupiedBeds}
            icon={<People fontSize="small" />}
            color="#d32f2f"
          />
          <StatMiniCard
            label="Trống"
            value={emptyBeds}
            icon={<MeetingRoom fontSize="small" />}
            color="#2e7d32"
          />
        </Box>

        <Divider />

        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: 2, bgcolor: '#fff' }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, bgcolor: '#f1f5f9', width: 120 }}>
                    Giường
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 800, bgcolor: '#f1f5f9', textAlign: 'center', width: 100 }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, bgcolor: '#f1f5f9', width: 200 }}>
                    Sinh viên
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, bgcolor: '#f1f5f9', width: 120 }}>
                    MSSV
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, bgcolor: '#f1f5f9', width: 120 }}>
                    Số điện thoại
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, bgcolor: '#f1f5f9', width: 220 }}>
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 800, bgcolor: '#f1f5f9', textAlign: 'center', width: 100 }}
                  >
                    Giới tính
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, bgcolor: '#f1f5f9' }}>
                    Địa chỉ liên lạc
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phong?.giuongs?.map((giuong: any) => {
                  const sv = giuong.sinhVien;
                  return (
                    <TableRow key={giuong.id} sx={{ '&:hover': { bgcolor: '#f8f9fa' } }}>
                      <TableCell sx={{ fontWeight: 700 }}>{giuong.maGiuong}</TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={giuong.trangThai === 1 ? 'Đã ở' : 'Trống'}
                          color={giuong.trangThai === 1 ? 'error' : 'success'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {sv ? (
                          <Link
                            component="button"
                            variant="body2"
                            onClick={() => onStudentClick(giuong)}
                            sx={{ fontWeight: 700, textAlign: 'left', textDecoration: 'none' }}
                          >
                            {sv.fullName}
                          </Link>
                        ) : (
                          <Typography variant="caption" color="text.disabled italic">
                            (Trống)
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ fontSize: '13px' }}>{sv?.maSinhVien || '---'}</TableCell>
                      <TableCell sx={{ fontSize: '13px' }}>{sv?.soDienThoai || '---'}</TableCell>
                      <TableCell>
                        <Tooltip title={sv?.email || ''}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              maxWidth: 200,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {sv?.email || '---'}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        {sv && (
                          <Chip
                            label={sv.gioiTinh === 0 ? 'Nam' : 'Nữ'}
                            size="small"
                            variant="outlined"
                            color={sv.gioiTinh === 1 ? 'info' : 'error'}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={sv?.diaChiLienLac || ''}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              maxWidth: 250,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {sv?.diaChiLienLac || '---'}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Drawer>
  );
};

const StatMiniCard = ({ label, value, icon, color }: any) => (
  <Paper
    variant="outlined"
    sx={{
      flex: 1,
      p: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      bgcolor: '#fff',
      borderRadius: 2,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <Box sx={{ color: color, display: 'flex' }}>{icon}</Box>
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', lineHeight: 1, fontWeight: 700 }}
      >
        {label.toUpperCase()}
      </Typography>
      <Typography variant="body2" fontWeight={800} sx={{ color: color || 'text.primary', mt: 0.5 }}>
        {value}
      </Typography>
    </Box>
  </Paper>
);
