import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { DeleteConfirmationModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { MonHocForm } from '@renderer/features/danh-sach-mon-hoc/validation';
import {
  AddMonHocBacDaoTao,
  importMonHocBacDaoTaoColumns,
  MonHocBacDaoTaoFilter,
  MonHocBacDaoTaoFormFilter,
  monHocBacDaoTaoTableColumns,
} from '@renderer/features/mon-hoc-bac-dao-tao';
import {
  MonHocBacDaoTaoForm,
  MonHocBacDaoTaoSchema,
} from '@renderer/features/mon-hoc-bac-dao-tao/validations';
import { useUpsertModal } from '@renderer/shared/hooks';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { MonHocBacDaoTao } from '@renderer/shared/types';
import { exportPaginationToExcel } from '@renderer/shared/utils/export-excel';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const defaultValues = {
  soTinChi: undefined,
  dvhT_TC: undefined,
  dvhT_HP: undefined,
  dvhT_Le: undefined,
  soTietLyThuyet: undefined,
  soTietThucHanh: undefined,
  lyThuyet: undefined,
  thucHanh: undefined,
  tuHoc: undefined,
  moRong: undefined,
  soTietLTT: undefined,
  soTietTHBT: undefined,
  soTietTuHoc: undefined,
  soGioThucTap: undefined,
  soGioDoAnBTLon: undefined,
  soTietKT: undefined,
  ghiChu: undefined,
  isLyThuyet: undefined,
  isKhongTinhDiemTBC: undefined,
  idBacDaoTao: undefined,
  idMonHoc: undefined,
  idHinhThucThi: undefined,
  idLoaiHinhGiangDay: undefined,
  idLoaiTiet: undefined,
};

const defaultValuesFilter: MonHocBacDaoTaoFilter = {
  idBacDaoTao: '',
  idKhoa: '',
  idToBoMon: '',
  idLoaiMonHoc: '',
  idTinhChatMonHoc: '',
  idKhoiKienThuc: '',
  idHinhThucThi: '',
  idLoaiHinhGiangDay: '',
  idMonHoc: '',
};
const MonHocBacDaoTaoPage = () => {
  const [isDeleteOpenModal, SetIsDeleteOpenModal] = useState<boolean>(false);
  const methods = useForm<MonHocBacDaoTaoForm>({
    resolver: zodResolver(MonHocBacDaoTaoSchema),
    defaultValues,
  });
  const { isModalOpen, handleOpenModal, handleCloseModal } = useUpsertModal<MonHocBacDaoTao>();
  const {
    data,
    isRefetching,
    refetch,
    handleDelete,
    handleRowSelectionModelChange,
    selectedRows,
    generateTableConfig,
    mergeParams,
  } = useCrudPagination<MonHocBacDaoTaoForm>({
    entity: 'MonHocBacDaoTao',
    refetchCallback: () => {
      methods.reset(defaultValues);
    },
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

  const handleDeleteRecord = () => {
    handleDelete();
    SetIsDeleteOpenModal(false);
    //TODO notfication to Snackbar
    toast.success('Xóa thành công');
  };
  const [selectedMonHocs, SetSelectedMonHocs] = useState<MonHocForm[]>([]);
  useEffect(() => {
    const selected = (data?.result ?? [])
      .filter((item) => item.id && selectedRows.ids.has(item.id))
      .map((m) => m.monHoc)
      .filter((id): id is MonHocForm => !!id);
    SetSelectedMonHocs(selected);
  }, [data, selectedRows]);

  const [isAddMode, SetIsAddMode] = useState<boolean>(true);
  const onAddMonHocBacDaoTao = () => {
    SetIsAddMode(true);
    handleOpenModal();
  };
  const onEditMonHocBacDaoTao = () => {
    SetIsAddMode(false);
    handleOpenModal();
  };

  const handleColumnChange = (model: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(model);
  };

  return (
    <FormProvider {...methods}>
      {isModalOpen && (
        <AddMonHocBacDaoTao
          onClose={handleCloseModal}
          refetch={async () => refetch()}
          selectedItem={selectedMonHocs}
          isAddMode={isAddMode}
        />
      )}
      <Stack
        className="h-full w-full p-2"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
      >
        <ActionsToolbar
          selectedRowIds={selectedRows}
          onDelete={() => SetIsDeleteOpenModal(true)}
          onAdd={onAddMonHocBacDaoTao}
          onEdit={onEditMonHocBacDaoTao}
          onExport={(dataOption, columnOption) => {
            exportPaginationToExcel<MonHocBacDaoTaoForm>({
              entity: 'MonHocBacDaoTao',
              filteredData: data?.result ?? [],
              columns: monHocBacDaoTaoTableColumns,
              options: { dataOption, columnOption },
              columnVisibilityModel,
              fileName: 'Danh_sach_khoa',
            });
          }}
          onImport={{
            title: 'Import Danh sách môn học bậc đào tạo',
            columns: importMonHocBacDaoTaoColumns,
            entity: 'MonHocBacDaoTao',
            onSuccess: refetch,
            sampleFilePath: '/samples/DanhSachMonHocBacDaoTao_Sample.xlsx',
          }}
        />
        {isDeleteOpenModal && (
          <DeleteConfirmationModal
            onClose={() => SetIsDeleteOpenModal(false)}
            onDelete={handleDeleteRecord}
          />
        )}
        <MonHocBacDaoTaoFormFilter
          onApply={(values) => mergeParams(values)}
          onClear={() => {
            mergeParams(defaultValuesFilter);
          }}
        />
        <DataGridTable
          columns={monHocBacDaoTaoTableColumns}
          rows={data?.result}
          getRowId={(row) => row.id}
          loading={isRefetching}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRows}
          onRowClick={(params) => {
            methods.reset(params.row);
          }}
          height={'calc(100% - 85px)'}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={handleColumnChange}
          {...generateTableConfig(data?.totalCount)}
        />
      </Stack>
    </FormProvider>
  );
};

export default MonHocBacDaoTaoPage;
