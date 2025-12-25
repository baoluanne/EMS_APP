import { Stack, Typography, useTheme } from '@mui/material';
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { FC } from 'react';

interface TitleProps {
  onClickExpand?: () => void;
  showSidebarExpandIcon?: boolean;
  title: string;
}

export const Title: FC<TitleProps> = ({ onClickExpand, showSidebarExpandIcon, title }) => {
  const { palette } = useTheme();

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {showSidebarExpandIcon && (
        <IconLayoutSidebarLeftExpand
          onClick={onClickExpand}
          style={{ cursor: 'pointer' }}
          color={palette.primary.main}
        />
      )}
      <Typography variant="h2" color="#000000" fontSize={24}>
        {title}
      </Typography>
    </Stack>
  );
};
