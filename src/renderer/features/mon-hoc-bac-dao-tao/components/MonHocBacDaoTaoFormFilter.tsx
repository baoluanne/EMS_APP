import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  HinhThucThiSelection,
  KhoaSelection,
  KhoiKienThucSelection,
  LoaiHinhGiangDaySelection,
  LoaiMonHocSelection,
  MonHocSelection,
  TinhChatMonHocSelection,
  ToBoMonSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { MonHocBacDaoTaoFilter } from '../types';

type Props = {
  onApply: (filters: MonHocBacDaoTaoFilter) => void;
  onClear: () => void;
};
const defaultValuesFilter: MonHocBacDaoTaoFilter = {
  idBacDaoTao: '',
  idKhoa: '',
  idToBoMon: '',
  idLoaiMonHoc: '',
  idTinhChatMonHoc: '',
  idKhoiKienThuc: '',
  idHinhThucThi: '',
  idLoaiHinhGiangDay: '',
  idMonHoc: '',
};
export const MonHocBacDaoTaoFormFilter = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<MonHocBacDaoTaoFilter>({ defaultValues: defaultValuesFilter });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultValuesFilter);
    onClear();
  };
  return (
    <FilterDrawerBottom<MonHocBacDaoTaoFilter>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
        <Grid size={3}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={3}>
          <KhoaSelection control={control} name="idKhoa" />
        </Grid>
        <Grid size={3}>
          <ToBoMonSelection control={control} name="idToBoMon" />
        </Grid>
        <Grid size={3}>
          <LoaiMonHocSelection control={control} name="idLoaiMonHoc" />
        </Grid>
        <Grid size={3}>
          <TinhChatMonHocSelection control={control} name="idTinhChatMonHoc" />
        </Grid>
        <Grid size={3}>
          <KhoiKienThucSelection control={control} name="idKhoiKienThuc" />
        </Grid>
        <Grid size={3}>
          <HinhThucThiSelection control={control} name="idHinhThucThi" />
        </Grid>
        <Grid size={3}>
          <LoaiHinhGiangDaySelection control={control} name="idLoaiHinhGiangDay" />
        </Grid>
        <Grid size={3}>
          <MonHocSelection control={control} name="idMonHoc" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
