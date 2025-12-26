import { useEffect } from 'react';
import { Stack, Grid as Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import { ControlledTextField } from '@renderer/components/controlled-fields';
import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { env } from '@renderer/shared/configs/env.config';

const loaiDonOptions = [
  { value: 'VaoO', label: 'Đăng ký vào ở' },
  { value: 'ChuyenPhong', label: 'Xin chuyển phòng' },
  { value: 'GiaHanKtx', label: 'Gia hạn hợp đồng' },
  { value: 'RoiKtx', label: 'Xin rời KTX' },
];

export const DonSinhVienForm = () => {
  const { control, setValue } = useFormContext();

  const [idSinhVien, loaiDon] = useWatch({
    control,
    name: ['idSinhVien', 'loaiDon'],
  });

  const { data: hopDongHienTai, isLoading: isLoadingHD } = useQuery({
    queryKey: ['hop-dong-hien-tai', idSinhVien],
    queryFn: async () => {
      if (!idSinhVien) return null;
      const res = await axios.get(`${env.API_ENDPOINT}/cu-tru-ktx/hop-dong-hien-tai/${idSinhVien}`);
      return res.data;
    },
    enabled: !!idSinhVien,
    retry: 1,
  });

  useEffect(() => {
    if (hopDongHienTai) {
      if (hopDongHienTai.giuongKtx?.phongKtxId) {
        setValue('phongHienTai', hopDongHienTai.giuongKtx.phongKtxId);
      }
    }
  }, [hopDongHienTai, setValue]);

  const renderDynamicFields = () => {
    if (isLoadingHD)
      return (
        <Grid size={{ xs: 12 }}>
          <CircularProgress size={20} />
        </Grid>
      );

    const dangOKtx = hopDongHienTai && hopDongHienTai.trangThai === 'DangO';

    switch (loaiDon) {
      case 'VaoO':
        if (dangOKtx)
          return (
            <Grid size={{ xs: 12 }}>
              <Alert severity="warning">
                Sinh viên này đang ở KTX. Không thể tạo đơn vào ở mới.
              </Alert>
            </Grid>
          );
        return (
          <>
            <Grid size={{ xs: 6 }}>
              <ControlledDatePicker
                control={control}
                name="ngayBatDau"
                label="Ngày bắt đầu mong muốn"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <ControlledDatePicker
                control={control}
                name="ngayHetHan"
                label="Ngày kết thúc mong muốn (tùy chọn)"
              />
            </Grid>
          </>
        );

      case 'ChuyenPhong':
        if (!dangOKtx)
          return (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">Sinh viên chưa có hợp đồng cư trú để chuyển phòng.</Alert>
            </Grid>
          );
        return (
          <>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1, mb: 2 }}>
                <Typography variant="subtitle2">Đang ở tại:</Typography>
                <Typography variant="body2">
                  {hopDongHienTai.giuongKtx?.phongKtx?.maPhong || 'Đang tải...'} - Giường{' '}
                  {hopDongHienTai.giuongKtx?.maGiuong}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <PhongSelection
                control={control}
                name="phongMuonChuyen"
                label="Chọn phòng muốn chuyển đến"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <ControlledTextField
                control={control}
                name="lyDoChuyen"
                label="Lý do chuyển"
                multiline
                rows={2}
              />
            </Grid>
          </>
        );

      case 'GiaHanKtx':
        if (!dangOKtx)
          return (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">Sinh viên chưa có hợp đồng để gia hạn.</Alert>
            </Grid>
          );
        return (
          <>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1, mb: 2 }}>
                <Typography variant="subtitle2">Hạn hợp đồng hiện tại:</Typography>
                <Typography variant="body2">
                  {dayjs(hopDongHienTai.ngayHetHan).format('DD/MM/YYYY')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <ControlledDatePicker
                control={control}
                name="ngayBatDau"
                label="Ngày bắt đầu gia hạn"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <ControlledDatePicker control={control} name="ngayHetHan" label="Gia hạn đến ngày" />
            </Grid>
          </>
        );

      case 'RoiKtx':
        if (!dangOKtx)
          return (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">Sinh viên không ở KTX nên không thể rời.</Alert>
            </Grid>
          );
        return (
          <Grid size={{ xs: 12 }}>
            <Alert severity="warning">Đơn này sẽ yêu cầu chấm dứt hợp đồng hiện tại.</Alert>
            <Box mt={2}>
              <ControlledDatePicker
                control={control}
                name="ngayBatDau"
                label="Ngày rời đi dự kiến"
              />
            </Box>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SinhVienSelection control={control} name="idSinhVien" label="Sinh viên" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledSelect
            control={control}
            name="loaiDon"
            label="Loại đơn"
            options={loaiDonOptions}
          />
        </Grid>

        {renderDynamicFields()}

        <Grid size={{ xs: 12 }}>
          <ControlledTextField
            control={control}
            name="ghichu"
            label="Ghi chú chung"
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
