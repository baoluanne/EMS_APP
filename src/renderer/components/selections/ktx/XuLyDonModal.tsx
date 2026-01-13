import React, { useEffect, useState } from 'react';
import { Stack, Box, Typography, Button, CircularProgress, Alert, Divider } from '@mui/material';
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
import { ControlledTextField } from '@renderer/components/controlled-fields'; // Import mới
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker'; // Import mới

import { DonKtxResponse } from '@renderer/features/ktx-management/don-sinh-vien/type';

const xuLyDonSchema = z.object({
  toaNhaId: z.string().optional(),
  phongId: z.string().optional(),
  giuongId: z.string().optional(),
  ngayBatDauDuyet: z.any().optional(),
  ngayHetHanDuyet: z.any().optional(),
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
      ngayBatDauDuyet: null,
      ngayHetHanDuyet: null,
      ghiChu: '',
      lyDoTuChoi: '',
    },
  });

  const { control, watch, setValue, reset, handleSubmit } = formMethods;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        ngayBatDauDuyet: don.ngayBatDauMongMuon || new Date(),
        ngayHetHanDuyet: don.ngayHetHanMongMuon || null,
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
          alert('Vui lòng nhập đủ ngày bắt đầu và ngày hết hạn');
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
        <Stack spacing={2.5}>
          {/* Section: Thông tin sinh viên */}
          <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight={700} gutterBottom>
              THÔNG TIN SINH VIÊN
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {don.maSinhVien} - {don.hoTenSinhVien}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Giới tính: {don.gioiTinh === 0 ? 'Nam' : 'Nữ'}
            </Typography>
          </Box>

          {/* Section: Thời hạn cư trú */}
          {isVaoOOrGiaHan && (
            <Box>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                THỜI HẠN DUYỆT CƯ TRÚ
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box flex={1}>
                  <ControlledDatePicker
                    control={control}
                    name="ngayBatDauDuyet"
                    label="Ngày bắt đầu"
                  />
                </Box>
                <Box flex={1}>
                  <ControlledDatePicker
                    control={control}
                    name="ngayHetHanDuyet"
                    label="Ngày hết hạn"
                  />
                </Box>
              </Stack>
            </Box>
          )}

          {/* Section: Bố trí chỗ ở */}
          {isVaoOOrChuyenPhong && (
            <Box>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                BỐ TRÍ CHỖ Ở
              </Typography>
              <Stack spacing={2}>
                <ToaNhaSelection control={control} name="toaNhaId" label="Tòa nhà" />
                <Stack direction="row" spacing={2}>
                  <Box flex={1}>
                    <PhongSelection
                      control={control}
                      name="phongId"
                      label="Phòng"
                      disabled={!toaNhaId}
                      toaNhaId={toaNhaId}
                    />
                  </Box>
                  <Box flex={1}>
                    <GiuongSelection
                      control={control}
                      name="giuongId"
                      label="Giường trống"
                      disabled={!phongId}
                      phongId={phongId}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          )}

          {/* Section: Ghi chú duyệt */}
          <ControlledTextField
            control={control}
            name="ghiChu"
            label="Ghi chú duyệt đơn"
            multiline
            rows={2}
            placeholder="Nhập nội dung ghi chú cho sinh viên..."
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          {/* Section: Từ chối đơn */}
          <Box>
            <Typography variant="subtitle2" color="error" fontWeight={700} gutterBottom>
              TỪ CHỐI ĐƠN NÀY
            </Typography>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <Box flex={1}>
                <ControlledTextField
                  control={control}
                  name="lyDoTuChoi"
                  label="Lý do từ chối"
                  placeholder="Nhập lý do không duyệt đơn..."
                  size="small"
                />
              </Box>
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
