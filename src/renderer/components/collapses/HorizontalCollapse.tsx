import { Card, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useDisclosure } from '@renderer/shared/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface HorizontalCollapseProps {
  title?: string;
  children: ReactNode;
  headerChildren?: ReactNode;
  additionalFilter?: ReactNode;
}

export const HorizontalFilterCollapse = ({
  children,
  title,
  headerChildren,
  additionalFilter,
}: HorizontalCollapseProps) => {
  const { isOpen, toggle } = useDisclosure(true);
  return (
    <Card>
      <Stack sx={{ minWidth: 300, position: 'relative', p: 1.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          {headerChildren ? (
            headerChildren
          ) : (
            <Typography variant="h6" onClick={toggle} flex={1} sx={{ cursor: 'pointer' }}>
              {title}
            </Typography>
          )}
          {isOpen ? (
            <IconChevronUp onClick={toggle} style={{ cursor: 'pointer' }} />
          ) : (
            <IconChevronDown onClick={toggle} style={{ cursor: 'pointer' }} />
          )}
        </Stack>

        <Collapse orientation="vertical" in={isOpen}>
          <Stack gap={1} mt={3}>
            {children}
          </Stack>

          {additionalFilter && (
            <Stack>
              <Divider sx={{ my: 2 }} />
              {additionalFilter}
            </Stack>
          )}
        </Collapse>
      </Stack>
    </Card>
  );
};
