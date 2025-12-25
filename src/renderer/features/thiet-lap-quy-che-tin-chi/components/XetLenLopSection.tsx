import { Typography } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { Option } from '@renderer/shared/types';
import { useState } from 'react';
import { CustomTabs } from './CustomTabs';
import { DieuKienXetThoiHocForm } from './forms';

const TABS: Option[] = [
  { label: 'Điều kiện xét thôi học - học kỳ', value: 'Điều kiện xét thôi học - học kỳ' },
  { label: 'Hạ bậc xếp loại', value: 'Hạ bậc xếp loại', disabled: true },
];

export const XetLenLopSection = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const handleTabChange = (tab: Option) => {
    setSelectedTab(tab);
  };

  const formContent = {
    [TABS[0].value]: <DieuKienXetThoiHocForm />,
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
