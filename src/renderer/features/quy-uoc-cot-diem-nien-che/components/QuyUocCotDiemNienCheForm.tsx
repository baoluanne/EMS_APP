import { Box, Divider } from '@mui/material';
import { DiemRangBuocForm } from './forms';
import { QuyUocForm } from './forms/QuyUocForm';

export const QuyUocCotDiemNienCheForm = () => {
  return (
    <Box>
      <QuyUocForm />
      <Divider sx={{ my: 1 }} />
      <DiemRangBuocForm />
    </Box>
  );
};
