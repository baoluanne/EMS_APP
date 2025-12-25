import { Button, Card, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useDisclosure } from '@renderer/shared/hooks';
import { IconChevronDown, IconChevronsLeft } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface VerticalCollapseProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
  additionalFilter?: ReactNode;
}

export const FilterCollapse = ({
  isOpen,
  onClose,
  title,
  children,
  additionalFilter,
}: VerticalCollapseProps) => {
  const { isOpen: isCollapse, toggle } = useDisclosure(true);
  return (
    <Collapse orientation="horizontal" in={isOpen}>
      <Card sx={{ minWidth: 300 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack
              onClick={toggle}
              gap={1}
              direction="row"
              alignItems="center"
              sx={{ cursor: 'pointer' }}
            >
              <Typography variant="h4">{title}</Typography>
              <IconChevronDown
                style={{
                  transform: isCollapse ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </Stack>
            <Button
              sx={{ fontSize: 14 }}
              endIcon={<IconChevronsLeft size={14} />}
              color="inherit"
              onClick={onClose}
            >
              Ẩn
            </Button>
          </Stack>

          <Collapse in={isCollapse}>
            <Stack gap={1}>{children}</Stack>
          </Collapse>
        </Stack>
        {additionalFilter && (
          <Stack>
            <Divider sx={{ my: 2 }} />
            {additionalFilter}
          </Stack>
        )}
      </Card>
    </Collapse>
  );
};
