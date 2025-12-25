import { IconButton, InputBase, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export const SearchBox = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 250,
        height: 34,
        borderRadius: '8px',
        border: '1px solid #ccc',
        px: 1,
      }}
    >
      <InputBase
        placeholder="Tìm kiếm"
        sx={{
          ml: 1,
          flex: 1,
          fontSize: 14,
          paddingY: 0.5,
        }}
      />
      <IconButton type="submit" sx={{ p: '6px', color: '#555' }} aria-label="search">
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};
