import { Stack, Grid, Alert, AlertTitle } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { HocKySelection } from '@renderer/components/selections/HocKySelection';
import { DanhMucKhoanThuNgoaiHocPhiSelection } from '@renderer/components/selections/DanhMucKhoanThuNgoaiHocPhiSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { KtxLoaiDon, KtxLoaiDonOptions, KtxDonTrangThaiOptions } from '../configs/KtxDonEnum';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMemo, useEffect, useRef } from 'react';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const DuyetDonForm = () => {
  const { control, register, setValue, getValues } = useFormContext();
  const resetInProgressRef = useRef(false);

  const idSinhVien = useWatch({ control, name: 'idSinhVien' });
  const loaiDon = useWatch({ control, name: 'loaiDon' });
  const phongYeuCauId = useWatch({ control, name: 'phongYeuCauId' });

  const prevIdSinhVien = usePrevious(idSinhVien);
  const prevPhongId = usePrevious(phongYeuCauId);

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

  const { data: bedsData, isRefetching: loadingBeds } = useCrudPagination<any>({
    entity: 'GiuongKtx',
    // Thêm pageSize=1000 vào endpoint để lấy hết giường của phòng
    endpoint: `pagination?PhongId=${encodeURIComponent(phongYeuCauId || '')}&TrangThai=0&pageSize=1000`,
    enabled: !!phongYeuCauId && phongYeuCauId !== '',
  });

  const bedOptions = useMemo(() => {
    const result = (bedsData as any)?.result || [];
    return result.map((b: any) => ({
      value: b.id,
      label: `Giường: ${b.maGiuong}`,
    }));
  }, [bedsData]);

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
    () => (loaiDon !== undefined && loaiDon !== null ? Number(loaiDon) : undefined),
    [loaiDon],
  );

  const isDangKyMoi = loaiDonNum === KtxLoaiDon.DangKyMoi;
  const isGiaHan = loaiDonNum === KtxLoaiDon.GiaHan;
  const isChuyenPhong = loaiDonNum === KtxLoaiDon.ChuyenPhong;
  const isRoiKtx = loaiDonNum === KtxLoaiDon.RoiKtx;

  useEffect(() => {
    if (idSinhVien === prevIdSinhVien) return;
    if (!idSinhVien) return;

    resetInProgressRef.current = true;

    setValue('loaiDon', '', { shouldValidate: false });
    setValue('idHocKy', '', { shouldValidate: false });
    setValue('phongHienTaiId', '', { shouldValidate: false });
    setValue('phongYeuCauId', '', { shouldValidate: false });
    setValue('giuongYeuCauId', '', { shouldValidate: false });
    setValue('idGoiDichVu', '', { shouldValidate: false });
    setValue('trangThai', '', { shouldValidate: false });

    resetInProgressRef.current = false;
  }, [idSinhVien, prevIdSinhVien, setValue]);

  useEffect(() => {
    if (phongYeuCauId === prevPhongId || resetInProgressRef.current) return;

    const currentGiuong = getValues('giuongYeuCauId');
    if (currentGiuong) {
      setValue('giuongYeuCauId', '', { shouldValidate: false });
    }
  }, [phongYeuCauId, prevPhongId, setValue, getValues]);

  useEffect(() => {
    if (resetInProgressRef.current) return;

    const currentValues = getValues();

    if (isRoiKtx && currentValues.idGoiDichVu) {
      setValue('idGoiDichVu', '', { shouldValidate: false });
    }

    if (!isDangKyMoi && !isChuyenPhong) {
      if (currentValues.phongYeuCauId) {
        setValue('phongYeuCauId', '', { shouldValidate: false });
      }
      if (currentValues.giuongYeuCauId) {
        setValue('giuongYeuCauId', '', { shouldValidate: false });
      }
    }
  }, [loaiDonNum, isDangKyMoi, isChuyenPhong, isRoiKtx, setValue, getValues]);

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

        {(isDangKyMoi || isGiaHan || isChuyenPhong) && (
          <Grid size={6}>
            <HocKySelection name="idHocKy" control={control} label="Học kỳ" />
          </Grid>
        )}

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
          <>
            <Grid size={6}>
              <PhongSelection
                name="phongYeuCauId"
                control={control}
                label="Phòng yêu cầu"
                gioiTinh={studentGender}
              />
            </Grid>

            <Grid size={6}>
              <FilterSelect
                name="giuongYeuCauId"
                control={control}
                label={loadingBeds ? 'Đang tải giường...' : 'Giường yêu cầu'}
                options={bedOptions}
                disabled={!phongYeuCauId || loadingBeds}
              />
            </Grid>
          </>
        )}

        {(isDangKyMoi || isGiaHan) && (
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
