import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import {
  CapNhatTrangThaiSinhVienFilter,
  CapNhatTrangThaiSinhVienFilters,
  CapNhatTrangThaiSinhVienForm,
  CapNhatTrangThaiSinhVienSearchModal,
  CapNhatTrangThaiSinhVienToolbar,
  defaultCapNhatTrangThaiSinhVienFilter,
  hoSoTuyenSinhColumns,
} from '@renderer/features/hoc-vu-sinh-vien/cap-nhat-trang-thai-sinh-vien';
import {
  capNhatTrangThaiSinhVienDefaultValues,
  CapNhatTrangThaiSinhVienSchema,
} from '@renderer/features/hoc-vu-sinh-vien/cap-nhat-trang-thai-sinh-vien/validations';
import { useDisclosure } from '@renderer/shared/hooks';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { useInsertMutation } from '@renderer/shared/mutations';
import { useListQuery } from '@renderer/shared/queries';
import { SinhVien } from '@renderer/shared/types';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function CapNhatTrangThaiSinhVien() {
  const searchModal = useDisclosure();
  const editModal = useDisclosure();

  const formMethods = useForm({
    resolver: zodResolver(CapNhatTrangThaiSinhVienSchema),
    defaultValues: capNhatTrangThaiSinhVienDefaultValues,
  });

  const { data: quyetDinhs } = useListQuery<
    {
      id: string;
      tenLoaiQD: string;
      maLoaiQD: string;
    }[]
  >('LoaiQuyetDinh');

  const idLoaiQuyetDinh =
    (quyetDinhs || []).find(
      (x) => x.tenLoaiQD === 'Quyết định chuyển trạng thái' || x.maLoaiQD === 'QD09',
    )?.id ?? '';

  useEffect(() => {
    if (idLoaiQuyetDinh) {
      formMethods.setValue('idLoaiQuyetDinh', idLoaiQuyetDinh);
    }
  }, [idLoaiQuyetDinh]);

  const filterMethods = useForm<CapNhatTrangThaiSinhVienFilter>({
    defaultValues: defaultCapNhatTrangThaiSinhVienFilter,
  });

  const {
    data,
    isRefetching,
    refetch,
    handleRowSelectionModelChange,
    selectedRows,
    generateTableConfig,
    mergeParams,
  } = useCrudPagination<SinhVien>({
    entity: 'SinhVien',
    endpoint: 'pagination/cap-nhat-trang-thai',
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

  const handleColumnChange = (model: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(model);
  };

  const tableConfig = {
    columnVisibilityModel,
    onColumnVisibilityModelChange: handleColumnChange,
    ...generateTableConfig(data?.totalCount, isRefetching),
  };

  const { mutateAsync } = useInsertMutation('NhatKyCapNhatTrangThaiSv/SinhVien/multiple', {});

  const onSave = formMethods.handleSubmit(
    async (values) => {
      try {
        await mutateAsync({
          ...values,
          idSinhViens: [...selectedRows.ids],
        });
        toast.success('Cập nhật thành công');
        refetch();
        editModal.close();
      } catch {
        toast.error('Cập nhật thất bại');
      }
    },
    (error) => console.log('Error ', error),
  );

  return (
    <>
      {searchModal.isOpen && (
        <CapNhatTrangThaiSinhVienSearchModal
          filterMethods={filterMethods}
          onClose={searchModal.close}
          onSave={() => {
            mergeParams(filterMethods.getValues());
            searchModal.close();
          }}
        />
      )}
      <FormProvider {...formMethods}>
        <Stack
          className="w-full h-full p-2"
          style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            position: 'relative',
            borderRadius: '0px',
          }}
        >
          <CapNhatTrangThaiSinhVienToolbar
            selectedRowIds={selectedRows}
            onSearch={searchModal.open}
            onExport={() => {}}
            onPrint={() => {}}
            onEdit={editModal.open}
          />

          {editModal.isOpen && (
            <FormDetailsModal
              title="Cập nhật trạng thái sinh viên môn học"
              onClose={editModal.close}
              onSave={onSave}
            >
              <CapNhatTrangThaiSinhVienForm selectedRowIds={selectedRows} />
            </FormDetailsModal>
          )}

          <CapNhatTrangThaiSinhVienFilters
            filterMethods={filterMethods}
            onApply={mergeParams}
            onClear={() => {
              mergeParams(defaultCapNhatTrangThaiSinhVienFilter);
            }}
          />

          <DataGridTable
            columns={hoSoTuyenSinhColumns}
            rows={data?.result}
            checkboxSelection
            loading={isRefetching}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectedRows}
            height={'calc(100% - 85px)'}
            {...tableConfig}
          />
        </Stack>
      </FormProvider>
    </>
  );
}
