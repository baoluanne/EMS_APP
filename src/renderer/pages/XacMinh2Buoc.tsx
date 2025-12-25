import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { OTP } from '@renderer/components/fields';
import { useState } from 'react';
import logo from '../assets/images/logo.png';

const XacMinh2BuocPage = () => {
  const [otp, setOtp] = useState('');
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        component={Stack}
        elevation={3}
        sx={{ py: 1, pt: 2, borderRadius: '20px' }}
        direction="column"
        alignItems="center"
        gap={4}
      >
        <Stack direction="column" alignItems="center" sx={{ px: 8 }}>
          <img src={logo} alt="Nam Can Tho University" style={{ width: 120, marginBottom: 8 }} />
          <Typography variant="h6" fontWeight="bold" color="black">
            HỆ THỐNG QUẢN LÝ ĐÀO TẠO
          </Typography>
        </Stack>

        <Stack direction="column" alignItems="center" gap={2} sx={{ px: 8 }}>
          <Typography fontWeight="bold" color="black">
            Nhập mã OTP đã được gửi đến Email của bạn
          </Typography>
          <OTP separator={<span></span>} value={otp} onChange={setOtp} length={6} />
          <Typography>Mã OTP chỉ có hiệu lực trong vòng 5 phút</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" gap={2} sx={{ px: 8 }}>
          <Button variant="outlined" sx={{ borderColor: '#263ca6' }} type="button">
            Quay lại
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#263ca6' }} type="button">
            Xác minh
          </Button>
        </Stack>

        <Box
          sx={{
            width: 1,
            px: 2,
          }}
          fontStyle="italic"
        >
          <Typography>Hiện tại bạn không thể nhập mã OTP?</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default XacMinh2BuocPage;
