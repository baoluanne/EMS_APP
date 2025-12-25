import { Grid, Typography } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useDisclosure } from '@renderer/shared/hooks';
import { UseFormReturn } from 'react-hook-form';
import { SearchButton } from '@renderer/features/common';
import { TimKiemSinhVienModal } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import { SinhVien } from '@renderer/shared/types';
import { useState } from 'react';
import { TRANG_THAI_SV_MAP } from '@renderer/shared/constants';
import {
  defaultSVFiltersValues,
  QuyetDinhSelectionPlus,
  SinhVienMienMonHocFilter,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/ds-sinh-vien-mien-mon-hoc';

type Props = {
  onApplyFilter: (filters: SinhVienMienMonHocFilter) => void;
  filterMethods: UseFormReturn<SinhVienMienMonHocFilter>;
};

export const NhapSinhVienMienMonHocFilters = ({ onApplyFilter, filterMethods }: Props) => {
  const [trangThaiSV, SetThaiThaiSV] = useState<string | undefined>('');
  const { isOpen, close, open } = useDisclosure();
  const { control, setValue } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultSVFiltersValues);
    SetThaiThaiSV('');
  };

  const handleSVSelected = (sinhVien: SinhVien) => {
    const data: SinhVienMienMonHocFilter = {
      id: '',
      idSinhVien: sinhVien.id,
      maSinhVien: sinhVien.maSinhVien,
      hoDem: sinhVien.hoDem,
      ten: sinhVien.ten,
      // Thông tin Chương trình khung/Lớp học (Nếu SinhVien có các FK này)
      idCoSo: sinhVien.idCoSo ?? null,
      idKhoaHoc: sinhVien.idKhoaHoc ?? null,
      idBacDaoTao: sinhVien.idBacDaoTao ?? null,
      idLoaiDaoTao: sinhVien.idLoaiDaoTao ?? null,
      idNganh: sinhVien.idNganh ?? null,
      idChuyenNganh: sinhVien.idChuyenNganh ?? null,
      idLopHoc: sinhVien.idLopHoc ?? null,

      trangThai: sinhVien.trangThai?.toString() ?? null,
      startNgayTao: null,
      endNgayTao: null,
    };
    filterMethods.reset(data);

    if (sinhVien.trangThai?.toString()) {
      const trangThai = TRANG_THAI_SV_MAP[sinhVien.trangThai?.toString()] ?? '';
      SetThaiThaiSV(trangThai);
    }
    onApplyFilter(data);
  };
  return (
    <>
      {isOpen && <TimKiemSinhVienModal onSelect={handleSVSelected} onClose={close} />}
      <FilterDrawerBottom onClear={handleClear} methods={filterMethods} hideButtons>
        <Grid container spacing={0.5}>
          <Grid size={3}>
            <Grid container>
              <ControlledTextField
                control={control}
                name="maSinhVien"
                label="Mã sinh viên"
                required
                disabled
              />
              <SearchButton onClick={open} />
            </Grid>
          </Grid>
          <Grid size={2}>
            <ControlledTextField control={control} name="hoDem" label="Họ" disabled />
          </Grid>
          <Grid size={2}>
            <ControlledTextField control={control} name="ten" label="Tên" disabled />
          </Grid>
          <Grid size={2}>
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
          <Grid size={3}>
            <QuyetDinhSelectionPlus control={control} name="idQuyetDinh" setValue={setValue} />
          </Grid>
        </Grid>
      </FilterDrawerBottom>
    </>
  );
};
