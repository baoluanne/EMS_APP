import { Stack } from '@mui/material';
import { Loading } from './Loading';

export const LoadingScreen = () => {
  return (
    <Stack alignItems="center" minHeight="90vh" justifyContent="center" height="100%">
      <Loading />
    </Stack>
  );
};
