import { Grid, Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { HocKySelection, TrangThaiDangKySelection } from '@renderer/components/selections';
import { LopHocPhanSelection } from '@renderer/components/selections/TimLopHocPhan';
import { useForm } from 'react-hook-form';

interface Props {
  onApply: (filters: any) => void;
}

export const HuyLopHocPhanFilter = ({ onApply }: Props) => {
  const filterMethods = useForm<any>({
    defaultValues: {},
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset({});
  };
  return (
    <FilterDrawerBottom onApply={onApply} onClear={handleClear} methods={filterMethods}>
      <Grid container rowSpacing={2} columnSpacing={4}>
        <Grid size={3}>
          <HocKySelection control={control} name="idDot" label="Đợt" />
        </Grid>
        <Grid size={6}>
          <Stack direction="row">
            <LopHocPhanSelection control={control} name="idLopHocPhan" required />
            <ControlledTextField control={control} name="idLopHocPhan" required />
          </Stack>
        </Grid>
        <Grid size={3}>
          <TrangThaiDangKySelection control={control} name="idTrangThai" />
        </Grid>
      </Grid>
    </FilterDrawerBottom>
  );
};
