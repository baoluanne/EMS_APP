import { Button, Stack } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { HocKySelection } from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import {
  ChiTietKhungHocKy_NienChe,
  TaoKeHoachDaoTaoNienCheFilters,
} from '@renderer/features/ke-hoach-dao-tao-nien-che';
import { TaoKeHoachDaoTaoNienCheFilterForm } from '@renderer/features/ke-hoach-dao-tao-nien-che/components';
import {
  danhSachNganhHocColumns,
  taoKeHoachDaoTaoColumns,
} from '@renderer/features/ke-hoach-dao-tao-tin-chi';
import { useFilter } from '@renderer/shared/hooks';
import { useTableParamsSelection } from '@renderer/shared/hooks/use-table-params-selection';
import { useListQuery } from '@renderer/shared/queries';
import { useFormContext } from 'react-hook-form';

interface Props {
  onSuccess?: () => void;
  selectedKhungHocKyTC: ChiTietKhungHocKy_NienChe[];
  setSelectedKhungHocKyTC: React.Dispatch<React.SetStateAction<ChiTietKhungHocKy_NienChe[]>>;
}
export const KeHoachDaoTaoNienCheModal = ({
  selectedKhungHocKyTC,
  setSelectedKhungHocKyTC,
}: Props) => {
  const { filter, setFilter } = useFilter<TaoKeHoachDaoTaoNienCheFilters>();
  const methods = useFormContext();
  const { data: khungHocKyTC, isLoading: isLoadingKhungHocKyTC } = useListQuery<
    ChiTietKhungHocKy_NienChe[]
  >('ChiTietChuongTrinhKhung_NienChe');

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
        .every((key) => !filter[key] || item.chuongTrinhKhungNienChe?.[key] === filter[key]) &&
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
      <TaoKeHoachDaoTaoNienCheFilterForm setFilter={setFilter} filter={filter} />

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
