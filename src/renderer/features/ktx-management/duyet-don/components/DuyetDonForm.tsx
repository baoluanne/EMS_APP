import { Stack, Grid, Alert, AlertTitle } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { HocKySelection } from '@renderer/components/selections/HocKySelection';
import { DanhMucKhoanThuNgoaiHocPhiSelection } from '@renderer/components/selections/DanhMucKhoanThuNgoaiHocPhiSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { KtxLoaiDon, KtxLoaiDonOptions, KtxDonTrangThaiOptions } from '../configs/KtxDonEnum';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMemo, useEffect } from 'react';

export const DuyetDonForm = () => {
  const { control, register, setValue, getValues } = useFormContext();

  const idSinhVien = useWatch({ control, name: 'idSinhVien' });
  const loaiDon = useWatch({ control, name: 'loaiDon' });

  const { data: studentData } = useCrudPagination<any>({
    entity: 'SinhVien',
    endpoint: `tim-kiem-sinh-vien?Id=${idSinhVien}`,
    enabled: !!idSinhVien,
  });

  const selectedStudent = useMemo(() => {
    const result = (studentData as any)?.result;
    return Array.isArray(result) ? result[0] : undefined;
  }, [studentData]);

  const studentGender = useMemo(() => {
    if (!selectedStudent || selectedStudent.id !== idSinhVien) return undefined;
    const val = selectedStudent.gioiTinh ?? selectedStudent.GioiTinh;
    return val !== null && val !== undefined ? Number(val) : undefined;
  }, [selectedStudent, idSinhVien]);

  const { data: stayData } = useCrudPagination<any>({
    entity: 'DonKtx',
    endpoint: `pagination?IdSinhVien=${idSinhVien}&TrangThai=DaDuyet`,
    enabled: !!idSinhVien,
  });

  const isRegistered = useMemo(() => {
    const list = (stayData as any)?.result || [];
    return list.some((don: any) => don.loaiDon !== KtxLoaiDon.RoiKtx);
  }, [stayData]);

  const loaiDonNum = useMemo(
    () => (loaiDon !== undefined ? Number(loaiDon) : undefined),
    [loaiDon],
  );
  const isDangKyMoi = loaiDonNum === KtxLoaiDon.DangKyMoi;
  const isGiaHan = loaiDonNum === KtxLoaiDon.GiaHan;
  const isChuyenPhong = loaiDonNum === KtxLoaiDon.ChuyenPhong;
  const isRoiKtx = loaiDonNum === KtxLoaiDon.RoiKtx;

  useEffect(() => {
    if (loaiDonNum === undefined) return;

    const currentValues = getValues();

    if (isRoiKtx && currentValues.idGoiDichVu !== '') {
      setValue('idGoiDichVu', '');
    }

    if (!isDangKyMoi && !isChuyenPhong && currentValues.phongYeuCauId !== '') {
      setValue('phongYeuCauId', '');
    }
  }, [loaiDonNum, isRoiKtx, isDangKyMoi, isChuyenPhong, setValue, getValues]);

  const alertInfo = useMemo(() => {
    if (!idSinhVien || loaiDon === undefined) return null;
    if (
      !isRegistered &&
      [KtxLoaiDon.GiaHan, KtxLoaiDon.ChuyenPhong, KtxLoaiDon.RoiKtx].includes(loaiDonNum!)
    ) {
      return {
        severity: 'error' as const,
        title: 'Lỗi nghiệp vụ',
        message: 'Sinh viên chưa đăng ký lưu trú.',
      };
    }
    if (isRegistered && isDangKyMoi) {
      return {
        severity: 'warning' as const,
        title: 'Cảnh báo',
        message: 'Sinh viên đang lưu trú, không thể đăng ký mới.',
      };
    }
    return null;
  }, [idSinhVien, loaiDon, isRegistered, loaiDonNum, isDangKyMoi]);

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <input type="hidden" {...register('id')} />

      <Grid container spacing={2}>
        <Grid size={12}>
          <SinhVienSelection name="idSinhVien" control={control} label="Sinh viên" />
        </Grid>

        <Grid size={6}>
          <HocKySelection name="idHocKy" control={control} label="Học kỳ" />
        </Grid>

        <Grid size={6}>
          <FilterSelect
            name="loaiDon"
            control={control}
            label="Loại đơn"
            options={KtxLoaiDonOptions}
          />
        </Grid>

        {!isDangKyMoi && loaiDonNum !== undefined && (
          <Grid size={6}>
            <PhongSelection
              name="phongHienTaiId"
              control={control}
              label="Phòng hiện tại"
              disabled
            />
          </Grid>
        )}

        {(isDangKyMoi || isChuyenPhong) && (
          <Grid size={6}>
            <PhongSelection
              name="phongYeuCauId"
              control={control}
              label="Phòng yêu cầu"
              gioiTinh={studentGender}
            />
          </Grid>
        )}

        {(isDangKyMoi || isGiaHan || isChuyenPhong) && (
          <Grid size={6}>
            <DanhMucKhoanThuNgoaiHocPhiSelection
              name="idGoiDichVu"
              control={control}
              label="Khoản thu"
            />
          </Grid>
        )}

        <Grid size={6}>
          <FilterSelect
            name="trangThai"
            control={control}
            label="Trạng thái"
            options={KtxDonTrangThaiOptions}
          />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker
            name="ngayBatDau"
            control={control}
            label={isRoiKtx ? 'Ngày rời KTX' : 'Ngày bắt đầu ở'}
          />
        </Grid>

        <Grid size={12}>
          <ControlledTextField name="ghiChu" control={control} label="Ghi chú" multiline rows={3} />
        </Grid>

        {alertInfo && (
          <Grid size={12}>
            <Alert severity={alertInfo.severity} variant="filled" sx={{ mt: 1 }}>
              <AlertTitle>{alertInfo.title}</AlertTitle>
              {alertInfo.message}
            </Alert>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};
