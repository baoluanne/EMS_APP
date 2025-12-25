import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Checkbox,
  Stack,
  TextField,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onSelect: (payload: { from: number; to: number; checked: boolean }) => void;
}

export const SelectRowsModal = ({ onClose, onSelect }: Props) => {
  const [from, setFrom] = useState<number | ''>(1);
  const [to, setTo] = useState<number | ''>(2);
  const [checked, setChecked] = useState<boolean>(true);

  const isInvalid =
    from === '' ||
    to === '' ||
    Number.isNaN(from) ||
    Number.isNaN(to) ||
    Number(from) < 1 ||
    Number(to) < 1 ||
    Number(from) >= Number(to) ||
    (from as number) > (to as number);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isInvalid) return;
    onSelect({ from: Number(from), to: Number(to), checked });
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Chọn dữ liệu</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 0.5 }}>
            <span>Từ</span>
            <TextField
              size="small"
              type="number"
              value={from}
              onChange={(e) => setFrom(e.target.value === '' ? '' : Number(e.target.value))}
              sx={{ width: 80 }}
              slotProps={{ input: { inputProps: { min: 1 } } }}
            />
            <span>Đến</span>
            <TextField
              size="small"
              type="number"
              value={to}
              onChange={(e) => setTo(e.target.value === '' ? '' : Number(e.target.value))}
              sx={{ width: 80 }}
              slotProps={{ input: { inputProps: { min: 1 } } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              }
              label="Chọn"
              sx={{ ml: 1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isInvalid}
          >
            Chấp nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
