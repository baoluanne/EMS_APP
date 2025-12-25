import { Button, Stack } from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { IconPlus } from '@tabler/icons-react';
import { Control, FormProvider, useForm, UseFormSetValue } from 'react-hook-form';
import { AddQuyetDinhForm } from './AddQuyetDinhForm';
import { useDisclosure } from '@renderer/shared/hooks';
import { useListQuery } from '@renderer/shared/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInsertMutation } from '@renderer/shared/mutations';
import { toast } from 'react-toastify';
import { QuyetDinhSelection } from '@renderer/components/selections';
import {
  QuyetDinhFormDataType,
  quyetDinhValidationSchema,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-sinh-vien/ds-sinh-vien-mien-mon-hoc';

interface Props {
  name?: string;
  control?: Control<any>;
  required?: boolean;
  setValue?: UseFormSetValue<any>;
}
export const QuyetDinhSelectionPlus = ({ name, control, required, setValue }: Props) => {
  const { isOpen: isOpenQuyetDinh, close: closeQuyetDinh, open: openQuyetDinh } = useDisclosure();
  const { data, refetch } = useListQuery<QuyetDinhFormDataType[]>('QuyetDinh');
  const { mutateAsync } = useInsertMutation<QuyetDinhFormDataType>('QuyetDinh');
  const formMethods = useForm<QuyetDinhFormDataType>({
    resolver: zodResolver(quyetDinhValidationSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: QuyetDinhFormDataType) => {
    const newQuyetDinh = await mutateAsync(data);
    toast.success('Thêm quyết định thành công');
    await refetch();
    closeQuyetDinh();
    if (setValue && name && newQuyetDinh?.id) {
      setValue(name, newQuyetDinh.id, { shouldValidate: true });
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Stack flex={1}>
        <QuyetDinhSelection control={control} name={name} required={required} listData={data} />
      </Stack>
      {isOpenQuyetDinh && (
        <FormProvider {...formMethods}>
          <FormDetailsModal
            title="Thêm quyết định"
            onClose={closeQuyetDinh}
            onSave={formMethods.handleSubmit(onSubmit)}
            maxWidth="sm"
          >
            <AddQuyetDinhForm />
          </FormDetailsModal>
        </FormProvider>
      )}
      <Button sx={{ minWidth: 0 }} size="small" onClick={openQuyetDinh}>
        <IconPlus />
      </Button>
    </Stack>
  );
};
