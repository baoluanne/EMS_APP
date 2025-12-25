import { zodResolver } from '@hookform/resolvers/zod';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { DataGridTable } from '@renderer/components/Table';
import {
  danhSachHoSoSVColumns,
  defaultTiepNhanHoSoSVState,
  ThongTinSinhVienHoSoSchema,
  ThongTinSinhVienHoSoType,
  TiepNhanHoSoSVSchema,
  TiepNhanHoSoSVType,
} from '@renderer/features/hoc-vu-sinh-vien/tiep-nhan-ho-so-sv';
import TiepNhanHoSoSVThongTinSinhVienForm from '@renderer/features/hoc-vu-sinh-vien/tiep-nhan-ho-so-sv/components/TiepNhanHoSoSVThongTinSinhVienForm';
import TiepNhanHoSoSVToolbar from '@renderer/features/hoc-vu-sinh-vien/tiep-nhan-ho-so-sv/components/TiepNhanHoSoSVToolbar';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useMutation } from '@renderer/shared/mutations';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FcFolder } from 'react-icons/fc';
import { toast } from 'react-toastify';

export default function TiepNhanHoSoSinhVien() {
  const { mutateAsync } = useMutation<any>('TiepNhanHoSoSV/update-tiep-nhan-ho-so');
  const [enabled, setEnabled] = useState<boolean>(false);
  const {
    formMethods,
    data,
    isRefetching,
    handleRowSelectionModelChange,
    selectedRows,
    tableConfig,
    mergeParams,
    refetch,
  } = useCrudPaginationModal<any, TiepNhanHoSoSVType>({
    defaultValues: defaultTiepNhanHoSoSVState,
    schema: TiepNhanHoSoSVSchema,
    entity: 'TiepNhanHoSoSV',
    enabled: !!enabled,
  });
  const { control } = formMethods;

  const filterMethods = useForm<ThongTinSinhVienHoSoType>({
    resolver: zodResolver(ThongTinSinhVienHoSoSchema),
    defaultValues: {},
  });

  const handleApplyFilter = (values: ThongTinSinhVienHoSoType) => {
    setEnabled(true);
    mergeParams({ maSinhVien: values.maSinhVien });
    formMethods.reset(defaultTiepNhanHoSoSVState);
  };

  const handleUpdateTiepNhanHoSo = async (tiepNhan: boolean) => {
    const updatedTiepNhan = data?.result
      .filter((x) => selectedRows.ids.has(x.id))
      .map((item) => ({
        idHoSoSV: item.id,
        isTiepNhan: tiepNhan,
        ghiChu: item.ghiChu,
        lyDoTuChoi: '', // TODO to be clarified
      }));
    const res = await mutateAsync({ DanhSachHoSoSV: updatedTiepNhan });
    if (res == true || res == 'true') {
      toast.success('Cập nhật thành công');
      refetch();
    } else {
      toast.error('Cập nhật thất bại');
      console.log(res);
    }
  };
  return (
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
      <FormProvider {...filterMethods}>
        <TiepNhanHoSoSVToolbar selectedHoSo={selectedRows} onSave={handleUpdateTiepNhanHoSo} />

        <TiepNhanHoSoSVThongTinSinhVienForm
          onApply={(values) => handleApplyFilter(values)}
          methods={filterMethods}
        />
      </FormProvider>

      <FormProvider {...formMethods}>
        <Grid container spacing={1} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1, mt: 2 }}>
          <Grid size={12} container>
            <Grid size={8} sx={{ display: 'flex', alignItems: 'center' }}>
              <FcFolder size={18} />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="primary"
                sx={{ whiteSpace: 'nowrap', ml: 0.5 }}
              >
                Danh sách hồ sơ
              </Typography>
              <Divider sx={{ flexGrow: 1, mx: 1 }} />
            </Grid>

            <Grid size={4} spacing={3} container>
              <ControlledCheckbox control={control} name="inBienNhan" label="In biên nhận" />
              <ControlledCheckbox control={control} name="xemIn" label="Xem in" />
              <ControlledTextField
                control={control}
                type="number"
                name="soBanIn"
                label="Số bản in"
              />
            </Grid>
          </Grid>

          <Grid container size={12}>
            <DataGridTable
              columns={danhSachHoSoSVColumns}
              rows={data?.result}
              checkboxSelection
              loading={isRefetching}
              onRowClick={(params) => formMethods.reset(params.row)}
              onRowSelectionModelChange={handleRowSelectionModelChange}
              rowSelectionModel={selectedRows}
              height={400}
              {...tableConfig}
            />
          </Grid>

          <Grid container size={12}>
            <Grid size={4}>
              <ControlledTextField control={control} name="maVach" label="Mã vạch" />
            </Grid>

            <Grid size={4}>
              <ControlledTextField control={control} name="congNoHocPhi" label="Công nợ học phí" />
            </Grid>

            <Grid size={4}>
              <ControlledTextField control={control} name="khoanThuKhac" label="Khoản thu khác" />
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </Stack>
  );
}
