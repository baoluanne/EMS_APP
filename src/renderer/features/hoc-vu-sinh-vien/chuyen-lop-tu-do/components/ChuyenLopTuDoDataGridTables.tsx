import { Grid } from '@mui/material';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { DataGridTable } from '@renderer/components/Table';
import {
  columnsKeHoachThuChungCu,
  columnsKeHoachThuChungMoi,
  columnsKeHoachThuCu,
  columnsKeHoachThuMoi,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do/configs';
import {
  ChuyenLopTuDo,
  ChuyenLopTuDoSchema,
} from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do';
import InfoSection from '@renderer/components/InfoSection';
import { HocPhanMoiDataGridTable } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do/components/HocPhanMoiDataGridTable';
import { HocPhanCuDataGridTable } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do/components/HocPhanCuDataGridTable';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

export default function ChuyenLopTuDoDataGridTables() {
  const [enabled, setEnabled] = useState(false);
  const sinhVien = useWatch({ name: 'sinhVien' });
  const {
    formMethods,
    // data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    tableConfig,
    mergeParams,
  } = useCrudPaginationModal<any, ChuyenLopTuDoSchema>({
    defaultValues: {},
    schema: ChuyenLopTuDo,
    entity: 'ChuyenLop',
    defaultState: {
      idSinhVien: sinhVien?.id,
    },
    enabled,
  });

  useEffect(() => {
    if (sinhVien?.id) {
      mergeParams({ idSinhVien: sinhVien.id });
      setEnabled(true);
    }
  }, [mergeParams, sinhVien?.id]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={6}>
          <HocPhanCuDataGridTable />
        </Grid>
        <Grid size={6}>
          <HocPhanMoiDataGridTable />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={6}>
          <InfoSection title="Kế hoạch thu cũ">
            <DataGridTable
              columns={columnsKeHoachThuCu}
              rows={[]}
              checkboxSelection
              loading={isRefetching}
              onRowClick={(params) => formMethods.reset(params.row)}
              onRowSelectionModelChange={handleRowSelectionModelChange}
              rowSelectionModel={selectedRows}
              height={'calc(100% - 85px)'}
              {...tableConfig}
            />
          </InfoSection>
        </Grid>
        <Grid size={6}>
          <InfoSection title="Kế hoạch thu mới">
            <DataGridTable
              columns={columnsKeHoachThuMoi}
              rows={[]}
              checkboxSelection
              loading={isRefetching}
              onRowClick={(params) => formMethods.reset(params.row)}
              onRowSelectionModelChange={handleRowSelectionModelChange}
              rowSelectionModel={selectedRows}
              height={'calc(100% - 85px)'}
              {...tableConfig}
            />
          </InfoSection>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={6}>
          <InfoSection title="Kế hoạch thu chung cũ">
            <DataGridTable
              columns={columnsKeHoachThuChungCu}
              rows={[]}
              checkboxSelection
              loading={isRefetching}
              onRowClick={(params) => formMethods.reset(params.row)}
              onRowSelectionModelChange={handleRowSelectionModelChange}
              rowSelectionModel={selectedRows}
              height={'calc(100% - 85px)'}
              {...tableConfig}
            />
          </InfoSection>
        </Grid>
        <Grid size={6}>
          <InfoSection title="Kế hoạch thu chung mới (Check để chọn không truy cứu công nợ)">
            <DataGridTable
              columns={columnsKeHoachThuChungMoi}
              rows={[]}
              checkboxSelection
              loading={isRefetching}
              onRowClick={(params) => formMethods.reset(params.row)}
              onRowSelectionModelChange={handleRowSelectionModelChange}
              rowSelectionModel={selectedRows}
              height={'calc(100% - 85px)'}
              {...tableConfig}
            />
          </InfoSection>
        </Grid>
      </Grid>
    </>
  );
}
