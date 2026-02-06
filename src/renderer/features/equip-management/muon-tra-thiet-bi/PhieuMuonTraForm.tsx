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

  // Fetch danh sách sinh viên
  const { data: sinhVienData } = useCrudPagination<any>({
    entity: 'SinhVien',
    endpoint: '',
    enabled: true,
  });

  const listSinhVien = useMemo(() => {
    console.log('SinhVien Data:', sinhVienData);
    // API trả về array trực tiếp, không có .result
    if (Array.isArray(sinhVienData)) {
      return sinhVienData;
    }
    // Fallback nếu có wrapper
    const result = (sinhVienData as any)?.result || (sinhVienData as any)?.data || [];
    console.log('SinhVien Result:', result);
    return result;
  }, [sinhVienData]);

  // Fetch danh sách giảng viên
  const { data: giangVienData } = useCrudPagination<any>({
    entity: 'GiangVien',
    endpoint: '',
    enabled: true,
  });

  const listGiangVien = useMemo(() => {
    console.log('GiangVien Data:', giangVienData);
    // API trả về array trực tiếp, không có .result
    if (Array.isArray(giangVienData)) {
      return giangVienData;
    }
    // Fallback nếu có wrapper
    const result = (giangVienData as any)?.result || (giangVienData as any)?.data || [];
    console.log('GiangVien Result:', result);
    return result;
  }, [giangVienData]);

  // Fetch danh sách thiết bị sẵn sàng (TrangThai = 0: Mới nhập)
  const { data: thietBiData } = useCrudPagination<any>({
    entity: 'ThietBi',
    endpoint: 'pagination?TrangThai=0&pageSize=1000',
    enabled: true,
  });

  const listThietBiSanSang = useMemo(() => {
    console.log('ThietBi Data:', thietBiData);
    // Endpoint pagination thường trả về { result: [...], totalCount: ... }
    if (Array.isArray(thietBiData)) {
      return thietBiData;
    }
    const result = (thietBiData as any)?.result || (thietBiData as any)?.data || [];
    console.log('ThietBi Result:', result);
    return result;
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
              <MenuItem value={0}>Sinh viên</MenuItem>
              <MenuItem value={1}>Giảng viên</MenuItem>
            </ControlledTextField>
          </Grid>

          <Grid size={6}>
            {loaiDoiTuong === 0 ? (
              <ControlledTextField
                label="Chọn Sinh viên"
                control={control}
                name="sinhVienId"
                select
                required
              >
                {listSinhVien.map((sv) => {
                  const hoTen = `${sv.hoDem || ''} ${sv.ten || ''}`.trim();
                  return (
                    <MenuItem key={sv.id} value={sv.id}>
                      {sv.maSinhVien} - {hoTen}
                    </MenuItem>
                  );
                })}
              </ControlledTextField>
            ) : (
              <ControlledTextField
                label="Chọn Giảng viên"
                control={control}
                name="giangVienId"
                select
                required
              >
                {listGiangVien.map((gv) => {
                  const hoTen = `${gv.hoDem || ''} ${gv.ten || ''}`.trim();
                  return (
                    <MenuItem key={gv.id} value={gv.id}>
                      {gv.maGiangVien} - {hoTen}
                    </MenuItem>
                  );
                })}
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
                required
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
