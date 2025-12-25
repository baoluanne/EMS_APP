import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface FilterDrawerBottomProps<T extends FieldValues> {
  children: React.ReactNode;
  onApply?: (filters: T) => void;
  onClear?: () => void;
  methods?: UseFormReturn<T>;
  onApplyBtn?: () => void;
  hideButtons?: boolean;
  title?: string;
  applyTitle?: string;
  clearTitle?: string;
  isRefetching?: boolean;
  defaultExpanded?: boolean;
}

export function FilterDrawerBottom<T extends FieldValues>({
  children,
  onApply,
  onClear,
  methods,
  onApplyBtn,
  hideButtons,
  title = 'Điều kiện tìm kiếm',
  applyTitle = 'Áp dụng bộ lọc',
  clearTitle = 'Xóa bộ lọc',
  isRefetching = false,
  defaultExpanded = false,
}: FilterDrawerBottomProps<T>) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { handleSubmit } = methods || {};
  return (
    <div className="relative mb-1">
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          borderRadius: '5px 5px 0 0',
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            '& .MuiAccordionSummary-content': {
              margin: '0 !important',
            },
            minHeight: 30,
            paddingY: '2px',
            '&.Mui-expanded': {
              minHeight: 30,
            },
          }}
        >
          {title}
        </AccordionSummary>

        <AccordionDetails className="!p-2 !py-3">
          {onApply && handleSubmit ? (
            <form onSubmit={handleSubmit(onApply)} noValidate>
              {children}
              <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                <Button variant="outlined" color="inherit" onClick={onClear}>
                  {clearTitle}
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {applyTitle}
                </Button>
              </Stack>
            </form>
          ) : (
            <>
              {children}
              {!hideButtons && (
                <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                  <Button variant="outlined" color="inherit" onClick={onClear}>
                    {clearTitle}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onApplyBtn}
                    disabled={isRefetching}
                  >
                    {applyTitle}
                  </Button>
                </Stack>
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
