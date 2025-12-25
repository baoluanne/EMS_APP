import { Grid } from '@mui/material';
import { FilterDrawerBottom } from '@renderer/components/modals';
import {
  BacDaoTaoSelection,
  BangDiemTotNghiepSelection,
  BangTotNghiepSelection,
  LoaiDaoTaoSelection,
  KhoiKienThucSelection,
} from '@renderer/components/selections';
import { useForm } from 'react-hook-form';
import { thoiGianDaoTaoRadios } from '../configs/filter.config';

type Filters = {
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  bangTotNghiep_NamId?: string;
  bangDiemTN_NamId?: string;
  thoiGianDaoTao?: string;
  idKhoiNganh?: string;
  hanCheDKHP?: string;
};

type Props = {
  onApply: (filters: Filters) => void;
};

export const ThoiGianDaoTaoFilter = ({ onApply }: Props) => {
  const methods = useForm<Filters>({
    defaultValues: {
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      bangTotNghiep_NamId: '',
      bangDiemTN_NamId: '',
      thoiGianDaoTao: thoiGianDaoTaoRadios[0]?.value.toString(),
      idKhoiNganh: '',
      hanCheDKHP: '',
    },
  });
  const { control, reset } = methods;
  const handleClear = () => {
    reset({
      idBacDaoTao: '',
      idLoaiDaoTao: '',
      bangTotNghiep_NamId: '',
      bangDiemTN_NamId: '',
      thoiGianDaoTao: thoiGianDaoTaoRadios[0]?.value.toString(),
      idKhoiNganh: '',
      hanCheDKHP: '',
    });
  };
  return (
    <FilterDrawerBottom<Filters> methods={methods} onApply={onApply} onClear={handleClear}>
      <Grid container rowSpacing={1} columnSpacing={4} alignItems="center">
        <Grid size={3}>
          <BacDaoTaoSelection control={control} name="idBacDaoTao" />
        </Grid>
        <Grid size={3}>
          <LoaiDaoTaoSelection control={control} name="idLoaiDaoTao" />
        </Grid>
        <Grid size={3}>
          <BangTotNghiepSelection control={control} name="bangTotNghiep_NamId" />
        </Grid>
        <Grid size={3}>
          <BangDiemTotNghiepSelection control={control} name="bangDiemTN_NamId" />
        </Grid>
        <Grid size={3}>
          <KhoiKienThucSelection control={control} name="idKhoiNganh" />
        </Grid>
        {/* <Grid size={12}>
          <ControlledRadioGroup
            control={control}
            name="thoiGianDaoTao"
            options={thoiGianDaoTaoRadios}
            row
          />
        </Grid> */}
      </Grid>
    </FilterDrawerBottom>
  );
};
