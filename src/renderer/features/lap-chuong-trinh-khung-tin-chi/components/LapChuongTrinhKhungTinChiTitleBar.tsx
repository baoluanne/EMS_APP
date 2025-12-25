import { Box, Button, Chip, InputAdornment, Stack, Typography } from '@mui/material';
import { DebouncedTextField } from '@renderer/components/fields';
import { MonHocBacDaoTaoForm } from '@renderer/features/mon-hoc-bac-dao-tao/validations';
import { IconPlus, IconSearch, IconTrashFilled } from '@tabler/icons-react';

interface LapChuongTrinhKhungTinChiTitleBarProps {
  title: string;
  isBatBuoc?: boolean;
  data?: MonHocBacDaoTaoForm[];
  onSearchChange: (value: string) => void;
  onOpenSelectMonHocModal: (isBatBuoc: boolean) => void;
  isDisabledAddBtn?: boolean;

  onRemoveMonHoc: () => void;
  isDisabledDeleteBtn?: boolean;
}

export const LapChuongTrinhKhungTinChiTitleBar = ({
  title,
  isBatBuoc,
  data,
  onSearchChange,
  onOpenSelectMonHocModal,
  isDisabledAddBtn,
  onRemoveMonHoc,
  isDisabledDeleteBtn,
}: LapChuongTrinhKhungTinChiTitleBarProps) => {
  let requiredCount = 0;
  let tcTinhTBC = 0;
  let tcKhongTinhTBC = 0;

  data?.forEach((monHoc) => {
    const soTinChi = monHoc.soTinChi ?? 0;

    requiredCount += soTinChi;

    if (monHoc.isKhongTinhDiemTBC) {
      tcKhongTinhTBC += soTinChi;
    } else {
      tcTinhTBC += soTinChi;
    }
  });
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">{title}</Typography>
            <Chip label={requiredCount} size="small" variant="outlined" color="primary" />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">TC tính TBC:</Typography>
            <Chip label={tcTinhTBC} size="small" variant="outlined" color="primary" />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">TC không tính TBC:</Typography>
            <Chip label={tcKhongTinhTBC} size="small" variant="outlined" color="primary" />
          </Stack>
          <Button
            startIcon={<IconPlus size={20} />}
            onClick={() => onOpenSelectMonHocModal(isBatBuoc ?? false)}
            disabled={isDisabledAddBtn ?? true}
          >
            Thêm
          </Button>
          <Button
            startIcon={<IconTrashFilled size={20} />}
            onClick={() => onRemoveMonHoc()}
            disabled={isDisabledDeleteBtn ?? true}
            color="error"
          >
            Xóa
          </Button>
        </Stack>

        <DebouncedTextField
          placeholder="Tìm kiếm"
          onChange={onSearchChange}
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
      </Stack>
    </Box>
  );
};
