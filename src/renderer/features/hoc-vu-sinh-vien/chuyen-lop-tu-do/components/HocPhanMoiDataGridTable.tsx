import { DataGridTable } from '@renderer/components/Table';
import {
  columnsHocPhanMoi,
  HocPhanFilter,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do';
import InfoSection from '@renderer/components/InfoSection';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

export const HocPhanMoiDataGridTable = () => {
  const [enabled, setEnabled] = useState(false);
  const sinhVien = useWatch({ name: 'sinhVien' });
  const lopHocMoi = useWatch({ name: 'lopHocMoi' });
  const {
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    tableConfig,
    mergeParams,
  } = useCrudPaginationModal<any, any>({
    defaultValues: {},
    defaultState: {
      idSinhVien: sinhVien?.id,
    },
    entity: 'ChuyenLop',
    endpoint: 'hoc-phan-moi',
    schema: HocPhanFilter,
    enabled,
  });
  useEffect(() => {
    console.log('lopHocMoi', lopHocMoi);
    if (sinhVien?.id && lopHocMoi?.id) {
      mergeParams({ idSinhVien: sinhVien.id, idLopHocMoi: lopHocMoi.id });
      setEnabled(true);
    }
  }, [sinhVien?.id, lopHocMoi?.id, mergeParams]);

  return (
    <InfoSection title="Học phần mới">
      <DataGridTable
        columns={columnsHocPhanMoi}
        rows={data?.result}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height="350px"
        {...tableConfig}
      />
    </InfoSection>
  );
};
