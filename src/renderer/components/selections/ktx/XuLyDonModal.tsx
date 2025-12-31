import React, { useEffect, useState } from 'react';
import { Stack, Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import { env } from '@renderer/shared/configs/env.config';
import { TITLE_MODE } from '@renderer/shared/enums';

// Hooks
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';

// Components
import { FormDetailsModal } from '@renderer/components/modals';
import { ToaNhaSelection } from '@renderer/components/selections/ktx/ToaNhaSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { GiuongSelection } from '@renderer/components/selections/ktx/GiuongSelection';

import { DonKtxResponse } from '@renderer/features/ktx-management/don-sinh-vien/type';

const xuLyDonSchema = z.object({
  toaNhaId: z.string().optional(),
  phongId: z.string().optional(),
  giuongId: z.string().optional(),
  ngayBatDauDuyet: z.string().optional(),
  ngayHetHanDuyet: z.string().optional(),
  ghiChu: z.string().optional(),
  lyDoTuChoi: z.string().optional(),
});

interface XuLyDonModalProps {
  open: boolean;
  onClose: () => void;
  don: DonKtxResponse | null;
  onSuccess: () => void;
}

const XuLyDonModal: React.FC<XuLyDonModalProps> = ({ open, onClose, don, onSuccess }) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRejecting, setIsRejecting] = useState(false);

  const { formMethods, isRefetching } = useCrudPaginationModal<any, any>({
    entity: 'don-ktx',
    schema: xuLyDonSchema,
    defaultValues: {
      toaNhaId: '',
      phongId: '',
      giuongId: '',
      ngayBatDauDuyet: '',
      ngayHetHanDuyet: '',
      ghiChu: '',
      lyDoTuChoi: '',
    },
  });

  const { control, watch, setValue, reset, handleSubmit } = formMethods;

  const [toaNhaId, phongId, ngayBatDauDuyet, ngayHetHanDuyet, lyDoTuChoi] = watch([
    'toaNhaId',
    'phongId',
    'ngayBatDauDuyet',
    'ngayHetHanDuyet',
    'lyDoTuChoi',
  ]);

  const isVaoOOrChuyenPhong = don && ['VaoO', 'ChuyenPhong'].includes(don.loaiDon);
  const isVaoOOrGiaHan = don && ['VaoO', 'GiaHanKtx'].includes(don.loaiDon);

  useEffect(() => {
    if (open && don) {
      reset({
        toaNhaId: '',
        phongId: '',
        giuongId: '',
        ngayBatDauDuyet: don.ngayBatDauMongMuon
          ? don.ngayBatDauMongMuon.split('T')[0]
          : new Date().toISOString().split('T')[0],
        ngayHetHanDuyet: don.ngayHetHanMongMuon ? don.ngayHetHanMongMuon.split('T')[0] : '',
        ghiChu: '',
        lyDoTuChoi: '',
      });
      setErrorMessage('');
    }
  }, [open, don, reset]);

  useEffect(() => {
    if (toaNhaId) {
      setValue('phongId', '');
      setValue('giuongId', '');
    }
  }, [toaNhaId, setValue]);

  useEffect(() => {
    if (phongId) setValue('giuongId', '');
  }, [phongId, setValue]);

  const handleDuyet = async (data: any) => {
    try {
      setErrorMessage('');

      if (isVaoOOrChuyenPhong) {
        if (!data.phongId) {
          alert('Vui lòng chọn phòng');
          return;
        }
        if (!data.giuongId) {
          alert('Vui lòng chọn giường');
          return;
        }
      }
      if (isVaoOOrGiaHan) {
        if (!data.ngayBatDauDuyet || !data.ngayHetHanDuyet) {
          alert('Nhập đủ ngày tháng');
          return;
        }
        if (new Date(data.ngayHetHanDuyet) <= new Date(data.ngayBatDauDuyet)) {
          alert('Ngày hết hạn phải sau ngày bắt đầu');
          return;
        }
      }

      let endpoint = '';
      const params = new URLSearchParams();

      switch (don?.loaiDon) {
        case 'VaoO':
          endpoint = `/duyet-vao-o`;
          params.append('phongId', data.phongId);
          params.append('giuongId', data.giuongId);
          params.append('ngayBatDau', data.ngayBatDauDuyet);
          params.append('ngayHetHan', data.ngayHetHanDuyet);
          break;
        case 'ChuyenPhong':
          endpoint = `/duyet-chuyen-phong`;
          params.append('phongMoiId', data.phongId);
          params.append('giuongMoiId', data.giuongId);
          params.append('ngayBatDau', data.ngayBatDauDuyet);
          params.append('ngayHetHan', data.ngayHetHanDuyet);
          break;
        case 'GiaHanKtx':
          endpoint = `/duyet-gia-han`;
          params.append('ngayHetHanMoi', data.ngayHetHanDuyet);
          break;
        case 'RoiKtx':
          endpoint = `/duyet-roi-ktx`;
          break;
      }

      if (data.ghiChu?.trim()) params.append('ghiChuDuyet', data.ghiChu.trim());

      await axios.post(`${env.API_ENDPOINT}/don-ktx/${don?.id}${endpoint}?${params.toString()}`);

      queryClient.invalidateQueries({ queryKey: ['don-ktx'] });
      onSuccess();
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.error || 'Lỗi khi duyệt đơn');
    }
  };

  const handleTuChoi = async () => {
    if (!lyDoTuChoi?.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }
    try {
      setIsRejecting(true);
      await axios.post(`${env.API_ENDPOINT}/don-ktx/${don?.id}/tu-choi`, lyDoTuChoi.trim(), {
        headers: { 'Content-Type': 'application/json' },
      });
      queryClient.invalidateQueries({ queryKey: ['don-ktx'] });
      onSuccess();
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.error || 'Lỗi khi từ chối');
    } finally {
      setIsRejecting(false);
    }
  };

  if (!don) return null;

  return (
    <FormDetailsModal
      title={`Xử lý đơn: ${don.loaiDon}`}
      titleMode={TITLE_MODE.COLORED}
      onClose={onClose}
      onSave={handleSubmit(handleDuyet)}
      saveTitle="Duyệt đơn"
      cancelTitle="Đóng"
      isRefetching={isRefetching}
      maxWidth="sm"
    >
      <FormProvider {...formMethods}>
        <Stack spacing={3}>
          <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Thông tin sinh viên
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {don.maSinhVien} - {don.hoTenSinhVien}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Giới tính: {don.gioiTinh === 0 ? 'Nam' : 'Nữ'}
            </Typography>
          </Box>

          {isVaoOOrGiaHan && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Ngày bắt đầu"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...formMethods.register('ngayBatDauDuyet')}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
              />
              <TextField
                label="Ngày hết hạn"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...formMethods.register('ngayHetHanDuyet')}
                error={
                  !!ngayBatDauDuyet &&
                  !!ngayHetHanDuyet &&
                  new Date(ngayHetHanDuyet) <= new Date(ngayBatDauDuyet)
                }
                helperText={
                  !!ngayBatDauDuyet &&
                  !!ngayHetHanDuyet &&
                  new Date(ngayHetHanDuyet) <= new Date(ngayBatDauDuyet)
                    ? 'Lỗi ngày tháng'
                    : ''
                }
              />
            </Stack>
          )}

          {isVaoOOrChuyenPhong && (
            <>
              <ToaNhaSelection control={control} name="toaNhaId" label="Chọn tòa nhà" />
              <PhongSelection
                control={control}
                name="phongId"
                label="Chọn phòng"
                disabled={!toaNhaId}
                toaNhaId={toaNhaId}
              />
              <GiuongSelection
                control={control}
                name="giuongId"
                label="Giường trống"
                disabled={!phongId}
                phongId={phongId}
              />
            </>
          )}

          <TextField
            label="Ghi chú duyệt"
            fullWidth
            multiline
            rows={2}
            {...formMethods.register('ghiChu')}
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed grey' }}>
            <Typography variant="subtitle2" color="error" gutterBottom>
              Hoặc từ chối đơn này
            </Typography>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <TextField
                label="Lý do từ chối"
                fullWidth
                multiline
                rows={1}
                size="small"
                {...formMethods.register('lyDoTuChoi')}
                placeholder="Nhập lý do..."
              />
              <Button
                variant="outlined"
                color="error"
                onClick={handleTuChoi}
                disabled={isRejecting || !lyDoTuChoi?.trim()}
                sx={{ height: 40, whiteSpace: 'nowrap' }}
              >
                {isRejecting ? <CircularProgress size={20} color="error" /> : 'Từ chối'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </FormProvider>
    </FormDetailsModal>
  );
};

export default XuLyDonModal;
