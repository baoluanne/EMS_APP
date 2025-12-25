import { Stack, Typography, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useDisclosure } from '@renderer/shared/hooks';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import {
  defaultTiepNhanHoSoSVState,
  ThongTinSinhVienHoSoType,
} from '@renderer/features/hoc-vu-sinh-vien/tiep-nhan-ho-so-sv';
import {
  BacDaoTaoSelection,
  GioiTinhSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  NganhSelection,
} from '@renderer/components/selections';
import { SearchButton } from '@renderer/features/common';
import { useState } from 'react';
import { TRANG_THAI_SV_MAP } from '@renderer/shared/constants';
import ImageBox from '@renderer/features/common/ImageBox';
import { SinhVien } from '@renderer/shared/types';

interface Props {
  onApply: (values: any) => void;
  methods: UseFormReturn<ThongTinSinhVienHoSoType>;
  isRefetching?: boolean;
}
export default function TiepNhanHoSoSVThongTinSinhVienForm({
  onApply,
  methods,
  isRefetching,
}: Props) {
  const [trangThaiSV, SetThaiThaiSV] = useState<string | undefined>('');
  const { control, reset } = methods;
  const { isOpen, toggle } = useDisclosure();
  const [anhSinhVienUrl, SetAnhSinhVien] = useState<string>('');
  const handleClear = () => {
    reset(defaultTiepNhanHoSoSVState);
    onApply(defaultTiepNhanHoSoSVState);
    SetThaiThaiSV('');
  };

  const handleSVSelected = (sinhVien: SinhVien) => {
    const sinhVienState = {
      ...sinhVien,
      idSinhVien: sinhVien.id,
      lopHoc: sinhVien.lopHoc?.tenLop,
      hoTen: sinhVien.hoDem + ' ' + sinhVien.ten,
      ngaySinh: sinhVien.ngaySinh ? new Date(sinhVien.ngaySinh).toLocaleDateString('vi-VN') : '',
      anhSinhVienUrl: sinhVien.anhSinhVienUrl ?? sinhVien.hinhTheSinhVienUrl ?? '',
    };
    reset(sinhVienState as ThongTinSinhVienHoSoType);
    if (sinhVien.trangThai?.toString()) {
      const trangThai = TRANG_THAI_SV_MAP[sinhVien.trangThai?.toString()] ?? '';
      SetThaiThaiSV(trangThai);
    }
    SetAnhSinhVien(sinhVien.anhSinhVienUrl ?? sinhVien.hinhTheSinhVienUrl ?? '');
  };
  return (
    <FilterDrawerBottom<ThongTinSinhVienHoSoType>
      onClear={handleClear}
      title="Thông tin sinh viên"
      onApply={onApply}
      methods={methods}
      isRefetching={isRefetching}
    >
      <Grid container spacing={2}>
        <Grid size={10}>
          <Stack spacing={2}>
            <Grid container spacing={1}>
              <Grid size={6}>
                <Grid container>
                  <ControlledTextField
                    control={control}
                    name="maSinhVien"
                    label="Mã sinh viên"
                    required
                    disabled
                  />
                  <SearchButton onClick={toggle} />
                  {isOpen && <TimKiemSinhVienModal onSelect={handleSVSelected} onClose={toggle} />}
                  {trangThaiSV && (
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      color="primary"
                      sx={{ whiteSpace: 'nowrap', ml: 1.5, mt: 0.5 }}
                    >
                      {trangThaiSV}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid size={6}>
                <ControlledTextField control={control} name="hoTen" label="Họ tên" disabled />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid size={3}>
                <ControlledTextField control={control} name="ngaySinh" label="Ngày sinh" disabled />
              </Grid>
              <Grid size={3}>
                <GioiTinhSelection control={control} name="gioiTinh" disabled />
              </Grid>
              <Grid size={6}>
                <ControlledTextField control={control} name="lopHoc" label="Lớp học" disabled />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid size={6}>
                <KhoaHocSelection control={control} name="idKhoaHoc" disabled />
              </Grid>
              <Grid size={6}>
                <NganhSelection control={control} name="idNganh" disabled />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid size={6}>
                <BacDaoTaoSelection control={control} name="idBacDaoTao" disabled />
              </Grid>
              <Grid size={6}>
                <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" disabled />
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid size={2}>
          <ImageBox src={anhSinhVienUrl} alt="Ảnh sinh viên" placeholder="Ảnh thẻ SV" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
}
