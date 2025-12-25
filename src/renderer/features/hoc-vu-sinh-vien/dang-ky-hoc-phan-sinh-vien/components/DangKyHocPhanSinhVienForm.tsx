import { Search } from '@mui/icons-material';
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { DotDangKySelection } from '@renderer/components/selections/DotDangKySelection';
import { DataGridTable } from '@renderer/components/Table';
import { useFormContext } from 'react-hook-form';
import { columnsMonHocChoDangKy } from '../configs';

export const DangKyHocPhanSinhVienForm = () => {
  const { control, watch, setValue } = useFormContext();
  const registrationType = watch('registrationType') || 'dangKyMoi';

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight={700}>
        Môn học phần chờ đăng ký
      </Typography>

      <Grid container spacing={1}>
        <Grid size={3}>
          <DotDangKySelection control={control} name="idDotDangKy" required />
        </Grid>

        <Grid size={9}>
          <Stack spacing={1}>
            <RadioGroup
              row
              value={registrationType}
              onChange={(e) => setValue('registrationType', e.target.value)}
            >
              <FormControlLabel
                value="dangKyMoi"
                control={<Radio size="small" />}
                label="Đăng ký mới"
              />
              <FormControlLabel
                value="dangKyHocLai"
                control={<Radio size="small" />}
                label="Đăng ký học lại"
              />
              <FormControlLabel
                value="dangKyCaiThien"
                control={<Radio size="small" />}
                label="DK Cải thiện"
              />
            </RadioGroup>
          </Stack>
        </Grid>

        <Grid size={6}>
          <ControlledTextField control={control} name="tenMonHoc" label="Tên môn học" />
        </Grid>

        <Grid size={3}>
          <ControlledCheckbox control={control} name="choPhepN" label="Cho phép N*" />
        </Grid>

        <Grid size={3}>
          <ControlledCheckbox
            control={control}
            name="choPhepTrungLich"
            label="Cho phép trùng lịch"
          />
        </Grid>

        <Grid size={6}>
          <ControlledTextField control={control} name="lopDanhNghia" label="Lớp danh nghĩa" />
        </Grid>

        <Grid size={6}>
          <Button variant="contained" size="small" startIcon={<Search />}>
            Tìm
          </Button>
        </Grid>
      </Grid>

      <DataGridTable
        columns={columnsMonHocChoDangKy}
        rows={[]}
        checkboxSelection={false}
        loading={false}
        height={'300px'}
      />
    </Stack>
  );
};
