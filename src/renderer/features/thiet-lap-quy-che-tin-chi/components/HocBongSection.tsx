import { Typography } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { Option } from '@renderer/shared/types';
import { useState } from 'react';
import { CustomTabs } from './CustomTabs';
import { HocBongForm } from './forms';

const TABS: Option[] = [
  { label: 'Học bổng', value: 'Học bổng' },
  { label: 'Danh hiệu', value: 'Danh hiệu', disabled: true },
];

export const HocBongSection = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const handleTabChange = (tab: Option) => {
    setSelectedTab(tab);
  };

  const formContent = {
    [TABS[0].value]: <HocBongForm />,
  };

  return (
    <HorizontalFilterCollapse
      headerChildren={
        <CustomTabs tabs={TABS} selectedTab={selectedTab} onTabChange={handleTabChange} />
      }
    >
      <Typography fontWeight={600}>{selectedTab.label}</Typography>
      {formContent[selectedTab.value]}
    </HorizontalFilterCollapse>
  );
};
