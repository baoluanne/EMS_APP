import { columns } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop';
import { DataGridTable } from '@renderer/components/Table';
import { Stack } from '@mui/material';
import { LopHocSelection } from '@renderer/components/selections';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { TimKiemSinhVienFilterSchema } from '@renderer/features/hoc-vu-sinh-vien/tim-kiem/sinh-vien';
import { Control, useWatch } from 'react-hook-form';
import { SinhVien } from '@renderer/shared/types';
import { sortBy } from 'lodash';

export interface DanhSachSinhVienDataGridTableHandle {
  refresh: (id?: string) => void;
}

interface Props {
  name: string;
  label: string;
  onSelectedRowsChanged: (ids: SinhVien[]) => void;
  control: Control;
}

export const DanhSachSinhVienDataGridTable = forwardRef<DanhSachSinhVienDataGridTableHandle, Props>(
  (props: Props, ref) => {
    const [enabled, setEnabled] = useState(false);
    const lopHoc = useWatch({ name: props.name });
    const {
      isRefetching,
      data,
      handleRowSelectionModelChange,
      selectedRows,
      mergeParams,
      tableConfig,
      resetSelectedRows,
      refetch,
    } = useCrudPaginationModal<any, any>({
      defaultValues: {},
      schema: TimKiemSinhVienFilterSchema,
      entity: 'SinhVien',
      enabled,
      defaultState: {
        idLopHoc: lopHoc?.id,
      },
    });
    useImperativeHandle(ref, () => ({
      refresh: (id?: string) => {
        if (id === lopHoc?.id) {
          resetSelectedRows();
        }
        refetch();
      },
    }));
    useEffect(() => {
      if (lopHoc?.id) {
        mergeParams({ idLopHoc: lopHoc?.id });
        setEnabled(true);
      }
    }, [lopHoc]);
    useEffect(() => {
      const rows = [...selectedRows.ids].map((id) => data?.result?.find((item) => item.id === id));
      props.onSelectedRowsChanged(sortBy(rows, (row) => row.index));
    }, [selectedRows]);

    return (
      <Stack
        className="w-full h-full gap-y-4 pt-2"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
      >
        <LopHocSelection
          control={props.control}
          name={props.name}
          label={props.label}
          valueType={'object'}
        />
        <DataGridTable
          columns={columns}
          rows={data?.result}
          checkboxSelection
          loading={isRefetching}
          height={'calc(100% - 85px)'}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          {...tableConfig}
        />
      </Stack>
    );
  },
);
