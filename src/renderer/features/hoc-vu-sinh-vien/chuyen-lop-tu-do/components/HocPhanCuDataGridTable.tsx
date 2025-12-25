import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { DataGridTable } from '@renderer/components/Table';
import { HocPhanFilter } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop-tu-do';
import InfoSection from '@renderer/components/InfoSection';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

type HocPhanCuRow = {
  id: string;
  index: number;
  maHocPhan: string;
  maLopHP: string;
  tenHocPhan: string;
  stc: number;
  diem: number;
  dat: string;
  huy: boolean;
};

const createColumnsHocPhanCu = (
  onHuyChange: (id: string, newValue: boolean) => void,
): GridColDef[] => [
  { field: 'index', headerName: '*', width: 50, align: 'center', headerAlign: 'center' },
  {
    field: 'maHocPhan',
    headerName: 'Mã học phần',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row.maHocPhan,
  },
  {
    field: 'maLopHP',
    headerName: 'Mã lớp HP',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row.maLopHP,
  },
  {
    field: 'tenHocPhan',
    headerName: 'Tên học phần',
    flex: 1,
    minWidth: 250,
    headerAlign: 'center',
    valueGetter: (_, row) => row.tenHocPhan,
  },
  {
    field: 'soTinChi',
    headerName: 'STC',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row.soTinChi,
  },
  {
    field: 'diem',
    headerName: 'Điểm',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row) => row.diem,
  },
  {
    field: 'isDat',
    headerName: 'Đạt',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    type: 'boolean',
    valueGetter: (_, row) => row.isDat,
  },
  {
    field: 'huy',
    headerName: 'Hủy',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams<HocPhanCuRow, boolean>) => (
      <Checkbox
        checked={!!params.value}
        onChange={(event) => {
          onHuyChange(params.row.id, event.target.checked);
        }}
      />
    ),
  },
];

export const HocPhanCuDataGridTable = () => {
  const [enabled, setEnabled] = useState(false);
  const sinhVien = useWatch({ name: 'sinhVien' });
  const [localRows, setLocalRows] = useState<HocPhanCuRow[]>([]);
  const { setValue } = useFormContext();
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
    endpoint: 'hoc-phan-cu',
    schema: HocPhanFilter,
    enabled,
  });

  useEffect(() => {
    if (sinhVien?.id) {
      mergeParams({ idSinhVien: sinhVien.id });
      setEnabled(true);
    }
  }, [mergeParams, sinhVien?.id]);

  useEffect(() => {
    if (data?.result) {
      const initialRows = data.result.map((row) => ({
        ...row,
        huy: row.huy === undefined ? false : row.huy,
      })) as HocPhanCuRow[];
      setLocalRows(initialRows);
    }
  }, [data?.result]);
  useEffect(() => {
    if (localRows.length > 0) {
      // Cập nhật giá trị vào form state chung
      setValue('idHocPhanCuDaChon', localRows, { shouldValidate: true });
    } else {
      setValue('idHocPhanCuDaChon', [], { shouldValidate: true });
    }
  }, [localRows, setValue]);

  const handleHuyChange = (id: string, newValue: boolean) => {
    const updatedRows = localRows.map((row) => {
      if (row.id === id) {
        return { ...row, huy: newValue };
      }
      return row;
    });

    setLocalRows(updatedRows);
  };

  const columns = createColumnsHocPhanCu(handleHuyChange);

  return (
    <InfoSection title="Học phần cũ">
      <DataGridTable
        columns={columns}
        rows={localRows}
        checkboxSelection={false}
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height="350px"
        {...tableConfig}
      />
    </InfoSection>
  );
};
