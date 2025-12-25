import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '@renderer/components/Title';
import { Box, Button, Stack } from '@mui/material';
import { QuyUocSelection } from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import {
  MonHocBacDaoTaoForm,
  MonHocBacDaoTaoSchema,
} from '@renderer/features/mon-hoc-bac-dao-tao/validations';
import {
  quanLyQuyUocCachTinhDiemMonHocColumns,
  QuanLyQuyUocCachTinhDiemMonHocFilter,
  QuanLyQuyUocCachTinhDiemMonHocFilters,
  QuyUocCotDiemItem,
} from '@renderer/features/quan-ly-quy-uoc-cach-tinh-diem-mon-hoc';
import { TABS_CONFIG } from '@renderer/shared/configs';
import { useCrud, useFilter, useFormReset, useGridRowSelection } from '@renderer/shared/hooks';
import { useInsertMutation } from '@renderer/shared/mutations';
import { IconChevronsDown, IconChevronsUp, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const defaultFilter: QuanLyQuyUocCachTinhDiemMonHocFilters = {
  idBacDaoTao: '',
  idKhoa: '',
  idQuyUoc: '',
  tenMonHoc: '',
  isLyThuyet: '',
  idTrangThaiXetQuyUoc: '',
};
const defaultQuyUoc = {
  id: '',
  tenQuyUoc: '',
  isQuyUocTinChi: true,
};

const QuanLyQuyUocCachTinhDiemMonHoc = () => {
  const { filter, setFilter } = useFilter<QuanLyQuyUocCachTinhDiemMonHocFilters>(defaultFilter);
  const [addedMonHocBacDaoTaos, setAddedMonHocBacDaoTaos] = useState<MonHocBacDaoTaoForm[]>([]);
  const [newQuyUoc, setNewQuyUoc] = useState<QuyUocCotDiemItem>(defaultQuyUoc);
  const formMethods = useForm({
    resolver: zodResolver(MonHocBacDaoTaoSchema),
  });
  const reset = useFormReset(formMethods);
  const { data, selectedRows, handleRowSelectionModelChange, isRefetching } =
    useCrud<MonHocBacDaoTaoForm>({
      entity: 'MonHocBacDaoTao',
      refetchCallback: () => {
        reset();
      },
    });

  const {
    selectedRows: selectedAddedRows,
    handleRowSelectionModelChange: handleAddedRowSelectionModelChange,
  } = useGridRowSelection();

  const mappingKey = {
    idBacDaoTao: 'idBacDaoTao',
    idKhoa: 'monHoc.idKhoa',
    tenMonHoc: 'monHoc.tenMonHoc',
    isLyThuyet: 'isLyThuyet',
  };
  const getValueByPath = (obj: MonHocBacDaoTaoForm, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };
  const filteredData = (data ?? []).filter((item) => {
    const isAlreadyAdded = addedMonHocBacDaoTaos.some((added) => added.idMonHoc === item.idMonHoc);
    const isMatch = Object.keys(filter).every((key) => {
      if (!filter[key] || !mappingKey[key]) return true;

      const itemVal = getValueByPath(item, mappingKey[key])?.toString()?.toLocaleLowerCase();
      const filterVal = filter[key]?.toString()?.toLocaleLowerCase();
      return itemVal.includes(filterVal);
    });
    return isMatch && !isAlreadyAdded;
  });

  const updateMonHocBDT = (isAdd: boolean) => {
    if (isAdd) {
      const newMonHoc = (filteredData ?? []).filter(
        (item) => item.id && selectedRows.ids.has(item.id),
      );
      setAddedMonHocBacDaoTaos([
        ...addedMonHocBacDaoTaos.filter((item) => !newMonHoc.some((i) => i.id === item.id)),
        ...newMonHoc,
      ]);
    } else {
      const removeMonHoc = (data ?? []).filter(
        (item) => item.id && selectedAddedRows.ids.has(item.id),
      );
      setAddedMonHocBacDaoTaos(
        addedMonHocBacDaoTaos.filter((item) => !removeMonHoc.some((i) => i.id === item.id)),
      );
    }
  };
  const onSuccess = () => {
    setAddedMonHocBacDaoTaos([]);
    reset();
    toast.success('Cập nhật Quy ước mới cho môn học thành công!');
  };
  const { mutate } = useInsertMutation('MonHocBacDaoTao/update-multiple', { onSuccess });
  const handleSubmitAll = formMethods.handleSubmit(
    async () => {
      if (!newQuyUoc.id) {
        toast.warn('Vui lòng chọn quy ước mới');
        return;
      }
      if (addedMonHocBacDaoTaos.length === 0) {
        toast.warn('Vui lòng chọn ít nhất 1 môn học để cập nhật');
        return;
      }
      const updatedItems = addedMonHocBacDaoTaos.map((item) => {
        if (newQuyUoc?.isQuyUocTinChi) {
          return {
            ...item,
            idQuyUocCotDiem_TC: newQuyUoc.id,
          };
        } else {
          return {
            ...item,
            idQuyUocCotDiem_NC: newQuyUoc?.id,
          };
        }
      });
      console.log('Updated items with QuyUoc:', updatedItems);

      mutate(updatedItems);
    },
    (error) => console.log('Error ', error),
  );
  return (
    <FormProvider {...formMethods}>
      <Stack
        className="h-full w-full p-2"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '0px',
        }}
        gap={2}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Title title={TABS_CONFIG.QuanLyQuyUocCachTinhDiemMonHoc.label} />
        </Box>
        <QuanLyQuyUocCachTinhDiemMonHocFilter filter={filter} setFilter={setFilter} />
        <Box flex={1} minWidth={0}>
          <DataGridTable
            columns={quanLyQuyUocCachTinhDiemMonHocColumns}
            rows={filteredData}
            getRowId={(row) => row.id}
            loading={isRefetching}
            onRowClick={(params) => formMethods.reset(params.row)}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectedRows}
            checkboxSelection
            height={400}
          />
        </Box>

        <Stack gap={1} direction="row" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ backgroundColor: '#67D130'}}
            onClick={() => updateMonHocBDT(true)}
            title="Thêm môn học vào bảng"
          >
            <IconChevronsDown />
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: '#ff0000ff' }}
            title="Xóa môn học khỏi bảng"
            onClick={() => updateMonHocBDT(false)}
          >
            <IconChevronsUp />
          </Button>
        </Stack>

        <Stack flex={1} gap={2}>
          <QuyUocSelection
            onChange={(val) => setNewQuyUoc(val)}
            value={newQuyUoc.id}
            name="idQuyUoc"
          />
          <DataGridTable
            columns={quanLyQuyUocCachTinhDiemMonHocColumns}
            rows={addedMonHocBacDaoTaos}
            getRowId={(row) => row.id}
            loading={isRefetching}
            onRowSelectionModelChange={handleAddedRowSelectionModelChange}
            rowSelectionModel={selectedAddedRows}
            checkboxSelection
            height={400}
          />
        </Stack>

        <Stack gap={2} direction="row" alignItems="center" justifyContent="end">
          <Button
            variant="contained"
            onClick={handleSubmitAll}
            disabled={isRefetching}
            startIcon={<IconDeviceFloppy size={18} />}
          >
            Lưu
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default QuanLyQuyUocCachTinhDiemMonHoc;
