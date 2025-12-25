import { Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { DataGridTable } from '@renderer/components/Table';
import { Title } from '@renderer/components/Title';
import { ToolbarActions } from '@renderer/components/toolbars';
import {
  quanLyLopHocPhanColumns,
  QuanLyLopHocPhanFilter,
  QuanLyLopHocPhanFilters,
} from '@renderer/features/quan-ly-lop-hoc-phan';
import { TABS_CONFIG } from '@renderer/shared/configs';
import { useDisclosure, useFilter } from '@renderer/shared/hooks';

const QuanLyLopHocPhan = () => {
  const { filter, setFilter } = useFilter<QuanLyLopHocPhanFilters>();
  const { isOpen: isOpenFilter, toggle: toggleFilter } = useDisclosure(true);

  return (
    <Stack gap={2}>
      <Stack direction="column" gap={isOpenFilter ? 3 : 0}>
        <Stack
          flex={1}
          gap={2}
          sx={{
            overflow: 'auto',
          }}
        >
          <Title
            title={TABS_CONFIG.QuanLyLopHocPhan.label}
            showSidebarExpandIcon={!isOpenFilter}
            onClickExpand={toggleFilter}
          />
          <ToolbarActions />
          <HorizontalFilterCollapse title="Chi tiết">
            <QuanLyLopHocPhanFilter filter={filter} setFilter={setFilter} />
          </HorizontalFilterCollapse>
          <DataGridTable
            columns={quanLyLopHocPhanColumns}
            rows={[]}
            getRowId={(row) => row.id}
            checkboxSelection
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QuanLyLopHocPhan;
