import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, MenuItem, Select, SelectChangeEvent, Stack, Tab, Typography } from '@mui/material';
import { ThongTinChung, XetLenLopHocBong } from '@renderer/features/thiet-lap-quy-che-tin-chi';
import { FORM_DEFAULT_VALUES, TABS } from '@renderer/features/thiet-lap-quy-che-tin-chi/constants';
import { useUpsertMutation } from '@renderer/shared/mutations';
import { useGetQuery, useListQuery } from '@renderer/shared/queries';
import { QuyCheHocVu } from '@renderer/shared/types';
import { QuyCheTinChi } from '@renderer/shared/types/quy-che-tin-chi.types';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ThietLapQuyCheTinChi = () => {
  const [value, setValue] = useState(TABS.ThongTinChung);
  const [selectedQuyCheHocVu, setQuyCheHocVu] = useState('');
  const { data: quyCheHocVuList } = useListQuery<QuyCheHocVu[]>('QuyCheHocVu');
  const { data: quyCheTinChi, isFetching } = useGetQuery(
    'QuyChe_TinChi_/by-quychehocvu',
    selectedQuyCheHocVu,
  );
  const { mutate, isPending } = useUpsertMutation('QuyChe_TinChi_');
  const formMethods = useForm<QuyCheTinChi>();

  useEffect(() => {
    if (isFetching || !selectedQuyCheHocVu) return;

    formMethods.reset(
      quyCheTinChi || { ...FORM_DEFAULT_VALUES, idQuyCheHocVu: selectedQuyCheHocVu },
    );
  }, [isFetching, quyCheTinChi, selectedQuyCheHocVu]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setQuyCheHocVu(event.target.value as string);
  };

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = (data: QuyCheTinChi) => {
    mutate(data);
  };

  return (
    <FormProvider {...formMethods}>
      <Stack
        className="w-full h-full p-2 py-4"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
        component="form"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography>Quy chế học vụ:</Typography>
          <Select
            value={selectedQuyCheHocVu}
            sx={{ flex: 1 }}
            onChange={handleSelectChange}
            size="small"
          >
            {(quyCheHocVuList ?? []).map(({ id, tenQuyChe }) => (
              <MenuItem value={id} key={id}>
                {tenQuyChe}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack>
          <TabContext value={value}>
            <TabList onChange={handleChange}>
              {Object.values(TABS).map((tab) => (
                <Tab label={tab} value={tab} key={tab} sx={{ textTransform: 'unset' }} />
              ))}
            </TabList>
            <TabPanel value={TABS.ThongTinChung} sx={{ p: 0, py: 2 }}>
              <ThongTinChung />
            </TabPanel>
            <TabPanel value={TABS.XetLenLopHocBong} sx={{ p: 0, py: 2 }}>
              <XetLenLopHocBong />
            </TabPanel>
          </TabContext>
        </Stack>
        <Stack direction="row" justifyContent="end">
          <Button variant="contained" type="submit" disabled={!selectedQuyCheHocVu || isPending}>
            Lưu
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ThietLapQuyCheTinChi;
