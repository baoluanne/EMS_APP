import React from 'react';
import { Stack, Typography, StackProps, Box } from '@mui/material';

interface InfoSectionProps extends Omit<StackProps, 'title'> {
  title?: React.ReactNode;
  children: React.ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children, ...stackProps }) => {
  return (
    <Stack
      spacing={2}
      sx={{
        mt: 1,
        p: 2,
        borderRadius: 3,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        ...stackProps.sx,
      }}
      {...stackProps}
    >
      {title && (
        <Box display="flex" alignItems="center" gap={1}>
          {typeof title === 'string' ? (
            <Typography variant="subtitle1" fontWeight={700}>
              {title}
            </Typography>
          ) : (
            title
          )}
        </Box>
      )}

      {children}
    </Stack>
  );
};

export default InfoSection;
