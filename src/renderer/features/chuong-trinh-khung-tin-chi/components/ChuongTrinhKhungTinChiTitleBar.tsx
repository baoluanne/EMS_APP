import { Button, IconButton, InputAdornment, Popover, Stack, Typography } from '@mui/material';
import { DebouncedTextField } from '@renderer/components/fields';
import { useDisclosure } from '@renderer/shared/hooks';
import { IconFilter, IconSearch, IconX } from '@tabler/icons-react';
import { useRef } from 'react';

export const ChuongTrinhKhungTinChiTitleBar = () => {
  const { isOpen, open, close } = useDisclosure();
  const anchorElRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
      <DebouncedTextField
        placeholder="Tìm kiếm"
        onChange={() => {}}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size={16} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '50px',
            },
          },
        }}
      />

      <Button
        startIcon={<IconFilter size={16} />}
        sx={{
          borderRadius: '50px',
          backgroundColor: '#0000001F',
          color: '#000000',
          px: 2,
        }}
        onClick={open}
        ref={anchorElRef}
      >
        Tìm kiếm
      </Button>

      <Popover
        open={isOpen}
        anchorEl={anchorElRef.current}
        onClose={close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: { borderRadius: '20px' },
          },
        }}
      >
        <Stack
          sx={{
            p: 2,
            pt: 1,
          }}
          spacing={2}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography fontWeight={700} fontSize={20} color="primary">
              Tìm kiếm
            </Typography>
            <IconButton onClick={close}>
              <IconX />
            </IconButton>
          </Stack>

          <DebouncedTextField label="Môn học bắt buộc" onChange={() => {}} />
          <DebouncedTextField label="TC tính TBC" onChange={() => {}} />
          <DebouncedTextField label="TC không tính TBC" onChange={() => {}} />

          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Button variant="outlined">Xóa tìm kiếm</Button>
            <Button variant="contained" sx={{ flex: 1 }}>
              Lưu
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
};
