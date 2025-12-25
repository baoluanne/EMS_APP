import { Stack } from '@mui/material';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import {
  BacDaoTaoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
  QuyCheSelection,
} from '@renderer/components/selections';
import { useFormContext } from 'react-hook-form';

export const ApDungQuyCheHocVuForm = () => {
  const { control } = useFormContext();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <KhoaHocSelection control={control} required name="idKhoaHoc" />
        <LoaiDaoTaoSelection control={control} required name="idLoaiDaoTao" />
      </Stack>

      <Stack direction="row" gap={2}>
        <BacDaoTaoSelection control={control} required name="idBacDaoTao" />
        <QuyCheSelection control={control} required name="quyChe" />
      </Stack>
      <Stack direction="row" gap={2}>
        <ControlledTextField
          control={control}
          name="choPhepNoMon"
          label="Cho phép nợ môn"
          required
        />
        <ControlledTextField
          control={control}
          name="choPhepNoDVHT"
          label="Cho phép nợ ĐVHT"
          required
        />
      </Stack>
      <ControlledTextField control={control} name="ghiChu" label="Ghi chú" multiline minRows={2} />
    </Stack>
  );
};
