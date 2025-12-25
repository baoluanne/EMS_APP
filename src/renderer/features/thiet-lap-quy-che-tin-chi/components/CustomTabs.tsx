import { Button, Stack } from '@mui/material';
import { Option } from '@renderer/shared/types';

interface Props {
  tabs: Option[];
  selectedTab: Option;
  onTabChange: (tab: Option) => void;
}

export const CustomTabs = ({ tabs, onTabChange, selectedTab }: Props) => {
  return (
    <Stack direction="row" gap={1}>
      {tabs.map((tab) => (
        <Button
          key={tab.value as string}
          variant="outlined"
          color={selectedTab.value === tab.value ? 'primary' : 'inherit'}
          sx={{ borderRadius: 6 }}
          onClick={() => onTabChange(tab)}
          disabled={tab.disabled}
        >
          {tab.label}
        </Button>
      ))}
    </Stack>
  );
};
