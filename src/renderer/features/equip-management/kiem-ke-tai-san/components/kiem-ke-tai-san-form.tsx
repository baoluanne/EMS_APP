import { useMemo, useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  Box,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Checkbox,
  TableContainer,
  Paper,
  TextField,
  IconButton,
  Grid,
  CircularProgress,
} from '@mui/material';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { DeleteOutline, PlaylistAdd } from '@mui/icons-material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { toast } from 'react-toastify';
import React from 'react';
import { TrangThaiThietBiEnum, TrangThaiThietBiOptions } from '../../enums';

// Xóa TRANG_THAI_OPTIONS cũ

const LOAI_KHU_VUC = {
  HOC: 'HOC',
  KTX: 'KTX',
};

interface Props {
  readOnly?: boolean;
}

export const KiemKeTaiSanForm = ({ readOnly = false }: Props) => {
  const { control, register, setValue } = useFormContext();
  const [loaiKhuVuc, setLoaiKhuVuc] = useState(LOAI_KHU_VUC.HOC);

  const { fields, replace, remove } = useFieldArray({
    control,
    name: 'chiTietKiemKes',
  });

  const selectedToaNhaId = useWatch({ control, name: 'toaNhaId' });
  const chiTietValues = useWatch({ control, name: 'chiTietKiemKes' });

  // 1. Hook lấy danh sách Dãy Nhà / Tòa Nhà (Dùng sẵn base pagination)
  const { data: buildingsData, isRefetching: loadingBuildings } = useCrudPagination<any>({
    entity: loaiKhuVuc === LOAI_KHU_VUC.HOC ? 'DayNha' : 'ToaNhaKtx',
    endpoint: 'pagination?pageSize=1000',
    enabled: true,
  });

  const listBuildings = useMemo(() => {
    const raw = (buildingsData as any)?.data || (buildingsData as any)?.result || [];
    return Array.isArray(raw) ? raw : [];
  }, [buildingsData]);

  // 2. Hook lấy danh sách Thiết Bị (Sử dụng API chuẩn của ThietBi)
  const {
    data: thietBiData,
    isRefetching: loadingThietBi,
    mergeParams,
  } = useCrudPagination<any>({
    entity: 'ThietBi',
    defaultState: { pageSize: 2000 }, // Kéo page size to để lấy gọn trong 1 lần
    enabled: !!selectedToaNhaId,
  });

  // Tự động merge params khi chọn tòa nhà
  useEffect(() => {
    if (selectedToaNhaId) {
      if (loaiKhuVuc === LOAI_KHU_VUC.HOC) {
        mergeParams({ DayNhaId: selectedToaNhaId, ToaNhaKtxId: undefined });
      } else {
        mergeParams({ ToaNhaKtxId: selectedToaNhaId, DayNhaId: undefined });
      }
    }
  }, [selectedToaNhaId, loaiKhuVuc, mergeParams]);

  // Hàm đổ data thiết bị vào Form
  const handleLoadThietBi = () => {
    const rawData = thietBiData as any;
    const listThietBi = Array.isArray(rawData) ? rawData : rawData?.data || rawData?.result || [];

    if (listThietBi.length === 0) {
      toast.info('Khu vực này hiện không có thiết bị nào!');
      return;
    }

    const newItems = listThietBi.map((tb: any) => ({
      thietBiId: tb.id,
      maThietBi: tb.maThietBi,
      tenThietBi: tb.tenThietBi,
      tenLoaiThietBi: tb.loaiThietBi?.tenLoai || 'Chưa phân loại',
      tenPhong: tb.phongHoc?.tenPhong || tb.phongKtx?.maPhong || 'Kho',
      trangThaiSoSach: tb.trangThai,
      trangThaiThucTe: tb.trangThai,
      khopDot: true,
      ghiChu: '',
    }));

    replace(newItems);
    toast.success(`Đã tải ${newItems.length} thiết bị vào danh sách.`);
  };

  // Tự động check khớp trạng thái
  useEffect(() => {
    if (chiTietValues) {
      chiTietValues.forEach((item: any, index: number) => {
        const isMatch = Number(item.trangThaiSoSach) === Number(item.trangThaiThucTe);
        if (item.khopDot !== isMatch) {
          setValue(`chiTietKiemKes.${index}.khopDot`, isMatch);
        }
      });
    }
  }, [chiTietValues, setValue]);

  const handleLoaiKhuVucChange = (e: any) => {
    setLoaiKhuVuc(e.target.value);
    setValue('toaNhaId', '');
  };

  // 3. Gom nhóm dữ liệu theo Loại Thiết Bị để hiển thị đẹp mắt
  const groupedFields = useMemo(() => {
    const groups: Record<string, { name: string; count: number; items: any[] }> = {};

    fields.forEach((field: any, index: number) => {
      const loai = field.tenLoaiThietBi || 'Chưa phân loại';
      if (!groups[loai]) {
        groups[loai] = { name: loai, count: 0, items: [] };
      }
      groups[loai].items.push({ field, originalIndex: index });
      groups[loai].count += 1;
    });

    return groups;
  }, [fields, chiTietValues]);

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      {/* THÔNG TIN CHUNG */}
      <Box sx={{ p: 2.5, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
        <Typography variant="subtitle2" color="primary" fontWeight={700} sx={{ mb: 2 }}>
          THÔNG TIN ĐỢT KIỂM KÊ
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              label="Tên đợt kiểm kê"
              control={control}
              name="tenDotKiemKe"
              disabled={readOnly}
              helperText=""
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <ControlledDatePicker
              label="Ngày bắt đầu"
              control={control}
              name="ngayBatDau"
              disabled={readOnly}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <ControlledDatePicker
              label="Ngày kết thúc"
              control={control}
              name="ngayKetThuc"
              disabled={readOnly}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Controller
              name="daHoanThanh"
              control={control}
              render={({ field }) => (
                <Box
                  display="flex"
                  alignItems="center"
                  height="100%"
                  sx={{ bgcolor: 'white', px: 1, borderRadius: 1, border: '1px solid #e2e8f0' }}
                >
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    size="small"
                    disabled={readOnly}
                    color="success"
                  />
                  <Typography
                    variant="body2"
                    fontWeight={field.value ? 700 : 400}
                    color={field.value ? 'success.main' : 'text.primary'}
                  >
                    Chốt hoàn thành
                  </Typography>
                </Box>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              label="Ghi chú chung"
              control={control}
              name="ghiChu"
              multiline
              minRows={2}
              disabled={readOnly}
            />
          </Grid>
        </Grid>
      </Box>

      {/* DANH SÁCH THIẾT BỊ THEO TÒA NHÀ */}
      <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', bgcolor: 'white' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" color="primary" fontWeight={700}>
              TÀI SẢN THEO TÒA NHÀ ({fields.length})
            </Typography>
          </Stack>
          <Box display="flex" gap={1.5}>
            <TextField
              select
              value={loaiKhuVuc}
              onChange={handleLoaiKhuVucChange}
              size="small"
              sx={{ width: 140 }}
              disabled={readOnly}
            >
              <MenuItem value={LOAI_KHU_VUC.HOC}>Giảng Đường</MenuItem>
              <MenuItem value={LOAI_KHU_VUC.KTX}>Ký túc xá</MenuItem>
            </TextField>

            <Box position="relative">
              <ControlledTextField
                name="toaNhaId"
                control={control}
                select
                sx={{ width: 220 }}
                size="small"
                disabled={readOnly || loadingBuildings}
              >
                {listBuildings.length > 0 ? (
                  listBuildings.map((p: any) => (
                    <MenuItem key={p.id} value={p.id}>
                      {loaiKhuVuc === LOAI_KHU_VUC.HOC ? p.tenDayNha : p.tenToaNha}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    <em>Không có dữ liệu</em>
                  </MenuItem>
                )}
              </ControlledTextField>
              {loadingBuildings && (
                <CircularProgress size={18} sx={{ position: 'absolute', right: 30, top: 10 }} />
              )}
            </Box>

            {!readOnly && (
              <Button
                variant="contained"
                size="small"
                startIcon={
                  loadingThietBi ? <CircularProgress size={16} color="inherit" /> : <PlaylistAdd />
                }
                onClick={handleLoadThietBi}
                disabled={!selectedToaNhaId || loadingThietBi}
              >
                Tải Danh sách
              </Button>
            )}
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ maxHeight: 500, overflowY: 'auto', borderRadius: 0 }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, width: 100, bgcolor: '#f1f5f9' }}>
                  Mã TB
                </TableCell>
                <TableCell sx={{ fontWeight: 700, minWidth: 150, bgcolor: '#f1f5f9' }}>
                  Tên TB
                </TableCell>
                <TableCell sx={{ fontWeight: 700, width: 100, bgcolor: '#f1f5f9' }}>
                  Phòng
                </TableCell>
                <TableCell sx={{ fontWeight: 700, width: 130, bgcolor: '#f1f5f9' }}>
                  TT Sổ Sách
                </TableCell>
                <TableCell sx={{ fontWeight: 700, width: 140, bgcolor: '#f1f5f9' }}>
                  TT Thực Tế
                </TableCell>
                <TableCell sx={{ fontWeight: 700, width: 60, bgcolor: '#f1f5f9' }} align="center">
                  Khớp
                </TableCell>
                <TableCell sx={{ fontWeight: 700, minWidth: 120, bgcolor: '#f1f5f9' }}>
                  Ghi chú
                </TableCell>
                <TableCell sx={{ bgcolor: '#f1f5f9', width: 40 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groupedFields).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Vui lòng chọn Tòa nhà và bấm Tải DS để bắt đầu kiểm kê.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                Object.values(groupedFields).map((group) => (
                  <React.Fragment key={group.name}>
                    <TableRow sx={{ bgcolor: '#e0e7ff' }}>
                      <TableCell colSpan={8} sx={{ py: 1.5 }}>
                        <Typography variant="body2" fontWeight={700} color="primary.dark">
                          📁 Loại: {group.name} —{' '}
                          <Box component="span" color="error.main">
                            Số lượng: {group.count}
                          </Box>
                        </Typography>
                      </TableCell>
                    </TableRow>

                    {group.items.map(({ field, originalIndex: index }) => {
                      const statusSoSach = TrangThaiThietBiOptions.find(
                        (x) => x.value === field.trangThaiSoSach,
                      );
                      const isMatch = chiTietValues?.[index]?.khopDot;

                      return (
                        <TableRow
                          key={field.id}
                          hover
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>
                            <input
                              type="hidden"
                              {...register(`chiTietKiemKes.${index}.thietBiId`)}
                            />
                            <input
                              type="hidden"
                              {...register(`chiTietKiemKes.${index}.maThietBi`)}
                            />
                            <input
                              type="hidden"
                              {...register(`chiTietKiemKes.${index}.tenThietBi`)}
                            />
                            <input
                              type="hidden"
                              {...register(`chiTietKiemKes.${index}.tenLoaiThietBi`)}
                            />
                            <input
                              type="hidden"
                              {...register(`chiTietKiemKes.${index}.tenPhong`)}
                            />
                            <input
                              type="hidden"
                              {...register(`chiTietKiemKes.${index}.trangThaiSoSach`)}
                            />
                            <Typography variant="caption" fontWeight="bold">
                              {field.maThietBi}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="caption"
                              noWrap
                              sx={{ maxWidth: 150, display: 'block' }}
                            >
                              {field.tenThietBi}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={field.tenPhong || 'N/A'}
                              size="small"
                              sx={{ fontSize: '0.65rem', height: 20 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={statusSoSach?.label || 'N/A'}
                              color={
                                field.trangThaiSoSach === TrangThaiThietBiEnum.DangSuDung
                                  ? 'success'
                                  : field.trangThaiSoSach === TrangThaiThietBiEnum.CanBaoTri
                                    ? 'warning'
                                    : field.trangThaiSoSach === TrangThaiThietBiEnum.Mat ||
                                        field.trangThaiSoSach === TrangThaiThietBiEnum.ThanhLy
                                      ? 'error'
                                      : 'info'
                              }
                              size="small"
                              variant="outlined"
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                          </TableCell>
                          <TableCell>
                            <ControlledTextField
                              control={control}
                              name={`chiTietKiemKes.${index}.trangThaiThucTe`}
                              select
                              size="small"
                              variant="outlined"
                              sx={{ '& .MuiInputBase-root': { fontSize: '0.75rem', height: 30 } }}
                              disabled={readOnly}
                            >
                              {TrangThaiThietBiOptions.map((opt) => (
                                <MenuItem
                                  key={opt.value}
                                  value={opt.value}
                                  sx={{ fontSize: '0.8rem' }}
                                >
                                  {opt.label}
                                </MenuItem>
                              ))}
                            </ControlledTextField>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              color={isMatch ? 'success.main' : 'error.main'}
                              fontWeight="bold"
                              fontSize="1rem"
                            >
                              {isMatch ? '✓' : '✕'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <ControlledTextField
                              control={control}
                              name={`chiTietKiemKes.${index}.ghiChu`}
                              size="small"
                              placeholder="Ghi chú..."
                              variant="standard"
                              sx={{ '& .MuiInputBase-root': { fontSize: '0.75rem' } }}
                              disabled={readOnly}
                            />
                          </TableCell>
                          <TableCell>
                            {!readOnly && (
                              <IconButton size="small" color="error" onClick={() => remove(index)}>
                                <DeleteOutline fontSize="small" />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};
