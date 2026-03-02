import { Stack, Grid, Typography, Box, IconButton, MenuItem } from '@mui/material';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import { useMemo } from 'react';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';

export const PhieuMuonTraForm = () => {
  const { control, register } = useFormContext();
  const loaiDoiTuong = useWatch({ control, name: 'loaiDoiTuong' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chiTietPhieuMuons',
  });

  const { data: sinhVienData } = useCrudPagination<any>({
    entity: 'SinhVien',
    enabled: true,
  });

  const listSinhVien = useMemo(() => {
    if (Array.isArray(sinhVienData)) return sinhVienData;
    return (sinhVienData as any)?.result || (sinhVienData as any)?.data || [];
  }, [sinhVienData]);

  const { data: giangVienData } = useCrudPagination<any>({
    entity: 'GiangVien',
    enabled: true,
  });

  const listGiangVien = useMemo(() => {
    if (Array.isArray(giangVienData)) return giangVienData;
    return (giangVienData as any)?.result || (giangVienData as any)?.data || [];
  }, [giangVienData]);

  const { data: thietBiData } = useCrudPagination<any>({
    entity: 'ThietBi',
    defaultState: {
      pageSize: 1000,
      TrangThai: 0,
    },
    enabled: true,
  });

  const listThietBiSanSang = useMemo(() => {
    if (Array.isArray(thietBiData)) return thietBiData;
    return (thietBiData as any)?.result || (thietBiData as any)?.data || [];
  }, [thietBiData]);

  return (
    <Stack spacing={3}>
      <input type="hidden" {...register('id')} />

      <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
          THÔNG TIN MƯỢN
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <ControlledTextField
              label="Loại đối tượng"
              control={control}
              name="loaiDoiTuong"
              select
            >
              <MenuItem value={1}>Sinh viên</MenuItem>
              <MenuItem value={2}>Giảng viên</MenuItem>
            </ControlledTextField>
          </Grid>

          <Grid size={6}>
            {loaiDoiTuong === 1 ? (
              <ControlledTextField
                label="Chọn Sinh viên"
                control={control}
                name="sinhVienId"
                helperText=""
                select
              >
                {listSinhVien.map((sv) => (
                  <MenuItem key={sv.id} value={sv.id}>
                    {sv.maSinhVien} - {`${sv.hoDem || ''} ${sv.ten || ''}`.trim()}
                  </MenuItem>
                ))}
              </ControlledTextField>
            ) : (
              <ControlledTextField
                label="Chọn Giảng viên"
                control={control}
                name="giangVienId"
                select
                helperText=""
              >
                {listGiangVien.map((gv) => (
                  <MenuItem key={gv.id} value={gv.id}>
                    {gv.maGiangVien} - {`${gv.hoDem || ''} ${gv.ten || ''}`.trim()}
                  </MenuItem>
                ))}
              </ControlledTextField>
            )}
          </Grid>

          <Grid size={6}>
            <ControlledDatePicker label="Ngày mượn" control={control} name="ngayMuon" />
          </Grid>
          <Grid size={6}>
            <ControlledDatePicker label="Hạn trả dự kiến" control={control} name="ngayTraDuKien" />
          </Grid>
          <Grid size={12}>
            <ControlledTextField
              label="Lý do mượn"
              control={control}
              name="ghiChu"
              multiline
              minRows={2}
            />
          </Grid>
        </Grid>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="primary">
          DANH SÁCH THIẾT BỊ
        </Typography>
        <IconButton
          color="primary"
          onClick={() => append({ thietBiId: '', tinhTrangKhiMuon: 'Bình thường' })}
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
            <Grid size={6}>
              <ControlledTextField
                label="Chọn thiết bị"
                control={control}
                name={`chiTietPhieuMuons.${index}.thietBiId`}
                select
                helperText=""
              >
                {listThietBiSanSang.map((tb) => (
                  <MenuItem key={tb.id} value={tb.id}>
                    {tb.maThietBi} - {tb.tenThietBi}
                  </MenuItem>
                ))}
              </ControlledTextField>
            </Grid>
            <Grid size={5}>
              <ControlledTextField
                label="Tình trạng"
                control={control}
                name={`chiTietPhieuMuons.${index}.tinhTrangKhiMuon`}
                disabled
              />
            </Grid>
            <Grid size={1}>
              <IconButton color="error" onClick={() => remove(index)} sx={{ mt: 0.5 }}>
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Stack>
  );
};
