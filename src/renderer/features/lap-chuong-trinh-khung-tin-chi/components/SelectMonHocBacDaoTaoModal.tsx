import { Stack, Typography } from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { MonHocBacDaoTaoForm } from '@renderer/features/mon-hoc-bac-dao-tao/validations';
import { useCrud } from '@renderer/shared/hooks';
import { useTableParamsSelection } from '@renderer/shared/hooks/use-table-params-selection';
import { useEffect, useState } from 'react';
import { lapChuongTrinhKhungTinChiColumns } from '../configs';

interface Props {
  open: boolean;
  onClose: () => void;
  onAddMonHoc: (data?: MonHocBacDaoTaoForm[], isBatBuoc?: boolean) => void;
  refetch?: () => Promise<void>;
  isBatBuoc?: boolean;
  alreadyAddedRows?: MonHocBacDaoTaoForm[]; // danh sách môn học đã được thêm vào rồi
}

export const SelectMonHocBacDaoTaoModal: React.FC<Props> = ({
  onClose,
  onAddMonHoc,
  isBatBuoc,
  alreadyAddedRows,
}) => {
  const [filteredData, setAllMonHocBacDaoTao] = useState<MonHocBacDaoTaoForm[]>([]);
  const { data, isRefetching } = useCrud<MonHocBacDaoTaoForm>({
    entity: 'MonHocBacDaoTao',
  });
  useEffect(() => {
    const alreadyAddedIds = new Set(alreadyAddedRows?.map((row) => row.id));

    const filteredData = (data ?? []).filter((row) => !alreadyAddedIds.has(row.id));
    setAllMonHocBacDaoTao(filteredData);
  }, [data]);
  const {
    selectedRows: selectedAddedRows,
    rowIds,
    handleRowSelectionModelChange: handleAddedRowSelectionModelChange,
    tableConfig,
    generateTableConfig,
  } = useTableParamsSelection();

  const handleAddRows = () => {
    const monHocSelected = filteredData?.filter((item) => rowIds.has(item?.id ?? ''));
    onAddMonHoc(monHocSelected, isBatBuoc);
  };
  return (
    <FormDetailsModal title="Thêm môn học bậc đào tạo" onClose={onClose} onSave={handleAddRows}>
      <Stack gap={3}>
        <Stack gap={2}>
          <Typography color="black" variant="h6">
            Danh sách môn học bậc đào tạo
          </Typography>
          <DataGridTable
            columns={lapChuongTrinhKhungTinChiColumns}
            rows={filteredData}
            getRowId={(row) => row.id}
            loading={isRefetching}
            checkboxSelection
            onRowSelectionModelChange={handleAddedRowSelectionModelChange}
            rowSelectionModel={selectedAddedRows}
            {...tableConfig}
            {...generateTableConfig(filteredData.length, isRefetching)}
          />
        </Stack>
      </Stack>
    </FormDetailsModal>
  );
};
