import { Alert, SxProps } from '@mui/material';

interface DiemAlertProps {
  sx?: SxProps;
}

export const DiemAlert = ({ sx }: DiemAlertProps) => {
  return (
    <Alert
      severity="info"
      icon={<></>}
      sx={{
        backgroundColor: '#F8F5DB',
        color: '#000000',
        borderRadius: '20px',
        fontSize: '12px',
        ...sx,
      }}
    >
      Điểm chuyên cần, thường xuyên, TL/BTL, cuối kỳ nhập theo trọng số % (10, 20, 20, 60). Hệ số
      LT/TH nhập 1; 2 hoặc 0,4; 0,6
    </Alert>
  );
};
