import { Search } from '@mui/icons-material';
import { Button } from '@mui/material';

interface Props {
  onClick: () => void;
}
export const SearchButton = ({ onClick }: Props) => {
  return (
    <Button
      variant="outlined"
      sx={{
        minWidth: 32,
        width: 35,
        height: 32,
        mx: 0.5,
        borderColor: '#ccc',
        color: 'primary.main',
      }}
      onClick={onClick}
    >
      <Search fontSize="small" />
    </Button>
  );
};
