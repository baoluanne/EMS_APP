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
    endpoint: `pagination?IdSinhVien=${idSinhVien}&TrangThai=DaDuyet&pageSize=1000`,
    enabled: !!idSinhVien,
  });

  const historyStatus = useMemo(() => {
    const list = (stayData as any)?.result || [];
    if (list.length === 0) return { isCurrent: false, isOut: false };

    const sortedByDate = [...list].sort(
      (a: any, b: any) => new Date(b.ngayTao || 0).getTime() - new Date(a.ngayTao || 0).getTime(),
    );

    const latestOrder = sortedByDate[0];
    const isCurrentlyOut = latestOrder.loaiDon === KtxLoaiDon.RoiKtx;

    const lastActiveHocKy = sortedByDate.find((d) => d.hocKy?.tenDot || d.hocKy?.tenHocKy);

    return {
      isCurrent: !isCurrentlyOut,
      isOut: isCurrentlyOut,
      lastHocKy: lastActiveHocKy?.hocKy?.tenDot || lastActiveHocKy?.hocKy?.tenHocKy || 'N/A',
    };
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
    if (idSinhVien === prevIdSinhVien || !idSinhVien) return;
    resetInProgressRef.current = true;
    const fields = [
      'loaiDon',
      'idHocKy',
      'phongHienTaiId',
      'phongYeuCauId',
      'giuongYeuCauId',
      'idGoiDichVu',
      'trangThai',
    ];
    fields.forEach((f) => setValue(f, '', { shouldValidate: false }));
    resetInProgressRef.current = false;
  }, [idSinhVien, prevIdSinhVien, setValue]);

  useEffect(() => {
    if (phongYeuCauId === prevPhongId || resetInProgressRef.current) return;
    if (getValues('giuongYeuCauId')) setValue('giuongYeuCauId', '', { shouldValidate: false });
  }, [phongYeuCauId, prevPhongId, setValue, getValues]);

  useEffect(() => {
    if (resetInProgressRef.current) return;
    const vals = getValues();
    if (isRoiKtx && vals.idGoiDichVu) setValue('idGoiDichVu', '', { shouldValidate: false });
    if (!isDangKyMoi && !isChuyenPhong) {
      if (vals.phongYeuCauId) setValue('phongYeuCauId', '', { shouldValidate: false });
      if (vals.giuongYeuCauId) setValue('giuongYeuCauId', '', { shouldValidate: false });
    }
  }, [loaiDonNum, isDangKyMoi, isChuyenPhong, isRoiKtx, setValue, getValues]);

  const alertInfo = useMemo(() => {
    if (!idSinhVien || loaiDon === undefined) return null;

    if (historyStatus.isCurrent && isDangKyMoi) {
      return {
        severity: 'warning' as const,
        title: 'Sinh viên đang lưu trú',
        message: 'Hệ thống ghi nhận sinh viên này vẫn đang ở KTX. Không thể tạo đơn đăng ký mới.',
      };
    }

    if (historyStatus.isOut && isDangKyMoi) {
      return {
        severity: 'info' as const,
        title: 'Sinh viên quay lại KTX',
        message: `Sinh viên từng ở KTX (Rời đi từ học kỳ: ${historyStatus.lastHocKy}). Bạn có thể tiếp tục duyệt đơn đăng ký mới này.`,
      };
    }

    if (!historyStatus.isCurrent && !isDangKyMoi) {
      return {
        severity: 'error' as const,
        title: 'Lỗi nghiệp vụ',
        message: 'Sinh viên không ở KTX, không thể thực hiện Gia hạn/Chuyển phòng/Rời KTX.',
      };
    }

    return null;
  }, [idSinhVien, loaiDon, historyStatus, loaiDonNum, isDangKyMoi]);

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
