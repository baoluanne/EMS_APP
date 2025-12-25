import { Card, Grid, Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { Title } from '@renderer/components/Title';
import { Filter, FiltersToolbar, ToolbarActions } from '@renderer/components/toolbars';
import {
  xemPhanMonLopHocColumns,
  xemPhanMonLopHocFilters,
  XemPhanMonLopHocSideTable,
  XemPhanMonLopHocTitleBar,
} from '@renderer/features/xem-phan-mon-lop-hoc';
import { TABS_CONFIG } from '@renderer/shared/configs';
import { useDisclosure } from '@renderer/shared/hooks';
import { useState } from 'react';

const XemPhanMonLopHoc = () => {
  const { isOpen: isOpenFilter, toggle: toggleFilter } = useDisclosure(true);
  const [filters, setFilters] = useState<Filter[]>([]);

  return (
    <Stack gap={2}>
      <Title
        title={TABS_CONFIG.XemPhanMonLopHoc.label}
        showSidebarExpandIcon={!isOpenFilter}
        onClickExpand={toggleFilter}
      />
      <ToolbarActions />
      <FiltersToolbar
        availableFilters={xemPhanMonLopHocFilters}
        filters={filters}
        setFilters={setFilters}
      />
      <Stack direction="row" gap={isOpenFilter ? 3 : 0}>
        <Stack
          flex={1}
          spacing={3}
          sx={{
            overflow: 'auto',
          }}
        >
          <Card container spacing={2} component={Grid}>
            <Grid size={8}>
              <XemPhanMonLopHocTitleBar title="Môn học bắt buộc: " />
              <DataGridTable
                columns={xemPhanMonLopHocColumns}
                rows={[]}
                getRowId={(row) => row.id}
                checkboxSelection={false}
              />
            </Grid>

            <Grid size={4}>
              <XemPhanMonLopHocSideTable />
            </Grid>
          </Card>

          <Card component={Stack}>
            <XemPhanMonLopHocTitleBar title="Môn học tự chọn: " />
            <DataGridTable
              columns={xemPhanMonLopHocColumns}
              rows={[]}
              getRowId={(row) => row.id}
              checkboxSelection={false}
            />
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default XemPhanMonLopHoc;
