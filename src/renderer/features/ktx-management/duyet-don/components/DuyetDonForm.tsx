import { Stack, Grid, Alert, AlertTitle } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledTextField, ControlledDatePicker } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { HocKySelection } from '@renderer/components/selections/HocKySelection';
import { DanhMucKhoanThuNgoaiHocPhiSelection } from '@renderer/components/selections/DanhMucKhoanThuNgoaiHocPhiSelection';
import { PhongSelection } from '@renderer/components/selections/ktx/PhongSelection';
import { KtxLoaiDonOptions, KtxDonTrangThaiOptions } from '../configs/KtxDonEnum';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useMemo, useEffect } from 'react';

export const DuyetDonForm = () => {
  const { control, register, setValue } = useFormContext();

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

  useEffect(() => {
    setValue('phongYeuCauId', '');
    setValue('phongHienTaiId', '');
    setValue('phongDuocDuyetId', '');
    setValue('giuongDuocDuyetId', '');
    if (studentGender === 0) {
      setValue('gioiTinhDisplay', 'Nam');
    } else if (studentGender === 1) {
      setValue('gioiTinhDisplay', 'Nữ');
    } else {
      setValue('gioiTinhDisplay', '');
    }
  }, [studentGender, setValue]);

  const { data: stayData } = useCrudPagination<any>({
    entity: 'DonKtx',
    endpoint: `pagination?IdSinhVien=${idSinhVien}&TrangThai=DaDuyet`,
    enabled: !!idSinhVien,
  });

  const isRegistered = useMemo(() => {
    const list = (stayData as any)?.result || [];
    return list.some((don: any) => don.loaiDon !== 3);
  }, [stayData]);

  const alertInfo = useMemo(() => {
    if (!idSinhVien || loaiDon === undefined) return null;
    const loaiDonNum = Number(loaiDon);

    if (!isRegistered && [1, 2, 3].includes(loaiDonNum)) {
      return {
        severity: 'error' as const,
        title: 'Lỗi nghiệp vụ',
        message: 'Sinh viên chưa đăng ký lưu trú, không thể thực hiện thao tác này.',
      };
    }
    if (isRegistered && loaiDonNum === 0) {
      return {
        severity: 'warning' as const,
        title: 'Cảnh báo',
        message: 'Sinh viên đang đăng ký lưu trú, không thể đăng ký mới.',
      };
    }
    return null;
  }, [idSinhVien, loaiDon, isRegistered]);

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <input type="hidden" {...register('id')} />

      <Grid container spacing={2}>
        <Grid size={8}>
          <SinhVienSelection name="idSinhVien" control={control} label="Sinh viên" />
        </Grid>

        <Grid size={4}>
          <ControlledTextField
            name="gioiTinhDisplay"
            control={control}
            label="Giới tính"
            disabled
          />
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

        {Number(loaiDon) === 2 && (
          <Grid size={6}>
            <PhongSelection
              name="phongHienTaiId"
              control={control}
              label="Phòng hiện tại"
              disabled
            />
          </Grid>
        )}

        {(Number(loaiDon) === 0 || Number(loaiDon) === 2) && (
          <Grid size={6}>
            <PhongSelection
              name="phongYeuCauId"
              control={control}
              label="Phòng yêu cầu"
              gioiTinh={studentGender}
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
          <DanhMucKhoanThuNgoaiHocPhiSelection name="idGoiDichVu" control={control} />
        </Grid>

        <Grid size={6}>
          <ControlledDatePicker name="ngayBatDau" control={control} label="Ngày bắt đầu" />
        </Grid>
        <Grid size={6}>
          <ControlledDatePicker name="ngayHetHan" control={control} label="Ngày hết hạn" />
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
