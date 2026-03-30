import { Stack, Grid, Typography, Box, IconButton, MenuItem } from '@mui/material';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import { useMemo, useEffect } from 'react';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';

export const PhieuThanhLyForm = () => {
  const { control, register, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chiTietThanhLys',
  });

  const chiTietValues = useWatch({ control, name: 'chiTietThanhLys' });

  useEffect(() => {
    if (Array.isArray(chiTietValues)) {
      const total = chiTietValues.reduce(
        (sum: number, item: any) => sum + (Number(item.giaBan) || 0),
        0,
      );
      setValue('tongTienThuHoi', total);
    }
  }, [chiTietValues, setValue]);

  const listNguoiDung = [
    {
      id: 'e5458128-e329-42d4-b9dc-82ffeb51eb0a',
      hoDem: 'Nguyen',
      ten: 'Admin',
      userName: 'admin_test',
    },
  ];

  useEffect(() => {
    setValue('nguoiLapPhieuId', listNguoiDung[0].id);
  }, [setValue]);

  const { data: thietBiData } = useCrudPagination<any>({
    entity: 'ThietBi',
    defaultState: { pageSize: 2000 },
    enabled: true,
  });

  const listThietBiHong = useMemo(() => {
    const all = Array.isArray(thietBiData) ? thietBiData : (thietBiData as any)?.result || [];
    return all.filter((tb: any) => tb.trangThai === 4 || tb.trangThai === 5);
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
              helperText=""
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
              helperText=""
              select
            >
              {listNguoiDung.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.hoDem} {user.ten} ({user.userName})
                </MenuItem>
              ))}
            </ControlledTextField>
          </Grid>
          <Grid size={6}>
            <ControlledTextField
              label="Tổng tiền thu hồi"
              control={control}
              name="tongTienThuHoi"
              disabled
              type="number"
            />
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
        <Typography variant="subtitle2" color="error">
          DANH SÁCH THIẾT BỊ THANH LÝ
        </Typography>
        <IconButton color="error" onClick={() => append({ thietBiId: '', giaBan: 0, ghiChu: '' })}>
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
                label="Chọn thiết bị"
                control={control}
                name={`chiTietThanhLys.${index}.thietBiId`}
                select
                helperText=""
              >
                {listThietBiHong.length > 0 ? (
                  listThietBiHong.map((tb: any) => (
                    <MenuItem key={tb.id} value={tb.id}>
                      {tb.maThietBi} - {tb.tenThietBi} ({tb.trangThai === 4 ? 'Hỏng' : 'Chờ TL'})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    <em>Không có thiết bị phù hợp</em>
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
