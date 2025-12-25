import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  KhoaSelection,
  KhoiKienThucSelection,
  LoaiMonHocSelection,
  LocTheoToBoMonSelection,
  TinhChatMonHocSelection,
  ToBoMonSelection,
} from '@renderer/components/selections';
import { MonHocFilterForm } from '../types';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm } from 'react-hook-form';

type Props = {
  onApply: (filters: MonHocFilterForm) => void;
  onClear: () => void;
};
const defaultValuesFilter = {
  tenMonHoc: undefined,
  maTuQuan: undefined,
  idLoaiMonHoc: undefined,
  idKhoa: undefined,
  idToBoMon: undefined,
  idLoaiTiet: undefined,
  idKhoiKienThuc: undefined,
  idTinhChatMonHoc: undefined,
  locTheoToBoMon: undefined,
};
export const MonHocFormFilter = ({ onApply, onClear }: Props) => {
  const filterMethods = useForm<MonHocFilterForm>({ defaultValues: defaultValuesFilter });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset(defaultValuesFilter);
    onClear();
  };
  return (
    <FilterDrawerBottom<MonHocFilterForm>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <Grid container spacing={2}>
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
          <ControlledTextField control={control} name="tenMonHoc" label="Môn học" />
        </Grid>
        <Grid size={3}>
          <ControlledTextField control={control} name="maTuQuan" label="Mã tự quản" />
        </Grid>
        <Grid size={3}>
          <LocTheoToBoMonSelection control={control} name="locTheoToBoMon" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
