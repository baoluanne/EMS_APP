import { Box, Button, Checkbox, Divider, FormControlLabel } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useState } from 'react';
import { GridRowSelectionModel } from '@mui/x-data-grid';

interface Props {
  onSave?: (tiepNhan: boolean) => void;
  selectedHoSo: GridRowSelectionModel;
}
export default function TiepNhanHoSoSVToolbar({ onSave, selectedHoSo }: Props) {
  const [tiepNhan, setTiepNhan] = useState(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTiepNhan(event.target.checked);
  };
  const handleSave = () => {
    onSave?.(tiepNhan);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        p: 1,
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={tiepNhan} onChange={handleCheckboxChange} sx={{ p: 0.5 }} />}
        label="Tiếp nhận/không tiếp nhận"
      />

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      <Button
        variant="text"
        size="small"
        startIcon={<Save />}
        disabled={selectedHoSo?.ids.size <= 0}
        sx={{
          color: selectedHoSo?.ids.size > 0 ? 'primary' : 'text.disabled',
        }}
        onClick={handleSave}
      >
        Lưu
      </Button>
    </Box>
  );
}
