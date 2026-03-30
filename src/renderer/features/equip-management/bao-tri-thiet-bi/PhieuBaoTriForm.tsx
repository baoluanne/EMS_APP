import {
  Stack,
  Grid,
  Typography,
  Box,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  ListItemText,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  IconButton,
  Tooltip,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useWatch, Controller, useFieldArray } from 'react-hook-form';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMemo, useEffect, useState } from 'react';
import { LoaiBaoTriEnum, LoaiBaoTriOptions, TrangThaiPhieuBaoTriEnum, TrangThaiPhieuBaoTriOptions } from '../enums';

// Xóa LOAI_BAO_TRI và TRANG_THAI_PHIEU cục bộ

const MOCK_USERS = [
  { id: 'e5458128-e329-42d4-b9dc-82ffeb51eb0a', hoDem: 'Admin', ten: 'Hệ Thống' },
  { id: '3f33089b-e5af-47f7-a735-925902835743', hoDem: 'Kỹ thuật', ten: 'Viên' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 } },
};

interface Props {
  isAddMode?: boolean;
}

export const PhieuBaoTriForm = ({ isAddMode }: Props) => {
  const { control, setValue } = useFormContext();
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const trangThaiHienTai = useWatch({ control, name: 'trangThai' });
  const loaiBaoTri = useWatch({ control, name: 'loaiBaoTri' });
  const isFinishedOrCancelled =
    trangThaiHienTai === TrangThaiPhieuBaoTriEnum.HoanThanh ||
    trangThaiHienTai === TrangThaiPhieuBaoTriEnum.DaHuy;
  const ngayKetThucHienTai = useWatch({ control, name: 'ngayKetThuc' });

  // ✅ useFieldArray thay vì Controller thông thường
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chiTietThietBis',
  });

  const selectedThietBiIds = fields.map((f: any) => f.thietBiId);

  // Load danh sách thiết bị
  const { data: thietBiData } = useCrudPagination<any>({
    entity: 'ThietBi',
    defaultState: { pageSize: 1000 },
    enabled: true,
  });
  const listThietBi = useMemo(() => {
    const raw = (thietBiData as any)?.data || (thietBiData as any)?.result || [];
    return Array.isArray(raw) ? raw : [];
  }, [thietBiData]);

  // Load danh sách nhà cung cấp
  const { data: nccData } = useCrudPagination<any>({
    entity: 'NhaCungCapThietBi',
    defaultState: { pageSize: 1000 },
    enabled: true,
  });
  const listNCC = useMemo(() => {
    const raw = (nccData as any)?.data || (nccData as any)?.result || [];
    return Array.isArray(raw) ? raw : [];
  }, [nccData]);

  // Lọc thiết bị theo loại bảo trì
  const availableThietBi = useMemo(() => {
    if (loaiBaoTri === LoaiBaoTriEnum.SuaChuaSuCo) return listThietBi.filter((tb: any) => tb.trangThai === 4); // Cần kiểm tra lại value 4 này
    return listThietBi.filter((tb: any) => tb.trangThai !== 3); // Lọc bỏ thanh lý
  }, [listThietBi, loaiBaoTri]);

  // Auto set mã phiếu và người lập khi thêm mới
  useEffect(() => {
    if (isAddMode) {
      const ranStr = Math.random().toString(36).substring(2, 6).toUpperCase();
      setValue('maPhieu', `BT-${ranStr}`);
      setValue('nguoiLapPhieuId', MOCK_USERS[0].id);
    }
  }, [isAddMode, setValue]);

  // Auto set ngày kết thúc khi chuyển sang Hoàn thành
  useEffect(() => {
    if (trangThaiHienTai === TrangThaiPhieuBaoTriEnum.HoanThanh && !ngayKetThucHienTai) {
      setValue('ngayKetThuc', new Date());
    }
  }, [trangThaiHienTai, setValue, ngayKetThucHienTai]);

  // Xử lý chọn/bỏ chọn thiết bị từ dropdown
  const handleThietBiChange = (newIds: string[]) => {
    // Thêm thiết bị mới được chọn
    newIds.forEach((id) => {
      if (!selectedThietBiIds.includes(id)) {
        append({ thietBiId: id, nhaCungCapId: null, tinhTrangSauSua: '', chiPhiRieng: null, ghiChu: '' });
      }
    });
    // Xóa thiết bị bị bỏ chọn (duyệt ngược để không lệch index)
    [...selectedThietBiIds].reverse().forEach((id, revIdx) => {
      const idx = selectedThietBiIds.length - 1 - revIdx;
      if (!newIds.includes(id)) remove(idx);
    });
  };

  const toggleExpand = (idx: number) =>
    setExpandedRows((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      {/* Stepper trạng thái */}
      <Box sx={{ width: '100%', mb: 1 }}>
        <Stepper
          activeStep={
            trangThaiHienTai === TrangThaiPhieuBaoTriEnum.DaHuy ? -1 : trangThaiHienTai
          }
          alternativeLabel
          sx={{
            '& .MuiStepIcon-root.Mui-active': { color: 'warning.main' },
            '& .MuiStepIcon-root.Mui-completed': { color: 'success.main' },
          }}
        >
          {TrangThaiPhieuBaoTriOptions.filter((t) => t.value !== TrangThaiPhieuBaoTriEnum.DaHuy).map(
            (label) => (
              <Step key={label.value}>
                <StepLabel>{label.label}</StepLabel>
              </Step>
            )
          )}
        </Stepper>
      </Box>

      {isFinishedOrCancelled && !isAddMode && (
        <Alert
          severity={trangThaiHienTai === TrangThaiPhieuBaoTriEnum.HoanThanh ? 'success' : 'error'}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          Phiếu này đã{' '}
          <strong>
            {trangThaiHienTai === TrangThaiPhieuBaoTriEnum.HoanThanh ? 'HOÀN THÀNH' : 'BỊ HỦY'}
          </strong>
          . Nội dung đã khóa để lưu trữ.
        </Alert>
      )}

      {/* ── BLOCK 1: Thông tin phiếu ── */}
      <Box sx={{ p: 2.5, border: '1px solid #e2e8f0', borderRadius: 3, bgcolor: '#fff' }}>
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ mb: 2.5, textTransform: 'uppercase', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box sx={{ width: 4, height: 16, bgcolor: 'primary.main', borderRadius: 1 }} />
          Thông tin phiếu
        </Typography>

        {fields.length > 0 && (
          <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
            Đang chọn <strong>{fields.length}</strong> thiết bị để bảo trì đồng loạt.
          </Alert>
        )}

        <Grid container spacing={2.5}>
          <Grid size={6}>
            <ControlledTextField label="Mã phiếu" control={control} name="maPhieu" disabled />
          </Grid>
          <Grid size={6}>
            <ControlledTextField
              label="Trạng thái xử lý"
              control={control}
              name="trangThai"
              select
              disabled={isFinishedOrCancelled && !isAddMode}
            >
              {TrangThaiPhieuBaoTriOptions.map((tt) => (
                <MenuItem key={tt.value} value={tt.value}>
                  {tt.label}
                </MenuItem>
              ))}
            </ControlledTextField>
          </Grid>

          <Grid size={6}>
            <ControlledTextField
              label="Loại bảo trì"
              control={control}
              name="loaiBaoTri"
              select
              disabled={isFinishedOrCancelled}
            >
              {LoaiBaoTriOptions.map((loai) => (
                <MenuItem key={loai.value} value={loai.value}>
                  {loai.label}
                </MenuItem>
              ))}
            </ControlledTextField>
          </Grid>

          <Grid size={6}>
            <ControlledTextField
              label="Người lập phiếu"
              control={control}
              name="nguoiLapPhieuId"
              select
              disabled={!isAddMode}
            >
              {MOCK_USERS.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.hoDem} {u.ten}</MenuItem>
              ))}
            </ControlledTextField>
          </Grid>

          {/* ✅ Dropdown chọn nhiều thiết bị */}
          <Grid size={12}>
            <FormControl fullWidth size="small" disabled={!isAddMode}>
              <InputLabel>Chọn danh sách thiết bị cần bảo trì</InputLabel>
              <Select
                multiple
                value={selectedThietBiIds}
                input={<OutlinedInput label="Chọn danh sách thiết bị cần bảo trì" />}
                onChange={(e) => handleThietBiChange(e.target.value as string[])}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const tb = listThietBi.find((t: any) => t.id === id);
                      return (
                        <Chip
                          key={id}
                          label={tb ? tb.maThietBi : id}
                          size="small"
                          sx={{ fontWeight: 700 }}
                        />
                      );
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {availableThietBi.map((tb: any) => (
                  <MenuItem key={tb.id} value={tb.id}>
                    <Checkbox checked={selectedThietBiIds.includes(tb.id)} />
                    <ListItemText
                      primary={`${tb.maThietBi} - ${tb.tenThietBi}`}
                      secondary={loaiBaoTri === 1 ? 'Tình trạng: Hỏng' : undefined}
                    />
                  </MenuItem>
                ))}
                {availableThietBi.length === 0 && (
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      {loaiBaoTri === 1 ? 'Không có thiết bị nào đang hỏng' : 'Không tìm thấy thiết bị'}
                    </Typography>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* ✅ Bảng chi tiết từng thiết bị — NhaCungCap riêng cho mỗi thiết bị */}
          {fields.length > 0 && (
            <Grid size={12}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>
                Chi tiết từng thiết bị:
              </Typography>
              <Stack spacing={1}>
                {fields.map((field: any, index: number) => {
                  const tb = listThietBi.find((t: any) => t.id === field.thietBiId);
                  const isExpanded = expandedRows[index] ?? false;

                  return (
                    <Box
                      key={field.id}
                      sx={{
                        border: '1px solid #e2e8f0',
                        borderRadius: 2,
                        bgcolor: '#fafafa',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Header hàng */}
                      <Box
                        sx={{
                          px: 2, py: 1,
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          cursor: 'pointer', bgcolor: '#f1f5f9',
                          '&:hover': { bgcolor: '#e8eef5' },
                        }}
                        onClick={() => toggleExpand(index)}
                      >
                        <Typography variant="body2" fontWeight={700}>
                          📦 {tb ? `${tb.maThietBi} — ${tb.tenThietBi}` : field.thietBiId}
                        </Typography>
                        <Tooltip title={isExpanded ? 'Thu gọn' : 'Mở chi tiết'}>
                          <IconButton size="small">
                            {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Chi tiết mở rộng */}
                      <Collapse in={isExpanded}>
                        <Box sx={{ p: 2 }}>
                          <Grid container spacing={1.5}>
                            {/* ✅ NhaCungCap riêng cho từng thiết bị */}
                            <Grid size={12}>
                              <ControlledTextField
                                label="Nhà cung cấp / Đơn vị sửa chữa"
                                control={control}
                                name={`chiTietThietBis.${index}.nhaCungCapId`}
                                select
                                size="small"
                                disabled={isFinishedOrCancelled}
                              >
                                <MenuItem value="">— Không có —</MenuItem>
                                {listNCC.map((ncc: any) => (
                                  <MenuItem key={ncc.id} value={ncc.id}>{ncc.tenNhaCungCap}</MenuItem>
                                ))}
                              </ControlledTextField>
                            </Grid>
                            <Grid size={6}>
                              <ControlledTextField
                                label="Tình trạng sau sửa"
                                control={control}
                                name={`chiTietThietBis.${index}.tinhTrangSauSua`}
                                size="small"
                                disabled={isFinishedOrCancelled}
                              />
                            </Grid>
                            <Grid size={6}>
                              <ControlledTextField
                                label="Chi phí riêng (VNĐ)"
                                control={control}
                                name={`chiTietThietBis.${index}.chiPhiRieng`}
                                type="number"
                                size="small"
                                disabled={isFinishedOrCancelled}
                              />
                            </Grid>
                            <Grid size={12}>
                              <ControlledTextField
                                label="Ghi chú thiết bị này"
                                control={control}
                                name={`chiTietThietBis.${index}.ghiChu`}
                                size="small"
                                multiline
                                minRows={2}
                                disabled={isFinishedOrCancelled}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </Box>
                  );
                })}
              </Stack>
            </Grid>
          )}

          <Grid size={12}>
            <ControlledTextField
              label="Nội dung / Lý do bảo trì"
              control={control}
              name="noiDungBaoTri"
              multiline
              minRows={2}
              disabled={isFinishedOrCancelled}
            />
          </Grid>
        </Grid>
      </Box>

      {/* ── BLOCK 2: Kết quả & Chi phí ── */}
      <Box
        sx={{
          p: 2.5,
          border: '1px solid #e2e8f0',
          borderRadius: 3,
          bgcolor: trangThaiHienTai === 1 ? '#fffbeb' : trangThaiHienTai === 2 ? '#f0fdf4' : '#fff',
          transition: 'all 0.3s',
        }}
      >
        <Typography
          variant="subtitle2"
          color={trangThaiHienTai === 2 ? 'success.main' : 'warning.main'}
          sx={{ mb: 2.5, textTransform: 'uppercase', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box
            sx={{ width: 4, height: 16, bgcolor: trangThaiHienTai === 2 ? 'success.main' : 'warning.main', borderRadius: 1 }}
          />
          Kết quả xử lý & Chi phí
        </Typography>
        <Grid container spacing={2.5}>
          <Grid size={6}>
            <ControlledDatePicker label="Ngày bắt đầu sửa" control={control} name="ngayBatDau" disabled={isFinishedOrCancelled} />
          </Grid>
          <Grid size={6}>
            <ControlledDatePicker label="Ngày hoàn thành" control={control} name="ngayKetThuc" disabled={isFinishedOrCancelled} />
          </Grid>
          <Grid size={6}>
            <ControlledTextField
              label="Người thực hiện (Thợ/Kỹ thuật)"
              control={control}
              name="nguoiXuLyId"
              select
              disabled={isFinishedOrCancelled}
            >
              {MOCK_USERS.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.hoDem} {u.ten}</MenuItem>
              ))}
            </ControlledTextField>
          </Grid>
          <Grid size={6}>
            <ControlledTextField
              label="Tổng chi phí (VNĐ)"
              control={control}
              name="chiPhi"
              type="number"
              disabled={isFinishedOrCancelled}
            />
          </Grid>
          <Grid size={12}>
            <ControlledTextField
              label="Chi tiết công việc đã thực hiện"
              control={control}
              name="ketQuaXuLy"
              multiline
              minRows={2}
              disabled={isFinishedOrCancelled}
              placeholder="Ghi chú chi tiết kết quả sau khi bảo trì..."
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};