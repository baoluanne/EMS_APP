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
} from '@mui/material';
import { Close, Hotel, Home } from '@mui/icons-material';

interface BedListDrawerProps {
  phong: any;
  onClose: () => void;
  onStudentClick: (student: any) => void;
}

export const BedListDrawer = ({ phong, onClose, onStudentClick }: BedListDrawerProps) => {
  const occupiedBeds = phong?.giuongs?.filter((g: any) => g.trangThai === 1).length || 0;
  const emptyBeds = (phong?.soLuongGiuong || 0) - occupiedBeds;

  return (
    <Drawer anchor="right" open={!!phong} onClose={onClose}>
      <Box sx={{ width: 1200, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
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
              <Typography variant="caption" color="text.secondary">
                {phong?.loaiPhong} | {phong?.tang?.tenTang}
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            p: 2,
            bgcolor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            gap: 2,
          }}
        >
          <Paper
            variant="outlined"
            sx={{ flex: 1, p: 1.5, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#fff' }}
          >
            <Home sx={{ color: 'primary.main' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Tổng
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {phong?.soLuongGiuong || 0}
              </Typography>
            </Box>
          </Paper>

          <Paper
            variant="outlined"
            sx={{ flex: 1, p: 1.5, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#fff' }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Đang ở
              </Typography>
              <Typography variant="body2" fontWeight={700} color="error.main">
                {occupiedBeds}
              </Typography>
            </Box>
          </Paper>

          <Paper
            variant="outlined"
            sx={{ flex: 1, p: 1.5, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#fff' }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Trống
              </Typography>
              <Typography variant="body2" fontWeight={700} color="success.main">
                {emptyBeds}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: 'auto', bgcolor: '#f8fafc' }}>
          <TableContainer sx={{ bgcolor: '#fff' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: '120px',
                      borderRight: '1px solid #e2e8f0',
                      bgcolor: '#f1f5f9',
                    }}
                  >
                    Giường
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: '80px',
                      borderRight: '1px solid #e2e8f0',
                      bgcolor: '#f1f5f9',
                      textAlign: 'center',
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: '150px',
                      borderRight: '1px solid #e2e8f0',
                      bgcolor: '#f1f5f9',
                    }}
                  >
                    Sinh viên
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: '100px',
                      borderRight: '1px solid #e2e8f0',
                      bgcolor: '#f1f5f9',
                    }}
                  >
                    MSSV
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: '100px',
                      borderRight: '1px solid #e2e8f0',
                      bgcolor: '#f1f5f9',
                    }}
                  >
                    SĐT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: '200px',
                      borderRight: '1px solid #e2e8f0',
                      bgcolor: '#f1f5f9',
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: '90px',
                      borderRight: '1px solid #e2e8f0',
                      bgcolor: '#f1f5f9',
                      textAlign: 'center',
                    }}
                  >
                    Giới tính
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      bgcolor: '#f1f5f9',
                    }}
                  >
                    Địa chỉ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phong?.giuongs?.map((giuong: any) => {
                  const sv = giuong.sinhVien;
                  return (
                    <TableRow
                      key={giuong.id}
                      sx={{
                        '&:hover': { bgcolor: '#f9fafb' },
                        '& td': {
                          borderRight: '1px solid #f0f0f0',
                          borderBottom: '1px solid #f0f0f0',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, fontSize: '13px' }}>
                        <b>{giuong.maGiuong}</b>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={giuong.trangThai === 1 ? 'Đã ở' : 'Trống'}
                          color={giuong.trangThai === 1 ? 'error' : 'success'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {!sv ? (
                          <Typography variant="caption" color="text.disabled">
                            (Trống)
                          </Typography>
                        ) : (
                          <Link
                            component="button"
                            variant="body2"
                            onClick={() => onStudentClick(giuong)}
                            sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                          >
                            {sv.fullName}
                          </Link>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontSize: '12px' }}>
                          {sv?.maSinhVien || '---'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontSize: '12px' }}>
                          {sv?.soDienThoai || '---'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={sv?.email || 'N/A'}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              fontSize: '12px',
                            }}
                          >
                            {sv?.email || '---'}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        {sv ? (
                          <Chip
                            label={sv.gioiTinh === 0 ? 'Nam' : sv.gioiTinh === 1 ? 'Nữ' : '---'}
                            size="small"
                            color={
                              sv.gioiTinh === 1 ? 'info' : sv.gioiTinh === 0 ? 'error' : 'default'
                            }
                            variant="outlined"
                          />
                        ) : (
                          <Typography variant="caption" sx={{ fontSize: '12px' }}>
                            ---
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={sv?.diaChiLienLac || 'N/A'}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              fontSize: '12px',
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
