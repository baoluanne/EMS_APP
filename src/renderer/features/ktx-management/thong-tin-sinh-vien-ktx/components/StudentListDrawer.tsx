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
import { useState, useRef, useEffect, useMemo } from 'react';

interface BedListDrawerProps {
  phong: any;
  onClose: () => void;
  onStudentClick: (student: any) => void;
}

export const BedListDrawer = ({ phong, onClose, onStudentClick }: BedListDrawerProps) => {
  const MIN_WIDTH = 800;
  const MAX_WIDTH = 1600;

  const [drawerWidth, setDrawerWidth] = useState(1200);
  const isResizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const maxAllowedWidth =
    typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.95, MAX_WIDTH) : MAX_WIDTH;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = drawerWidth;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    const delta = startXRef.current - e.clientX;
    let newWidth = startWidthRef.current + delta;

    if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
    if (newWidth > maxAllowedWidth) newWidth = maxAllowedWidth;

    setDrawerWidth(newWidth);
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Deduplicate giuongs bằng maGiuong (unique identifier thực tế của giường trong phòng)
  const uniqueGiuongs = useMemo(() => {
    if (!phong?.giuongs || phong.giuongs.length === 0) return [];

    const map = new Map<string, any>();
    phong.giuongs.forEach((g: any) => {
      // Ưu tiên giữ lại giường có sinh viên (trangThai === 1) nếu có duplicate
      if (!map.has(g.maGiuong)) {
        map.set(g.maGiuong, g);
      } else {
        const existing = map.get(g.maGiuong);
        if (g.trangThai === 1 && existing.trangThai !== 1) {
          map.set(g.maGiuong, g);
        }
      }
    });
    return Array.from(map.values()).sort((a: any, b: any) => a.maGiuong.localeCompare(b.maGiuong));
  }, [phong?.giuongs]);

  const occupiedBeds = uniqueGiuongs.filter((g: any) => g.trangThai === 1).length;
  const emptyBeds = (phong?.soLuongGiuong || 0) - occupiedBeds;

  const isNarrow = drawerWidth < 1000;

  const handleExportExcel = () => {
    if (!uniqueGiuongs.length) return;

    const exportData = uniqueGiuongs.map((g: any) => ({
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
  useEffect(() => {
    if (phong) {
      console.log('Phong data:', phong);
      console.log('soLuongGiuong:', phong.soLuongGiuong);
      console.log('giuongs length:', phong?.giuongs?.length);
      console.log('giuongs unique ids:', [...new Set(phong?.giuongs?.map((g) => g.id))].length);
      console.log(
        'giuongs unique maGiuong:',
        [...new Set(phong?.giuongs?.map((g) => g.maGiuong))].length,
      );
    }
  }, [phong]);
  return (
    <Drawer
      anchor="right"
      open={!!phong}
      onClose={onClose}
      PaperProps={{ sx: { width: `${drawerWidth}px`, borderLeft: 'none', maxWidth: '95vw' } }}
    >
      <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '12px',
            cursor: 'col-resize',
            backgroundColor: 'transparent',
            zIndex: 1300,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
          onMouseDown={handleMouseDown}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2px',
              height: '80px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '1px',
            }}
          />
        </Box>

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
                disabled={!uniqueGiuongs.length}
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
              <Table stickyHeader size={isNarrow ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        minWidth: 120,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Giường
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        textAlign: 'center',
                        minWidth: 100,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Trạng thái
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        minWidth: 180,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Sinh viên
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        minWidth: 120,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      MSSV
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        minWidth: 130,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Số điện thoại
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        minWidth: 220,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        textAlign: 'center',
                        minWidth: 100,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Giới tính
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        bgcolor: '#f1f5f9',
                        minWidth: 250,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Địa chỉ liên lạc
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uniqueGiuongs.map((giuong: any) => {
                    const sv = giuong.sinhVien;
                    return (
                      <TableRow key={giuong.maGiuong} sx={{ '&:hover': { bgcolor: '#f8f9fa' } }}>
                        <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {giuong.maGiuong}
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
                            <Typography variant="caption" color="text.disabled" fontStyle="italic">
                              (Trống)
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: isNarrow ? '12px' : '13px', whiteSpace: 'nowrap' }}
                        >
                          {sv?.maSinhVien || '---'}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: isNarrow ? '12px' : '13px', whiteSpace: 'nowrap' }}
                        >
                          {sv?.soDienThoai || '---'}
                        </TableCell>
                        <TableCell>
                          <Tooltip title={sv?.email || ''}>
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                maxWidth: { xs: 150, md: 200 },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: isNarrow ? '12px' : '13px',
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
                                maxWidth: { xs: 200, md: 300 },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: isNarrow ? '12px' : '13px',
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
