import { Card, Grid, Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { DataGridTable } from '@renderer/components/Table';
import { Title } from '@renderer/components/Title';
import { ToolbarActions } from '@renderer/components/toolbars';
import {
  chuongTrinhKhungTinChiColumns,
  ChuongTrinhKhungTinChiFilter,
  ChuongTrinhKhungTinChiFilters,
  chuongTrinhKhungTinChiSideTableColumns,
  ChuongTrinhKhungTinChiTitleBar,
} from '@renderer/features/chuong-trinh-khung-tin-chi';
import { chuongTrinhKhungTinChiRows } from '@renderer/features/chuong-trinh-khung-tin-chi/mocks';
import { TABS_CONFIG } from '@renderer/shared/configs';
import { useDisclosure, useFilter } from '@renderer/shared/hooks';

const ChuongTrinhKhungTinChi = () => {
  const { filter, setFilter } = useFilter<ChuongTrinhKhungTinChiFilters>();
  const { isOpen: isOpenFilter, toggle: toggleFilter } = useDisclosure(true);

  return (
    <Stack gap={2}>
      <Title
        title={TABS_CONFIG.ChuongTrinhKhungTinChi.label}
        showSidebarExpandIcon={!isOpenFilter}
        onClickExpand={toggleFilter}
      />
      <ToolbarActions />
      <HorizontalFilterCollapse title="Chi tiết">
        <ChuongTrinhKhungTinChiFilter filter={filter} setFilter={setFilter} />
      </HorizontalFilterCollapse>

      <Grid container direction="row" spacing={2}>
        <Card component={Grid} size={8}>
          <ChuongTrinhKhungTinChiTitleBar />
          <DataGridTable
            columns={chuongTrinhKhungTinChiColumns}
            rows={chuongTrinhKhungTinChiRows}
            getRowId={(row) => row.id}
            checkboxSelection={false}
          />
        </Card>

        <Grid size={4}>
          <DataGridTable
            columns={chuongTrinhKhungTinChiSideTableColumns}
            rows={[]}
            getRowId={(row) => row.id}
            checkboxSelection={false}
            height={1}
          />
        </Grid>
      </Grid>

      <Card component={Stack}>
        <ChuongTrinhKhungTinChiTitleBar />
        <DataGridTable
          columns={chuongTrinhKhungTinChiColumns}
          rows={chuongTrinhKhungTinChiRows}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Card>
    </Stack>
  );
};

export default ChuongTrinhKhungTinChi;
