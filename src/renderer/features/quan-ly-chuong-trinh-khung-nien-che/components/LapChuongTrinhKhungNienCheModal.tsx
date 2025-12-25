import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Grid, Stack } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { DataGridTable } from '@renderer/components/Table';
import { LapChuongTrinhKhungNienChe } from '@renderer/features/lap-chuong-trinh-khung-nien-che/types';
import { validateAndCleanChiTietKhung } from '@renderer/features/lap-chuong-trinh-khung-nien-che/utils';
import {
  lapChuongTrinhKhungTinChiColumns,
  LapChuongTrinhKhungTinChiFilter,
  lapChuongTrinhKhungTinChiSideTableColumns,
  LapChuongTrinhKhungTinChiTitleBar,
  SelectMonHocBacDaoTaoModal,
} from '@renderer/features/lap-chuong-trinh-khung-tin-chi';
import { ChiTietKhungHocKy_TinChi } from '@renderer/features/lap-chuong-trinh-khung-tin-chi/validation';
import { MonHocBacDaoTaoForm } from '@renderer/features/mon-hoc-bac-dao-tao/validations';
import {
  ChuongTrinhKhungNienChe,
  ChuongTrinhKhungNienCheSchema,
} from '@renderer/features/quan-ly-chuong-trinh-khung-nien-che/validations';
import { useTableParamsSelection } from '@renderer/shared/hooks/use-table-params-selection';
import { showErrorToast } from '@renderer/shared/lib/axios/axios.utils';
import { useInsertMutation, useUpsertMutation } from '@renderer/shared/mutations';
import { IconPlus, IconTrashFilled } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const defaultValues = {
  isBlock: false,
  idCoSoDaoTao: '',
  idKhoaHoc: '',
  idLoaiDaoTao: '',
  idNganhHoc: '',
  idBacDaoTao: '',
  idChuyenNganh: '',
  chiTietChuongTrinhKhungNienChes: [],
};
interface Props {
  onClose: () => void;
  selectedData?: ChuongTrinhKhungNienChe | null;
}
export default function LapChuongTrinhKhungNienCheModal({ onClose, selectedData }: Props) {
  const [hocKySelected, setHocKySelected] = useState<number | string>('');
  const [selectedMonHoc, setSelectedMonHoc] = useState<MonHocBacDaoTaoForm[]>([]);
  const [isMonHocModalOpen, setIsMonHocModalOpen] = useState(false);
  const [isOpenMonHocBatBuocModal, setIsOpenMonHocBatBuocModal] = useState(false);

  const [monHocBatBuocKeyword, setMonHocBatBuocKeyword] = useState<string>('');
  const [monHocTuChonKeyword, setMonHocTuChonKeyword] = useState<string>('');

  const isEdit = !!selectedData;

  useEffect(() => {
    if (isEdit && selectedData) {
      methods.reset({ ...selectedData });
      methods.setValue('chiTietChuongTrinhKhungNienChes', [
        ...selectedData.chiTietChuongTrinhKhungNienChes,
      ]);
    }
  }, [selectedData]);

  const {
    selectedRows: selectedHocKyRows,
    handleRowSelectionModelChange: handleAddedRowSelectionModelChange,
    tableConfig: hocKyTableConfig,
    generateTableConfig: generateHocKyTableConfig,
  } = useTableParamsSelection();

  const {
    selectedRows: selectedMonHocBatBuocRows,
    handleRowSelectionModelChange: addRowMonHocBatBuocSelectionModelChange,
    tableConfig: monHocBatBuocTableConfig,
    generateTableConfig: generateMonHocBatBuocConfig,
  } = useTableParamsSelection();

  const {
    selectedRows: selectedMonHocTuChonRows,
    handleRowSelectionModelChange: addRowMonHocTuChonSelectionModelChange,
    tableConfig: monHocTuChonTableConfig,
    generateTableConfig: generateMonHocTuChonConfig,
  } = useTableParamsSelection();

  const methods = useForm<ChuongTrinhKhungNienChe>({
    resolver: zodResolver(ChuongTrinhKhungNienCheSchema),
    defaultValues,
  });

  const { mutateAsync: insert } =
    useInsertMutation<LapChuongTrinhKhungNienChe>('ChuongTrinhKhungNienChe');
  const { mutateAsync: update } =
    useUpsertMutation<LapChuongTrinhKhungNienChe>('ChuongTrinhKhungNienChe');

  // useWatch for live form data
  const chiTietChuongTrinhKhungNienChes = useWatch({
    control: methods.control,
    name: 'chiTietChuongTrinhKhungNienChes',
    defaultValue: selectedData?.chiTietChuongTrinhKhungNienChes ?? [],
  });

  const [hocKyRows, monHocBatBuoc, monHocTuChon] = useMemo(() => {
    const hocKyTcMap = new Map<number, { batBuoc: number; tuChon: number }>();

    chiTietChuongTrinhKhungNienChes.forEach((item) => {
      if (item.idMonHocBacDaoTao && item.hocKy) {
        const soTinChi = item.monHocBacDaoTao?.soTinChi ?? 0;
        const hocKy = item.hocKy;
        if (!hocKyTcMap.has(hocKy)) {
          hocKyTcMap.set(hocKy, { batBuoc: 0, tuChon: 0 });
        }
        const entry = hocKyTcMap.get(hocKy)!;
        item.isBatBuoc ? (entry.batBuoc += soTinChi) : (entry.tuChon += soTinChi);
      }
    });
    const hocKys = Array.from(
      new Map(
        chiTietChuongTrinhKhungNienChes.map((item) => [
          item.hocKy,
          {
            ...item,
            id: item.id ?? uuidv4(),
            soTinChiBatBuoc: hocKyTcMap.get(item.hocKy)?.batBuoc ?? 0,
            soTinChiTuChon: hocKyTcMap.get(item.hocKy)?.tuChon ?? 0,
            idChuongTrinhKhung: selectedData?.id,
          },
        ]),
      ).values(),
    ).sort((a, b) => a.hocKy - b.hocKy);

    const monHocRows = chiTietChuongTrinhKhungNienChes.filter(
      (item) => item.idMonHocBacDaoTao && item.hocKy === hocKySelected,
    );
    const batBuoc = monHocRows
      .filter((x) => x.isBatBuoc)
      .map((x) => x.monHocBacDaoTao!)
      .filter(Boolean);
    const tuChon = monHocRows
      .filter((x) => !x.isBatBuoc)
      .map((x) => x.monHocBacDaoTao!)
      .filter(Boolean);

    return [hocKys, batBuoc, tuChon] as const;
  }, [chiTietChuongTrinhKhungNienChes, hocKySelected, selectedData?.id]);

  const handleAddHocKy = methods.handleSubmit(
    () => {
      const current = methods.getValues('chiTietChuongTrinhKhungNienChes');
      const nextHocKy = Math.max(...current.map((c) => c.hocKy ?? 0), 0) + 1;

      methods.setValue('chiTietChuongTrinhKhungNienChes', [
        ...current,
        {
          id: uuidv4(),
          hocKy: nextHocKy,
          soNienCheBatBuoc: 0,
          soNienCheTuChon: 0,
          idChuongTrinhKhung: selectedData?.id,
        },
      ]);
    },
    (error) => console.log('Error ', error),
  );

  const handleRemoveHocKy = () => {
    const current = methods.getValues('chiTietChuongTrinhKhungNienChes');
    const removeHocKys = current
      .filter((item) => selectedHocKyRows.ids.has(item.id ?? ''))
      .map((x) => x.hocKy);
    const newItems = current.filter((item) => !removeHocKys.includes(item.hocKy ?? 0));
    methods.setValue('chiTietChuongTrinhKhungNienChes', newItems);
  };

  const handleAddMonHocBacDaoTao = (
    monHocSelected?: MonHocBacDaoTaoForm[],
    isBatBuoc?: boolean,
  ) => {
    if (!hocKySelected) return;
    const newItems: ChiTietKhungHocKy_TinChi[] =
      monHocSelected?.map((monHoc) => ({
        id: uuidv4(),
        hocKy: Number(hocKySelected),
        idMonHocBacDaoTao: monHoc.id,
        monHocBacDaoTao: monHoc,
        isBatBuoc: isBatBuoc ?? false,
        idChuongTrinhKhung: selectedData?.id,
      })) ?? [];
    const current = methods.getValues('chiTietChuongTrinhKhungNienChes');
    methods.setValue('chiTietChuongTrinhKhungNienChes', [...current, ...newItems]);
    setIsMonHocModalOpen(false);
  };

  const handleRemoveMonHocBacDaoTao = (isBatBuoc: boolean, selectedRows: Set<GridRowId>) => {
    const current = methods.getValues('chiTietChuongTrinhKhungNienChes');
    const newItems = current.filter(
      (item) =>
        !(
          item.isBatBuoc == isBatBuoc &&
          item.hocKy == hocKySelected &&
          selectedRows.has(item.idMonHocBacDaoTao ?? '')
        ),
    );
    methods.setValue('chiTietChuongTrinhKhungNienChes', newItems);
  };

  const handleSubmitAll = methods.handleSubmit(
    async (values) => {
      const result = validateAndCleanChiTietKhung(values.chiTietChuongTrinhKhungNienChes);
      if (!result.valid && result.errors) {
        showErrorToast(result.errors.join('\n') || 'Lỗi không xác định');
        return;
      }

      const payload = {
        ...values,
        chiTietChuongTrinhKhungNienChes: result.data,
      };

      if (isEdit) {
        await update(payload);
        toast.success('Cập nhật thành công');
      } else {
        await insert(payload);
        toast.success('Thêm thành công');
      }
      onClose();
    },
    (error) => console.log('Error ', error),
  );

  const filteredMonHocBacBuoc = useMemo(() => {
    const kw = monHocBatBuocKeyword.trim().toLowerCase();
    if (!kw) return monHocBatBuoc;

    return monHocBatBuoc.filter(
      (item) =>
        item.monHoc?.maMonHoc.toLowerCase().includes(kw) ||
        item.monHoc?.tenMonHoc.toLowerCase().includes(kw),
    );
  }, [monHocBatBuoc, monHocBatBuocKeyword]);

  const filteredMonHocTuChon = useMemo(() => {
    const kw = monHocTuChonKeyword.trim().toLowerCase();
    if (!kw) return monHocTuChon;

    return monHocTuChon.filter(
      (item) =>
        item.monHoc?.maMonHoc.toLowerCase().includes(kw) ||
        item.monHoc?.tenMonHoc.toLowerCase().includes(kw),
    );
  }, [monHocTuChon, monHocTuChonKeyword]);

  return (
    <FormProvider {...methods}>
      <Stack gap={2}>
        <LapChuongTrinhKhungTinChiFilter />
        <Stack direction="row" gap={2} justifyContent="left" alignItems="center">
          <Button variant="contained" startIcon={<IconPlus />} onClick={handleAddHocKy}>
            Thêm mới
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            startIcon={<IconTrashFilled />}
            onClick={handleRemoveHocKy}
            disabled={selectedHocKyRows.ids.size === 0}
          >
            Xóa
          </Button>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={2}>
            <DataGridTable
              columns={lapChuongTrinhKhungTinChiSideTableColumns}
              rows={hocKyRows}
              getRowId={(row) => row.id}
              checkboxSelection={true}
              onRowClick={(params) => setHocKySelected(params.row.hocKy)}
              onRowSelectionModelChange={handleAddedRowSelectionModelChange}
              rowSelectionModel={selectedHocKyRows}
              height={'100%'}
              {...hocKyTableConfig}
              {...generateHocKyTableConfig(hocKyRows.length, false)}
            />
          </Grid>

          <Grid size={10}>
            <Stack spacing={2}>
              {isMonHocModalOpen && (
                <SelectMonHocBacDaoTaoModal
                  open
                  onClose={() => setIsMonHocModalOpen(false)}
                  onAddMonHoc={handleAddMonHocBacDaoTao}
                  isBatBuoc={isOpenMonHocBatBuocModal}
                  alreadyAddedRows={selectedMonHoc}
                />
              )}

              <Card>
                <LapChuongTrinhKhungTinChiTitleBar
                  title={`Môn học bắt buộc (Học kỳ ${hocKySelected})`}
                  isBatBuoc
                  onOpenSelectMonHocModal={() => {
                    setIsOpenMonHocBatBuocModal(true);
                    setSelectedMonHoc(monHocBatBuoc);
                    setIsMonHocModalOpen(true);
                  }}
                  isDisabledAddBtn={!hocKySelected}
                  data={monHocBatBuoc}
                  onSearchChange={setMonHocBatBuocKeyword}
                  isDisabledDeleteBtn={selectedMonHocBatBuocRows.ids.size === 0}
                  onRemoveMonHoc={() =>
                    handleRemoveMonHocBacDaoTao(true, selectedMonHocBatBuocRows.ids)
                  }
                />
                <DataGridTable
                  columns={lapChuongTrinhKhungTinChiColumns}
                  rows={filteredMonHocBacBuoc}
                  getRowId={(row) => row.id}
                  checkboxSelection={true}
                  onRowSelectionModelChange={addRowMonHocBatBuocSelectionModelChange}
                  rowSelectionModel={selectedMonHocBatBuocRows}
                  height={300}
                  {...monHocBatBuocTableConfig}
                  {...generateMonHocBatBuocConfig(filteredMonHocBacBuoc.length, false)}
                  pageSizeOptions={[]}
                />
              </Card>

              <Card>
                <LapChuongTrinhKhungTinChiTitleBar
                  title={`Môn học tự chọn (Học kỳ ${hocKySelected})`}
                  onOpenSelectMonHocModal={() => {
                    setIsOpenMonHocBatBuocModal(false);
                    setSelectedMonHoc(monHocTuChon);
                    setIsMonHocModalOpen(true);
                  }}
                  isDisabledAddBtn={!hocKySelected}
                  data={monHocTuChon}
                  onSearchChange={setMonHocTuChonKeyword}
                  isDisabledDeleteBtn={selectedMonHocTuChonRows.ids.size === 0}
                  onRemoveMonHoc={() =>
                    handleRemoveMonHocBacDaoTao(false, selectedMonHocTuChonRows.ids)
                  }
                />
                <DataGridTable
                  columns={lapChuongTrinhKhungTinChiColumns}
                  rows={filteredMonHocTuChon}
                  getRowId={(row) => row.id}
                  checkboxSelection={true}
                  onRowSelectionModelChange={addRowMonHocTuChonSelectionModelChange}
                  rowSelectionModel={selectedMonHocTuChonRows}
                  height={300}
                  {...monHocTuChonTableConfig}
                  {...generateMonHocTuChonConfig(filteredMonHocBacBuoc.length, false)}
                  pageSizeOptions={[]}
                />
              </Card>
            </Stack>
          </Grid>
        </Grid>

        <Stack direction="row" gap={2} justifyContent="end" alignItems="center">
          <Button variant="text" onClick={() => onClose()}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSubmitAll}>
            {isEdit ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
