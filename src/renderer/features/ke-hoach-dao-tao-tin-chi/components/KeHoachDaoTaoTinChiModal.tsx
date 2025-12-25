import { Button, Stack } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { HocKySelection } from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import {
  danhSachNganhHocColumns,
  taoKeHoachDaoTaoColumns,
  TaoKeHoachDaoTaoTinChiFilters,
} from '@renderer/features/ke-hoach-dao-tao-tin-chi';
import { TaoKeHoachDaoTaoTinChiFilterForm } from '@renderer/features/ke-hoach-dao-tao-tin-chi/components';
import { ChiTietKhungHocKy_TinChi } from '@renderer/features/lap-chuong-trinh-khung-tin-chi/validation';
import { useFilter } from '@renderer/shared/hooks';
import { useTableParamsSelection } from '@renderer/shared/hooks/use-table-params-selection';
import { useListQuery } from '@renderer/shared/queries';
import { useFormContext } from 'react-hook-form';

interface Props {
  selectedKhungHocKyTC: ChiTietKhungHocKy_TinChi[];
  setSelectedKhungHocKyTC: React.Dispatch<React.SetStateAction<ChiTietKhungHocKy_TinChi[]>>;
}
export const KeHoachDaoTaoTinChiModal = ({
  selectedKhungHocKyTC,
  setSelectedKhungHocKyTC,
}: Props) => {
  const { filter, setFilter } = useFilter<TaoKeHoachDaoTaoTinChiFilters>();
  const methods = useFormContext();
  const { data: khungHocKyTC, isLoading: isLoadingKhungHocKyTC } = useListQuery<
    ChiTietKhungHocKy_TinChi[]
  >('ChiTietKhungHocKy_TinChi');
  const { selectedRows, handleRowSelectionModelChange, rowIds, tableConfig, generateTableConfig } =
    useTableParamsSelection();
  const {
    selectedRows: selectedKHTCRows,
    handleRowSelectionModelChange: handleKHTCRowSelectionModelChange,
    rowIds: rowKHTCIds,
    tableConfig: KHTCTableConfig,
    generateTableConfig: generateKHTCTableConfig,
  } = useTableParamsSelection();

  const filteredKhungHocKyTC = (khungHocKyTC ?? []).filter(
    (item) =>
      !selectedKhungHocKyTC.some((selectedItem) => selectedItem.id === item.id) &&
      Object.keys(filter)
        .filter((x) => x !== 'hocKy')
        .every((key) => !filter[key] || item.chuongTrinhKhungTinChi?.[key] === filter[key]) &&
      (filter.hocKy === undefined || item.hocKy === filter.hocKy),
  );

  const handleAddKhungHocKyTC = () => {
    const newItems = [...selectedKhungHocKyTC];
    newItems.push(...(khungHocKyTC ?? []).filter((item) => rowIds.has(item.id as GridRowId)));
    setSelectedKhungHocKyTC(newItems);
  };

  const handleRemoveKhungHocTC = () => {
    setSelectedKhungHocKyTC((prev) => prev.filter((each) => !rowKHTCIds.has(each.id as GridRowId)));
  };

  return (
    <Stack gap={2}>
      <TaoKeHoachDaoTaoTinChiFilterForm setFilter={setFilter} filter={filter} />

      <DataGridTable
        columns={taoKeHoachDaoTaoColumns}
        rows={filteredKhungHocKyTC}
        loading={isLoadingKhungHocKyTC}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        height={300}
        {...tableConfig}
        {...generateTableConfig(filteredKhungHocKyTC.length, isLoadingKhungHocKyTC)}
      />

      <Stack justifyContent="center" direction="row" gap={4}>
        <Button variant="contained" color="success" onClick={handleAddKhungHocKyTC}>
          Thêm
        </Button>
        <Button variant="contained" color="error" onClick={handleRemoveKhungHocTC}>
          Xóa
        </Button>
      </Stack>

      <DataGridTable
        columns={danhSachNganhHocColumns}
        rows={selectedKhungHocKyTC}
        rowSelectionModel={selectedKHTCRows}
        onRowSelectionModelChange={handleKHTCRowSelectionModelChange}
        getRowId={(row) => row.id}
        height={300}
        {...KHTCTableConfig}
        {...generateKHTCTableConfig(selectedKhungHocKyTC.length, false)}
      />

      <Stack direction="row" gap={4}>
        <Stack width={1 / 2}>
          <HocKySelection control={methods.control} name="idHocKy" required />
        </Stack>
        <ControlledTextField control={methods.control} name="ghiChu" label="Ghi chú" />
      </Stack>
    </Stack>
  );
};
