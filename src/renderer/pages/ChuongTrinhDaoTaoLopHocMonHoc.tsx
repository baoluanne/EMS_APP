import { Stack } from '@mui/material';
import { DiemAlert } from '@renderer/components/alerts';
import { DataGridTable } from '@renderer/components/Table';
import { Title } from '@renderer/components/Title';
import { Filter, FiltersToolbar, ToolbarActions } from '@renderer/components/toolbars';
import {
  chuongTrinhDaoTaoLopHocMonHocColumnGroupingModel,
  chuongTrinhDaoTaoLopHocMonHocColumns,
  chuongTrinhDaoTaoLopHocMonHocFilters,
} from '@renderer/features/chuong-trinh-dao-tao-lop-hoc-mon-hoc';
import { useDisclosure } from '@renderer/shared/hooks';
import { useState } from 'react';

const ChuongTrinhDaoTaoLopHocMonHoc = () => {
  const { isOpen: isOpenFilter, toggle: toggleFilter } = useDisclosure(true);
  const [filters, setFilters] = useState<Filter[]>([]);

  return (
    <Stack gap={2}>
      <Title
        title="Chương trình đào tạo lớp học - Môn học"
        showSidebarExpandIcon={!isOpenFilter}
        onClickExpand={toggleFilter}
      />
      <ToolbarActions />
      <FiltersToolbar
        availableFilters={chuongTrinhDaoTaoLopHocMonHocFilters}
        filters={filters}
        setFilters={setFilters}
      />
      <DiemAlert />
      <Stack
        flex={1}
        gap={2}
        sx={{
          overflow: 'auto',
        }}
      >
        <DataGridTable
          columnGroupingModel={chuongTrinhDaoTaoLopHocMonHocColumnGroupingModel}
          columns={chuongTrinhDaoTaoLopHocMonHocColumns}
          rows={[]}
          columnGroupHeaderHeight={24}
          columnHeaderHeight={36}
        />
      </Stack>
    </Stack>
  );
};

export default ChuongTrinhDaoTaoLopHocMonHoc;
