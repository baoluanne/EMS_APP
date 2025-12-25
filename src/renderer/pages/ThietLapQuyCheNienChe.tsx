import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, MenuItem, Select, Stack, Tab, Typography } from '@mui/material';
import { ThongTinChung, XetLenLopHocBong } from '@renderer/features/thiet-lap-quy-che-nien-che';
import { TABS } from '@renderer/features/thiet-lap-quy-che-nien-che/constants';
import { useUpsertMutation } from '@renderer/shared/mutations';
import { useGetQuery, useListQuery } from '@renderer/shared/queries';
import { QuyCheHocVu } from '@renderer/shared/types/quy-che-hoc-vu.types';
import { QuyCheNienChe } from '@renderer/shared/types/quy-che-nien-che.types';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ThietLapQuyCheNienChe = () => {
  const [selectedQuyCheHocVu, setSelectedQuyCheHocVu] = useState('');
  const [value, setValue] = useState(TABS.ThongTinChung);

  const { data: quyCheHocVuList = [], isLoading: isLoadingQuyCheHocVu } =
    useListQuery<QuyCheHocVu[]>('QuyCheHocVu');

  const { data: quyCheNienChe, isFetching } = useGetQuery<QuyCheNienChe>(
    'QuyChe_NienChe_/by-quychehocvu',
    selectedQuyCheHocVu || '',
  );
  const { mutate, isPending } = useUpsertMutation<QuyCheNienChe>('QuyChe_NienChe_');
  const formMethods = useForm<QuyCheNienChe>();

  useEffect(() => {
    if (isFetching || !selectedQuyCheHocVu) return;
    formMethods.reset(quyCheNienChe || { idQuyCheHocVu: selectedQuyCheHocVu });
  }, [isFetching, quyCheNienChe, selectedQuyCheHocVu]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = (data: QuyCheNienChe) => {
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
            onChange={(e) => setSelectedQuyCheHocVu(e.target.value)}
            size="small"
            disabled={isLoadingQuyCheHocVu}
          >
            {quyCheHocVuList.map(({ id, tenQuyChe }) => (
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

export default ThietLapQuyCheNienChe;
