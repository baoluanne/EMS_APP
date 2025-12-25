import { Button, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { GridColDef } from '@mui/x-data-grid';
import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FormDetailsModal } from '@renderer/components/modals';
import { KhoaSelection, LoaiGiangVienSelection } from '@renderer/components/selections';
import { DataGridTable } from '@renderer/components/Table';
import { giangVienTableColumns, QuanLyGianVienFilter } from '@renderer/features/quan-ly-giang-vien';
import { GiangVien } from '@renderer/features/quan-ly-giang-vien/validations';
import { useDisclosure } from '@renderer/shared/hooks';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { useGetQuery } from '@renderer/shared/queries';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

export const TimGiangVienSelection = (props) => {
  const { name, control, required, label } = props;
  const [value, setValue] = useState('');

  const giangVienIdController = useController({ control, name });
  const { refetch } = useGetQuery<GiangVien>(`GiangVien`, giangVienIdController.field.value, {
    enabled: false,
  });

  const { formMethods, data, isRefetching, tableConfig, mergeParams } = useCrudPaginationModal<
    GiangVien,
    QuanLyGianVienFilter
  >({
    entity: 'GiangVien',
    defaultValues: {},
    schema: {} as any,
  });

  useEffect(() => {
    (async () => {
      if (giangVienIdController.field.value && !value) {
        const res = await refetch();
        setValue(`${res.data?.hoDem ?? ''} ${res.data?.ten ?? ''}`);
      }
    })();
  }, [giangVienIdController.field.value, refetch, value]);

  const { isOpen, toggle } = useDisclosure();

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: '',
      width: 90,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isActive = giangVienIdController.field.value === params.row.id;
        return (
          <Button
            disabled={isActive}
            onClick={() => {
              handleCloseModal();
              giangVienIdController.field.onChange(params.row.id);
              setValue(`${params.row.hoDem} ${params.row.ten}`);
            }}
          >
            Chọn
          </Button>
        );
      },
    },
    ...giangVienTableColumns,
  ];

  const handleClickFilter = () => {
    const params = formMethods.getValues();
    mergeParams(params);
  };

  const handleCloseModal = () => {
    toggle();
    formMethods.reset();
  };

  return (
    <Stack>
      <TextField
        label={`${label || 'GV Chủ nhiệm'}${required ? '*' : ''}`}
        value={value}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: <IconCaretDownFilled size={14} style={{ color: 'gray' }} />,
          },
        }}
        onClick={toggle}
        size="small"
      />
      {isOpen && (
        <FormDetailsModal title={'Tìm giảng viên'} onClose={handleCloseModal}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <KhoaSelection name="idKhoa" control={formMethods.control} />
            </Grid>
            <Grid size={6}>
              <LoaiGiangVienSelection name="idLoaiGiangVien" control={formMethods.control} />
            </Grid>
            <Grid size={6}>
              <ControlledTextField
                name="maGiangVien"
                control={formMethods.control}
                label="Mã giảng viên"
              />
            </Grid>
            <Grid size={6}>
              <ControlledTextField name="hoVaTen" control={formMethods.control} label="Họ đệm" />
            </Grid>
          </Grid>
          <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleClickFilter}>
              Tìm kiếm
            </Button>
          </Stack>
          <DataGridTable
            columns={columns}
            rows={data?.result}
            checkboxSelection={false}
            loading={isRefetching}
            rowSelection={false}
            {...tableConfig}
          />
        </FormDetailsModal>
      )}
    </Stack>
  );
};
