import { Stack, Grid, Typography, Box, IconButton, MenuItem } from '@mui/material';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import { useMemo } from 'react';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';

export const PhieuThanhLyForm = () => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chiTietThanhLys',
  });

  // Load danh sách nhân viên để chọn Người lập phiếu
  const { data: userData } = useCrudPagination<any>({
    entity: 'NguoiDung',
    endpoint: '',
    enabled: true,
  });

  const listNguoiDung = useMemo(() => {
    if (Array.isArray(userData)) return userData;
    return (userData as any)?.result || (userData as any)?.data || [];
  }, [userData]);

  // Load danh sách thiết bị HỎNG (TrangThai = 4)
  const { data: thietBiData } = useCrudPagination<any>({
    entity: 'ThietBi',
    endpoint: 'pagination?TrangThai=4&pageSize=1000',
    enabled: true,
  });

  const listThietBiHong = useMemo(() => {
    if (Array.isArray(thietBiData)) return thietBiData;
    return (thietBiData as any)?.result || (thietBiData as any)?.data || [];
  }, [thietBiData]);

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
          THÔNG TIN CHUNG
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <ControlledTextField
              label="Số Quyết Định"
              control={control}
              name="soQuyetDinh"
              required
            />
          </Grid>
          <Grid size={6}>
            <ControlledDatePicker label="Ngày thanh lý" control={control} name="ngayThanhLy" />
          </Grid>
          <Grid size={6}>
            <ControlledTextField
              label="Người lập phiếu"
              control={control}
              name="nguoiLapPhieuId"
              select
              required
            >
              {listNguoiDung.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.hoDem} {user.ten} ({user.userName})
                </MenuItem>
              ))}
            </ControlledTextField>
          </Grid>
          <Grid size={12}>
            <ControlledTextField
              label="Lý do thanh lý"
              control={control}
              name="lyDo"
              multiline
              minRows={2}
            />
          </Grid>
        </Grid>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="primary">
          DANH SÁCH THIẾT BỊ THANH LÝ (CHỈ THIẾT BỊ HỎNG)
        </Typography>
        <IconButton
          color="primary"
          onClick={() => append({ thietBiId: '', giaBan: 0, ghiChu: '' })}
        >
          <AddCircleOutline />
        </IconButton>
      </Stack>

      <Stack spacing={1.5}>
        {fields.map((field, index) => (
          <Grid
            container
            spacing={1}
            key={field.id}
            alignItems="flex-start"
            sx={{ pb: 1, borderBottom: '1px dashed #ccc' }}
          >
            <Grid size={5}>
              <ControlledTextField
                label="Chọn thiết bị hỏng"
                control={control}
                name={`chiTietThanhLys.${index}.thietBiId`}
                select
                required
              >
                {listThietBiHong.length > 0 ? (
                  listThietBiHong.map((tb) => (
                    <MenuItem key={tb.id} value={tb.id}>
                      {tb.maThietBi} - {tb.tenThietBi} (Model: {tb.model})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    <em>Không có thiết bị hỏng nào</em>
                  </MenuItem>
                )}
              </ControlledTextField>
            </Grid>
            <Grid size={3}>
              <ControlledTextField
                label="Giá bán (VNĐ)"
                control={control}
                name={`chiTietThanhLys.${index}.giaBan`}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid size={3}>
              <ControlledTextField
                label="Ghi chú"
                control={control}
                name={`chiTietThanhLys.${index}.ghiChu`}
              />
            </Grid>
            <Grid size={1}>
              <IconButton color="error" onClick={() => remove(index)} sx={{ mt: 0.5 }}>
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        {fields.length === 0 && (
          <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
            Chưa có thiết bị nào được chọn.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
