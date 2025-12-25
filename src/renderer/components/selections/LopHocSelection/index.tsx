import { Stack, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { SearchButton } from '@renderer/features/common';
import { FormDetailsModal } from '@renderer/components/modals';
import { TimKiemLopHocForm } from '@renderer/components/selections/LopHocSelection/TimKiemLopHocForm';
import { useDisclosure } from '@renderer/shared/hooks';
import { LopHoc } from '@renderer/shared/types';
import { IconCaretDownFilled } from '@tabler/icons-react';

interface LopHocSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  valueType?: 'object' | 'id';
}

export const LopHocSelection: FC<LopHocSelectionProps> = ({
  name,
  control,
  required,
  label,
  valueType = 'id',
}) => {
  const lopHocIdController = useController({ control, name });
  const error = lopHocIdController.formState.errors[name]?.message as string;
  const [value, setValue] = useState('');
  const [currentId, setCurrentId] = useState('');
  const { isOpen: isTimKiemLopHocOpen, toggle: toggleTimKiemLopHoc } = useDisclosure();
  const handleLopHocSelected = (record: LopHoc) => {
    setValue(record.tenLop!);
    const changedValue = valueType === 'id' ? record.id : record;
    lopHocIdController.field.onChange(changedValue);
    setCurrentId(record.id!);
  };
  useEffect(() => {
    if (!lopHocIdController.field.value) {
      setValue('');
    }
  }, [lopHocIdController.field.value, value]);

  return (
    <Stack direction={'row'}>
      <TextField
        label={`${label || 'Lớp học'}${required ? '*' : ''}`}
        value={value}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: <IconCaretDownFilled size={14} style={{ color: 'gray' }} />,
          },
        }}
        onClick={toggleTimKiemLopHoc}
        size="small"
        sx={{ flex: 1 }}
        error={Boolean(error)}
        helperText={error}
      />
      <SearchButton onClick={toggleTimKiemLopHoc} />
      {isTimKiemLopHocOpen && (
        <FormDetailsModal title={'Tìm kiếm lớp học'} onClose={toggleTimKiemLopHoc}>
          <TimKiemLopHocForm
            onClose={toggleTimKiemLopHoc}
            onSelected={handleLopHocSelected}
            currentId={currentId}
          />
        </FormDetailsModal>
      )}
    </Stack>
  );
};
