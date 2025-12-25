import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div>
      <Typography variant="h3">About</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};
