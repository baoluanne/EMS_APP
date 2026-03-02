import { useMemo, useEffect, useState } from 'react';
import {
  Stack,
  Grid,
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
} from '@mui/material';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { DeleteOutline, PlaylistAdd } from '@mui/icons-material';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';

const TRANG_THAI_OPTIONS = [
  { value: 0, label: 'Mới nhập', color: 'info' },
  { value: 1, label: 'Đang sử dụng', color: 'success' },
  { value: 2, label: 'Đang bảo trì', color: 'warning' },
  { value: 3, label: 'Đang mượn', color: 'secondary' },
  { value: 4, label: 'Hỏng', color: 'error' },
  { value: 5, label: 'Chờ thanh lý', color: 'default' },
  { value: 6, label: 'Đã thanh lý', color: 'default' },
  { value: 7, label: 'Mất', color: 'error' },
];

const LOAI_PHONG = {
  PHONG_HOC: 'PHONG_HOC',
  PHONG_KTX: 'PHONG_KTX',
};

interface Props {
  readOnly?: boolean;
}

export const KiemKeTaiSanForm = ({ readOnly = false }: Props) => {
  const { control, register, setValue } = useFormContext();
  const [loaiPhong, setLoaiPhong] = useState(LOAI_PHONG.PHONG_HOC);

  const { fields, replace, remove } = useFieldArray({
    control,
    name: 'chiTietKiemKes',
  });

  const selectedPhongId = useWatch({ control, name: 'phongId' });
  const chiTietValues = useWatch({ control, name: 'chiTietKiemKes' });

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

  // 1. Gọi API Lấy Phòng Học (Sửa entity và endpoint cho chuẩn)
  const { data: phongHocData } = useCrudPagination<any>({
    entity: 'DotKiemKe',
    endpoint: 'active-phong-hoc',
    defaultState: { pageSize: 1000 },
    enabled: true,
  });

  // 2. Gọi API Lấy Phòng KTX
  const { data: phongKtxData } = useCrudPagination<any>({
    entity: 'DotKiemKe',
    endpoint: 'active-phong-ktx',
    defaultState: { pageSize: 1000 },
    enabled: true,
  });

  const listPhongHoc = useMemo(() => {
    // FIX: Thêm check .data vì API thường trả về { data: [...] } hoặc { result: [...] }
    if (Array.isArray(phongHocData)) return phongHocData;
    return (phongHocData as any)?.data || (phongHocData as any)?.result || [];
  }, [phongHocData]);

  const listPhongKtx = useMemo(() => {
    if (Array.isArray(phongKtxData)) return phongKtxData;
    return (phongKtxData as any)?.data || (phongKtxData as any)?.result || [];
  }, [phongKtxData]);

  const listPhongDisplay = loaiPhong === LOAI_PHONG.PHONG_HOC ? listPhongHoc : listPhongKtx;

  // 3. API lấy Thiết bị
  const { data: thietBiData, mergeParams } = useCrudPagination<any>({
    entity: 'ThietBi',
    defaultState: { pageSize: 1000 },
    enabled: !!selectedPhongId,
  });

  useEffect(() => {
    if (selectedPhongId) {
      if (loaiPhong === LOAI_PHONG.PHONG_HOC) {
        mergeParams({ PhongHocId: selectedPhongId, PhongKtxId: null });
      } else {
        mergeParams({ PhongKtxId: selectedPhongId, PhongHocId: null });
      }
    }
  }, [selectedPhongId, loaiPhong, mergeParams]);

  const handleLoadThietBi = () => {
    // FIX: Tương tự, thêm check .data cho thiết bị
    const rawData = thietBiData as any;
    const listThietBi = Array.isArray(rawData) ? rawData : rawData?.data || rawData?.result || [];

    if (listThietBi.length === 0) return;

    const newItems = listThietBi.map((tb: any) => ({
      thietBiId: tb.id,
      maThietBi: tb.maThietBi,
      tenThietBi: tb.tenThietBi,
      trangThaiSoSach: tb.trangThai,
      trangThaiThucTe: tb.trangThai,
      khopDot: true,
      ghiChu: '',
    }));

    replace(newItems);
  };

  const handleLoaiPhongChange = (e: any) => {
    setLoaiPhong(e.target.value);
    setValue('phongId', '');
  };

  return (
    <Stack spacing={2}>
      <input type="hidden" {...register('id')} />

      <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
          THÔNG TIN ĐỢT KIỂM KÊ
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <ControlledTextField
              label="Tên đợt kiểm kê"
              control={control}
              name="tenDotKiemKe"
              helperText=""
              size="small"
              disabled={readOnly}
            />
          </Grid>
          <Grid size={4}>
            <ControlledDatePicker
              label="Ngày bắt đầu"
              control={control}
              name="ngayBatDau"
              disabled={readOnly}
            />
          </Grid>
          <Grid size={4}>
            <ControlledDatePicker
              label="Ngày kết thúc"
              control={control}
              name="ngayKetThuc"
              disabled={readOnly}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="daHoanThanh"
              control={control}
              render={({ field }) => (
                <Box display="flex" alignItems="center" height="100%">
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    size="small"
                    disabled={readOnly}
                  />
                  <Typography variant="body2">Đã hoàn thành</Typography>
                </Box>
              )}
            />
          </Grid>
          <Grid size={12}>
            <ControlledTextField
              label="Ghi chú chung"
              control={control}
              name="ghiChu"
              multiline
              minRows={1}
              size="small"
              disabled={readOnly}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="primary">
            DANH SÁCH TÀI SẢN
          </Typography>

          <Box display="flex" gap={1}>
            <TextField
              select
              label="Loại phòng"
              value={loaiPhong}
              onChange={handleLoaiPhongChange}
              size="small"
              sx={{ width: 140 }}
              disabled={readOnly}
            >
              <MenuItem value={LOAI_PHONG.PHONG_HOC}>Phòng học</MenuItem>
              <MenuItem value={LOAI_PHONG.PHONG_KTX}>Ký túc xá</MenuItem>
            </TextField>

            <ControlledTextField
              name="phongId"
              control={control}
              label={
                loaiPhong === LOAI_PHONG.PHONG_HOC ? 'Phòng có thiết bị' : 'Phòng KTX có thiết bị'
              }
              select
              sx={{ width: 220 }}
              size="small"
              disabled={readOnly}
            >
              {listPhongDisplay.length > 0 ? (
                listPhongDisplay.map((p: any) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.tenPhong}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>Không có phòng nào</em>
                </MenuItem>
              )}
            </ControlledTextField>

            {!readOnly && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<PlaylistAdd />}
                onClick={handleLoadThietBi}
                disabled={!selectedPhongId}
              >
                Tải DS
              </Button>
            )}
          </Box>
        </Stack>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ maxHeight: 400, overflowY: 'auto' }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: 100, bgcolor: '#f5f5f5' }}>
                  Mã TB
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 150, bgcolor: '#f5f5f5' }}>
                  Tên TB
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: 140, bgcolor: '#f5f5f5' }}>
                  TT Sổ Sách
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: 150, bgcolor: '#f5f5f5' }}>
                  TT Thực Tế
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', width: 60, bgcolor: '#f5f5f5' }}
                  align="center"
                >
                  Khớp
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 120, bgcolor: '#f5f5f5' }}>
                  Ghi chú
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: 50, bgcolor: '#f5f5f5' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => {
                const statusSoSach = TRANG_THAI_OPTIONS.find(
                  (x) => x.value === (field as any).trangThaiSoSach,
                );
                const isMatch = chiTietValues?.[index]?.khopDot;

                return (
                  <TableRow key={field.id} hover>
                    <TableCell>
                      <input type="hidden" {...register(`chiTietKiemKes.${index}.thietBiId`)} />
                      <input type="hidden" {...register(`chiTietKiemKes.${index}.maThietBi`)} />
                      <input type="hidden" {...register(`chiTietKiemKes.${index}.tenThietBi`)} />
                      <input
                        type="hidden"
                        {...register(`chiTietKiemKes.${index}.trangThaiSoSach`)}
                      />

                      <Typography variant="caption" fontWeight="bold">
                        {(field as any).maThietBi}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" noWrap sx={{ maxWidth: 150, display: 'block' }}>
                        {(field as any).tenThietBi}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusSoSach?.label || 'N/A'}
                        color={(statusSoSach?.color as any) || 'default'}
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
                        variant="standard"
                        sx={{ '& .MuiInputBase-root': { fontSize: '0.8rem' } }}
                        disabled={readOnly}
                      >
                        {TRANG_THAI_OPTIONS.map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
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
                        placeholder="..."
                        variant="standard"
                        sx={{ '& .MuiInputBase-root': { fontSize: '0.8rem' } }}
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
              {fields.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Vui lòng chọn Loại phòng & Phòng để tải danh sách
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};
