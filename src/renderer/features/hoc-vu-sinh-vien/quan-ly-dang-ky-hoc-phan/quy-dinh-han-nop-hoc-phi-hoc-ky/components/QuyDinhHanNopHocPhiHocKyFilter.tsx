import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  HocKySelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';

interface Props {
  onApply: (filters: any) => void;
}

export const QuyDinhHanNopHocPhiHocKyFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<any>({
    defaultValues: {
      idDot: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
    },
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset({
      idDot: '',
      idKhoaHoc: '',
      idBacDaoTao: '',
      idLoaiDaoTao: '',
    });
  };
  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={2} columnSpacing={4}>
        <Grid size={3}>
          <HocKySelection control={control} name="idDot" label="Đợt" required />
        </Grid>
        <Grid size={3}>
          <KhoaHocSelection control={control} name="idKhoaHoc" />
        </Grid>
        <Grid size={3}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={3}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
